import { NavBar } from './(components)/NavBar'
import { Footer } from './(components)/Footer'

import GrowingCircleAnimation from './(components)/GrowingCircleAnimation'
import { DarkModeProvider } from '@/hooks/useDarkMode'

import styles from './app.module.css'
import './global.css'

import { defaultLocale } from '@/i18n.config'

// import { cookies } from 'next/headers'
import { colorPalette } from '@/constants/colorPalette'


export default function RootLayout ({ children, params }) {
  const { lang } = params
  // const nextCookies = cookies()

  // const darkModeCookie = nextCookies.get('NEXT_DARKMODE')
  // const { value } = darkModeCookie
  // const isDarkMode = value !== 'false'
  const isDarkMode = true

  return (
    <html lang={lang ?? defaultLocale} style={colorPalette[isDarkMode]}>
      <head>
        <title>
          Leonardo Abán Portfolio
        </title>
      </head>
      <body className={styles.body}>
        <DarkModeProvider coockieValue={isDarkMode}>
          <GrowingCircleAnimation />
          <NavBar lang={lang} />
          {children}
          <Footer lang={lang} />
        </DarkModeProvider>
      </body>
    </html>
  )
}
