'use client'

import { locales } from '@/i18n.config'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import styles from '../(styles)/SelectLanguage.module.css'

export const SelectLanguage = ({ lang }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setOpenDropdown(!openDropdown)
  }

  const handleChangeLocale = (locale) => {
    if (lang === locale) return
    document.cookie = `NEXT_LOCALE=${locale}; max-age=2592000; path=/`
    router.refresh()
  }

  return (
    <div className={styles.dropdown}>
      <label onClick={handleClick}>{lang} <div className={styles.triangle} style={openDropdown ? { transform: 'rotate(180deg)' } : {}} /></label>
      {openDropdown &&

        <div className={styles.dropdownList}>
          {locales.map(locale => {
            return (
              <div
                key={locale}
                onClick={() => handleChangeLocale(locale)}
                className={lang === locale ? styles.optionActive : styles.option}
              >
                {locale}
              </div>
            )
          })}

        </div>}
    </div>
  )
}
