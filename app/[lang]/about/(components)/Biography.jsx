'use client'

import { useRef } from 'react'
import styles from '../(styles)/Biography.module.css'
import dictionary from '@/content'

export const Biography = ({ lang }) => {
  const titleRef = useRef(null)

  const getLineColor = (index) => {
    // const colors = ['#8be8ff', '#87ffbd', '#b1ff84', '#f6e05e', '#ffcf91', '#ffa090']
    // const colors = ['#69c5e1', '#67e6b5', '#89d764', '#e2cc4d', '#e1b16c', '#e67a70']
    const colors = ['#4d99b3', '#4dab8c', '#609e40', '#a68c33', '#a37646', '#a3504a']
    return colors[index]
  }
  const handleLineHover = (index) => {
    titleRef.current.style.color = getLineColor(index)
  }

  const handleLineLeave = () => {
    titleRef.current.style.color = ''
  }

  const BiographyText = [
    dictionary[lang]?.aboutBiographyText.paragraph1,
    dictionary[lang]?.aboutBiographyText.paragraph2,
    dictionary[lang]?.aboutBiographyText.paragraph3,
    dictionary[lang]?.aboutBiographyText.paragraph4,
    dictionary[lang]?.aboutBiographyText.paragraph5,
    dictionary[lang]?.aboutBiographyText.paragraph6
  ]

  return (
    <>
      <h4 className={styles.title} ref={titleRef}>
        {dictionary[lang]?.aboutBiographyTitle}
      </h4>
      <div className={styles.text}>
        {BiographyText.map((line, index) => {
          return (<div className={styles.line} key={index} onMouseEnter={() => handleLineHover(index)} onMouseLeave={handleLineLeave}><span className={styles.span}>{line}</span></div>)
        })}
      </div>

    </>
  )
}
