'use client'

import styles from '../(styles)/NavBar.module.css'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const lineClassesArray = [
  { closed: styles.mobileMenuLine1, open: styles.mobileMenuLine1 + ' ' + styles.menuOpenLine1 },
  { closed: styles.mobileMenuLine2, open: styles.mobileMenuLine2 + ' ' + styles.menuOpenLine2 },
  { closed: styles.mobileMenuLine3, open: styles.mobileMenuLine3 + ' ' + styles.menuOpenLine3 }
]

export const MobileMenuButton = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const handleClick = () => {
    setMenuOpen(!menuOpen)
  }

  const pageOverflowHidden = menuOpen ? 'overflow: hidden' : ''

  return (
    <section className={menuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed}>
      <button className={styles.mobileMenuButton} onClick={handleClick}>
        {lineClassesArray.map(({ closed, open }, index) => {
          return (<span key={index} className={menuOpen ? open : closed} />)
        })}
      </button>

      <style>
        {`        
          @media (max-width: 650px) {            
            body, html {
              ${pageOverflowHidden}
            }
          }
        `}
      </style>

    </section>

  )
}
