import { NavBar } from './(components)/NavBar'
import { Footer } from './(components)/Footer'

import GrowingCircleAnimation from './(components)/GrowingCircleAnimation'
import { DarkModeProvider } from '@/hooks/useDarkMode'

import styles from './app.module.css'
import './global.css'

import { defaultLocale } from '@/middleware'

export default function RootLayout ({ children, params }) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <head>
        <title>
          Leonardo Abán Portfolio
        </title>
      </head>
      <body className={styles.body}>
        <DarkModeProvider>
          <GrowingCircleAnimation />
          <NavBar params={params} />
          {children}
          <Footer params={params} />
        </DarkModeProvider>
      </body>
    </html>
  )
}
