'use client'

import { useEffect, useState } from 'react'
import styles from '../(styles)/TecnologiesUsedNames.module.css'

const TecnologiesUsedNames = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        let index = prevIndex + 1
        if (index === 6) index = 0
        return index
      })
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const centerStyle = { transform: 'translateY(0)' }
  const bottomStyle = { transform: 'translateY(200%)' }
  const topStyle = { transform: 'translateY(-200%)', transition: 'none' }

  return (
    <section className={styles.animation}>
      <div className={styles.first}>
        <div style={activeIndex === 0 ? centerStyle : activeIndex === 1 ? bottomStyle : topStyle}>React</div>
      </div>
      <div className={styles.second}>
        <div style={activeIndex === 1 ? centerStyle : activeIndex === 2 ? bottomStyle : topStyle}>Nextjs</div>
      </div>
      <div className={styles.third}>
        <div style={activeIndex === 2 ? centerStyle : activeIndex === 3 ? bottomStyle : topStyle}>Javascript</div>
      </div>
      <div className={styles.fourth}>
        <div style={activeIndex === 3 ? centerStyle : activeIndex === 4 ? bottomStyle : topStyle}>HTML</div>
      </div>
      <div className={styles.fifth}>
        <div style={activeIndex === 4 ? centerStyle : activeIndex === 5 ? bottomStyle : topStyle}>CSS</div>
      </div>
      <div className={styles.sixth}>
        <div style={activeIndex === 5 ? centerStyle : activeIndex === 0 ? bottomStyle : topStyle}>GitHub</div>
      </div>
    </section>
  )
}
export default TecnologiesUsedNames
