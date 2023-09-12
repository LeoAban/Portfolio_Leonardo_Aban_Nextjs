'use client'

import { useState } from 'react'
import styles from '../(styles)/SelectLanguage.module.css'
import { setLangCookies } from './setLangCookies'
import { useRouter, usePathname } from 'next/navigation'

export const SelectLanguage = ({ lang }) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    setOpenDropdown(!openDropdown)
  }

  const changeLanguage = (newLang) => {
    if (newLang === lang) return
    setOpenDropdown(false)
    setLangCookies(newLang)
    router.push(pathname)
  }

  return (
    <div className={styles.dropdown}>
      <label onClick={handleClick}>{lang} <div className={styles.triangle} style={openDropdown ? { transform: 'rotate(180deg)' } : {}} /></label>
      {openDropdown &&
        <div className={styles.dropdownList}>
          <div className={lang === 'en' ? styles.optionActive : styles.option} onClick={() => changeLanguage('en')}>EN</div>
          <div className={lang === 'es' ? styles.optionActive : styles.option} onClick={() => changeLanguage('es')}>ES</div>
        </div>}
    </div>
  )
}
