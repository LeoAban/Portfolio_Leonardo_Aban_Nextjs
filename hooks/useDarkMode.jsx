'use client'

import { createContext, useContext, useState, useEffect } from 'react'

import { colorPaletteObject } from '@/constants/colorPalette'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children, coockieValue }) => {
  const [isDarkMode, setIsDarkMode] = useState(coockieValue)

  useEffect(() => {
    if (isDarkMode === undefined) return
    colorPaletteObject[`${isDarkMode}`].forEach(variable => {
      document.documentElement.style.setProperty(variable.name, variable.color)
    })
  }, [isDarkMode])

  // Función para cambiar entre modos claro y oscuro
  const toggleDarkMode = () => {
    document.cookie = `NEXT_DARKMODE=${!isDarkMode}; max-age=2592000; path=/`
    setIsDarkMode(!isDarkMode)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  return useContext(DarkModeContext)
}
