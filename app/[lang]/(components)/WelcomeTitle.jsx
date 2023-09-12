'use client'

import { useEffect } from 'react'
import styles from '../(styles)/Welcome.module.css'
import dictionary from '@/content'

export const WelcomeTitle = ({ lang }) => {
  return (
    <h1 className={styles.title}>
      {dictionary[lang]?.homeWelcomeTitle}
      <div className={styles.titleAfter}>{dictionary[lang]?.homeWelcomeTitle}</div>
    </h1>
  )
}
