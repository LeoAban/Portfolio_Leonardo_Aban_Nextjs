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
      <div
        className={styles.first}
        style={activeIndex === 0 ? centerStyle : activeIndex === 1 ? bottomStyle : topStyle}
      >
        <div>React</div>
      </div>
      <div
        className={styles.second}
        style={activeIndex === 1 ? centerStyle : activeIndex === 2 ? bottomStyle : topStyle}
      >
        <div>Nextjs</div>
      </div>
      <div
        className={styles.third}
        style={activeIndex === 2 ? centerStyle : activeIndex === 3 ? bottomStyle : topStyle}
      >
        <div>Javascript</div>
      </div>
      <div
        className={styles.fourth}
        style={activeIndex === 3 ? centerStyle : activeIndex === 4 ? bottomStyle : topStyle}
      >
        <div>HTML</div>
      </div>
      <div
        className={styles.fifth}
        style={activeIndex === 4 ? centerStyle : activeIndex === 5 ? bottomStyle : topStyle}
      >
        <div>CSS</div>
      </div>
      <div
        className={styles.sixth}
        style={activeIndex === 5 ? centerStyle : activeIndex === 0 ? bottomStyle : topStyle}
      >
        <div>GitHub</div>
      </div>
    </section>
  )
}
export default TecnologiesUsedNames
