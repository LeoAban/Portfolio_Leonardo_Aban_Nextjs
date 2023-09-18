'use client'

import React, { useEffect, useState, useRef } from 'react'
import styles from '../(styles)/Rocket.module.css'

import RocketIcon from '@/icons/RocketIcon'
import GitHubIcon from '@/icons/GitHubIcon'
import HTMLIcon from '@/icons/HTMLIcon'
import CSSIcon from '@/icons/CSSIcon'

const Rocket = () => {
  const [stars, setStars] = useState([])
  const sceneRef = useRef(null)

  useEffect(() => {
    const count = 10
    const starsArr = []
    const sceneWidth = sceneRef.current.clientWidth

    let i = 0
    while (i < count) {
      const posicion = sceneWidth * (i * 0.1)
      const duration = Math.random() * 1
      const h = Math.random() * 100

      starsArr.push(
        <i
          key={i}
          style={{
            left: `${posicion}px`,
            width: '1px',
            height: `${10 + h}px`,
            animationDuration: `${duration}s`
          }}
        />
      )
      i++
    }

    setStars(starsArr)
  }, [])

  return (
    <div className={styles.body}>
      <div ref={sceneRef} className={styles.scene}>
        {stars.map((star, index) => (
          <React.Fragment key={index}>{star}</React.Fragment>
        ))}
        <div className={styles.rocket}>
          <GitHubIcon className={styles.pilot} width={30} height={30} />
          <HTMLIcon className={styles.passanger1} width={20} height={20} />
          <CSSIcon className={styles.passanger2} width={20} height={20} />
          <RocketIcon className={styles.icon} width={100} height={130} />
        </div>
      </div>
    </div>

  )
}

export default Rocket
