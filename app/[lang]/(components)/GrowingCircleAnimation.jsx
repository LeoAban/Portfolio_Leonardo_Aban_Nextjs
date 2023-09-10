'use client'

import { useEffect, useRef } from 'react'
import styles from '../(styles)/DarkMode.module.css'
import { debounce, throttle } from './Limitors'
import { useDarkMode } from '@/hooks/useDarkMode'

const COLORS = {
  white: '#fff3e6',
  midnightBlack: 'rgb(5, 14, 26)'
}

const RADIUS_GROWTH_PER_MS = 0.025
const GROWTH_FUNCTION_EXPONENTIAL = 2.9
// We don't need such a high resolution for this type of animation. Plus a lower resolution makes
// the edges of the circle look blurred, which looks nicer. Improves performance a lot on slow GPUs
const PIXEL_SCALING_FACTOR = 0.5

const circleCenterCoordinates = {
  x: null,
  y: null,

  resetMouseState: () => {
    circleCenterCoordinates.x = null
    circleCenterCoordinates.y = null
  }
}

// circle animation state machine
const m = {
  ctx: null, // canvas context
  isDark: null,
  radiusMultiplier: null,
  maxRadiusMultiplier: null,
  timeAtPreviousDraw: null,
  height: null,
  width: null,

  createMachine: (ctx, isDark) => {
    m.ctx = ctx
    m.isDark = isDark
    // window.screen.height and width are not reliable on iPad Safari. Use window.inner instead.
    m.height = Math.max(window.screen.height, window.innerHeight)
    m.width = Math.max(window.screen.width, window.innerWidth)
    m.maxRadiusMultiplier =
      Math.max(m.width, m.height) ** (1.0 / GROWTH_FUNCTION_EXPONENTIAL)
    m.timeAtPreviousDraw = Date.now()

    // set page body background color before starting the animation. iOS 14 safari bottom bar does
    // not play nicely when scrolling down. When the bottom bar disappears as you scroll down, it
    // first fills the view with the body color, and then the canvas colour. Also, Twitter app's
    // webview does not readjust window.innerHeight after the bottom bar disappears, leaving the
    // bottom part of the website dark. Consider removing this if/when Safari fixes itself.
    document.body.style.backgroundColor = m.isDark
      ? COLORS.midnightBlack
      : COLORS.white

    // adjust canvas pixel ratio (resolution)
    const { width, height } = m.ctx.canvas.getBoundingClientRect()
    if (m.ctx.canvas.width !== width || m.ctx.canvas.height !== height) {
      const { devicePixelRatio: originalRatio = 1 } = window
      const lowerResolutionRatio = originalRatio * PIXEL_SCALING_FACTOR
      m.ctx.canvas.width = width * lowerResolutionRatio
      m.ctx.canvas.height = height * lowerResolutionRatio
      m.ctx.scale(lowerResolutionRatio, lowerResolutionRatio)
    }

    // If mouse coordinates are not set, there should be no animation. Skip the whole thing.
    // This also skips the animation when the window is resized because we remove the mouse coords.
    if (
      circleCenterCoordinates.x == null ||
      circleCenterCoordinates.y == null
    ) {
      m.radiusMultiplier = isDark ? 0 : m.maxRadiusMultiplier
    }

    return m.start
  },
  start: () => (m.isDark ? m.shrinkCircle : m.growCircle),

  growCircle: () => {
    m.radiusMultiplier +=
      RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw)
    return m.verifyCircleBounds
  },

  shrinkCircle: () => {
    m.radiusMultiplier -=
      RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw)
    return m.verifyCircleBounds
  },

  verifyCircleBounds: () => {
    if (
      (m.radiusMultiplier <= 0 && m.isDark) ||
      (m.radiusMultiplier >= m.maxRadiusMultiplier && !m.isDark)
    ) {
      // just fill the canvas - at the limit. no more drawing is necessary.
      m.ctx.fillStyle = m.isDark ? COLORS.midnightBlack : COLORS.white
      m.ctx.fillRect(0, 0, m.width, m.height)
      // reset radius multiplier values in case we overshoot (can get negative value when shrinking)
      m.radiusMultiplier = m.isDark ? 0 : m.maxRadiusMultiplier
      return null // no next step - end of state machine
    }

    // clear canvas before drawing the next circle
    m.ctx.clearRect(0, 0, m.width, m.height)
    return m.drawCircle
  },

  drawCircle: () => {
    m.ctx.fillStyle = COLORS.white
    m.ctx.beginPath()
    m.ctx.arc(
      circleCenterCoordinates.x,
      circleCenterCoordinates.y,
      m.radiusMultiplier ** GROWTH_FUNCTION_EXPONENTIAL,
      0,
      2 * Math.PI
    )
    m.ctx.fill()

    // Note the time when we start drawing. This will be used to determine how much time has passed
    // since last draw. Circle growth is based on time delta, not CPU performance
    m.timeAtPreviousDraw = Date.now()

    return new Promise((resolve) => {
      const returnAfterAnimating = () => {
        resolve(m.start)
      }
      window.requestAnimationFrame(returnAfterAnimating)
    })
  }
}

const GrowingCircleAnimation = () => {
  const { isDarkMode } = useDarkMode()

  const canvasRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')

    let stateMachine = m.createMachine(ctx, isDarkMode)
    let isStateMachinePowered = true

    const stateMachineRunner = async () => {
      if (stateMachine !== null && isStateMachinePowered) {
        stateMachine = await stateMachine()
        stateMachineRunner()
      }
    }

    stateMachineRunner()

    const handleClick = (event) => {
      // fill in the mouse coordinates when we receive a click so we know the center of the circle
      circleCenterCoordinates.x = event.detail.x
      circleCenterCoordinates.y = event.detail.y
    }

    const handleResize = () => {
      circleCenterCoordinates.resetMouseState()
      stateMachine = m.createMachine(ctx, isDarkMode)
      stateMachineRunner()
    }

    window.addEventListener('darkModeToggle', handleClick)
    window.addEventListener('resize', throttle(debounce(handleResize)), false)
    return () => {
      isStateMachinePowered = false
      window.removeEventListener('darkModeToggle', handleClick)
      window.removeEventListener(
        'resize',
        throttle(debounce(handleResize)),
        false
      )
    }
  }, [isDarkMode])

  return <canvas className={styles.size} ref={canvasRef} />
}

export default GrowingCircleAnimation
