'use client'

import { useState, useEffect } from 'react'
import styles from '../(styles)/Title.module.css'

export const LettersAndSymbols = ({ cell, letters, symbols, initialTime, defaultTime }) => {
  const [content, setContent] = useState([])

  const [timer, setTimer] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      if (letters.length === 0 && symbols.length === 0) {
        clearInterval(interval)
        setContent(false)
        return
      }

      const newContent = []

      if (letters.length === symbols.length) {
        if (letters.length > 0) {
          newContent.push(letters[0])
          letters.shift()
        }
      } else {
        if (symbols.length > 0) {
          newContent.push(symbols[0])
          symbols.shift()
        }
      }

      setContent(newContent)
      if (timer !== 250) setTimer(250)
    }, timer)

    return () => clearInterval(interval)
  }, [letters, symbols, timer, defaultTime])

  if (!content) {
    return (
      <div className={`${styles.cell} ${cell === ' ' ? styles.isSpace : ''}`} style={cell === ' ' ? { transition: 'none' } : {}}>
        <span>{cell}</span>
      </div>
    )
  }

  return (
    <div className={`${styles.cell} ${styles.random} ${content.length === 0 ? styles.isSpace : ''}`} style={cell === ' ' ? { transition: 'none' } : {}}>
      <span>{content}</span>
    </div>
  )
}
