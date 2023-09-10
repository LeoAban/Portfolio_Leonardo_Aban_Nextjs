'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

// Nombre del key en el localStorage para guardar el estado del modo oscuro
const localStorageKey = 'isDarkMode'

const colorPalette = {
  true: [
    { name: '--page-bg', color: 'rgb(5, 14, 26)' },
    { name: '--page-bg-dark', color: 'rgb(5, 14, 26)' },
    { name: '--page-bg-light', color: '#fff3e6' },

    { name: '--navbar-link-text', color: 'rgb(234, 243, 255)' },
    { name: '--navbar-link-text-hovered', color: 'rgb(5, 14, 26)' },
    { name: '--navbar-link-text-active', color: 'rgb(5, 14, 26)' },
    { name: '--navbar-link-bg', color: '#25a6e9' },
    { name: '--navbar-link-bg-active', color: 'rgb(168 127 251 / 1)' },
    { name: '--text', color: 'rgb(234, 243, 255)' },

    { name: '--footer-separation', color: 'rgb(234, 243, 255)' },
    { name: '--footer-text', color: 'rgb(234, 243, 255)' },

    { name: '--darkMode-button-moon-bg', color: 'rgb(57, 20, 94)' },
    { name: '--darkMode-button-sun-bg', color: '#696969' },
    { name: '--darkMode-button-sun-color', color: '#353535' },

    { name: '--home-title-opacity', color: '0' },

    { name: '--home-subtitle', color: 'rgb(234, 243, 255)' },
    { name: '--home-subtitle-underline', color: 'rgb(168 127 251 / 1)' },
    { name: '--home-text', color: 'rgb(234, 243, 255)' },
    { name: '--home-tecnologies-title', color: 'rgb(234, 243, 255)' },
    { name: '--home-tecnologies-1', color: '#39c3f5' },
    { name: '--home-tecnologies-2', color: '#000000' },
    { name: '--home-tecnologies-3', color: '#edf036' },
    { name: '--home-tecnologies-4', color: '#ff8c20' },
    { name: '--home-tecnologies-5', color: '#1e78cd' },
    { name: '--home-tecnologies-6', color: '#000000' },
    { name: '--home-tecnologies-text-black', color: 'black' },
    { name: '--home-tecnologies-text-white', color: 'white' },
    { name: '--home-stars', color: 'rgb(234, 243, 255)' },
    { name: '--home-estela', color: 'rgb(234, 243, 255)' },

    { name: '--about-title-cell-bg', color: 'rgb(16 21 29/1)' },
    { name: '--about-title-cell-shadow', color: '#2e3c51' },
    { name: '--about-title-cell-text', color: 'rgb(219, 228, 240)' },
    { name: '--about-title-cell-text-random', color: 'rgba(191, 199, 210, 0.616)' },
    { name: '--about-biography-title', color: 'rgb(234, 243, 255)' },
    { name: '--about-biography-text', color: 'rgb(234, 243, 255)' },
    { name: '--about-img-line', color: 'rgb(234, 243, 255)' },
    { name: '--about-biography-background-1', color: 'linear-gradient(#427480, #427480)' },
    { name: '--about-biography-background-2', color: 'linear-gradient(#3f7958, #3f7958)' },
    { name: '--about-biography-background-3', color: 'linear-gradient(#405f2e, #405f2e)' },
    { name: '--about-biography-background-4', color: 'linear-gradient(#8b7d2d, #8b7d2d)' },
    { name: '--about-biography-background-5', color: 'linear-gradient(#865f2a, #865f2a)' },
    { name: '--about-biography-background-6', color: 'linear-gradient(#7c4339, #7c4339)' },
    { name: '--about-skills-title', color: 'rgb(234, 243, 255)' },
    { name: '--about-skills-title-glitch-1', color: 'rgb(168 127 251)' },
    { name: '--about-skills-title-glitch-2', color: '#25a6e9' },
    { name: '--about-skills-card-bg', color: 'rgb(103, 81, 148)' },
    { name: '--about-skills-card-title', color: 'rgb(26, 13, 53)' },
    { name: '--about-skills-card-text', color: 'rgb(234, 243, 255)' },
    { name: '--about-skills-card-circle-1', color: 'rgb(26, 13, 53)' },
    { name: '--about-skills-card-circle-2', color: '#ffa23e' },
    { name: '--about-skills-card-circle-3', color: '#17b877' },

    { name: '--projects-title', color: 'rgb(234, 243, 255)' },
    { name: '--projects-card-title', color: 'rgb(168 127 251 / 1)' },
    { name: '--projects-card-link', color: 'rgb(234, 243, 255)' },
    { name: '--projects-card-text', color: 'rgb(234, 243, 255)' },
    { name: '--projects-card-line', color: 'rgb(234, 243, 255)' },
    { name: '--projects-card-line-under', color: 'rgb(234, 243, 255)' },

    { name: '--contactme-overlay', color: 'rgba(0, 0, 0, 0.685)' },
    { name: '--contactme-title-text', color: 'rgb(234, 243, 255)' },
    { name: '--contactme-title-bg', color: 'rgb(0, 18, 48)' },
    { name: '--contactme-title-bg-error', color: '#411313' },
    { name: '--contactme-title-bg-success', color: 'rgb(2, 29, 2)' },
    { name: '--contactme-message-text', color: 'rgb(234, 243, 255)' },
    { name: '--contactme-message-bg', color: '#324c5a' },
    { name: '--contactme-message-placeholder', color: 'rgb(188, 198, 211)' },
    { name: '--contactme-button-text', color: 'black' },
    { name: '--contactme-button-text-error', color: '#290605' },
    { name: '--contactme-button-text-success', color: 'rgb(12, 59, 12)' },
    { name: '--contactme-button-bg', color: '#e48124' },
    { name: '--contactme-button-bg-error', color: 'rgb(173, 93, 93)' },
    { name: '--contactme-button-bg-success', color: 'rgb(105, 173, 105)' },
    { name: '--contactme-button-loader', color: 'lightBlue' },
    { name: '--contactme-button-loader-spin', color: 'rgb(16 21 29/1)' },
    { name: '--contactme-button-loader-error', color: 'darkRed' },
    { name: '--contactme-button-loader-success', color: 'green' },

    { name: '--transition-time-slow', color: '.5s' },
    { name: '--transition-time-fast', color: '.25s' },
    { name: '--transition-time-project', color: '.1s' },
    { name: '--transition-time-lang', color: '.4s' }
  ],
  false: [
    { name: '--page-bg', color: '#fff3e6' },
    { name: '--page-bg-dark', color: 'rgb(5, 14, 26)' },
    { name: '--page-bg-light', color: '#fff3e6' },

    { name: '--navbar-link-text', color: '#36384C' },
    { name: '--navbar-link-text-hovered', color: 'white' },
    { name: '--navbar-link-text-active', color: 'white' },
    { name: '--navbar-link-bg', color: '#613A43' },
    { name: '--navbar-link-bg-active', color: '#58644e' },
    { name: '--text', color: '#36384C' },

    { name: '--footer-separation', color: '#36384c' },
    { name: '--footer-text', color: '#36384C' },

    { name: '--darkMode-button-moon-bg', color: '#696969' },
    { name: '--darkMode-button-sun-bg', color: 'rgb(254, 234, 172)' },
    { name: '--darkMode-button-sun-color', color: '#FEAD03' },

    { name: '--home-title-opacity', color: '1' },

    { name: '--home-subtitle', color: '#36384C' },
    { name: '--home-subtitle-underline', color: '#849974' },
    { name: '--home-text', color: '#36384C' },
    { name: '--home-tecnologies-title', color: '#36384C' },
    { name: '--home-tecnologies-1', color: '#39c3f5' },
    { name: '--home-tecnologies-2', color: '#000000' },
    { name: '--home-tecnologies-3', color: '#edf036' },
    { name: '--home-tecnologies-4', color: '#ff8c20' },
    { name: '--home-tecnologies-5', color: '#1e78cd' },
    { name: '--home-tecnologies-6', color: '#000000' },
    { name: '--home-tecnologies-text-black', color: 'black' },
    { name: '--home-tecnologies-text-white', color: 'white' },
    { name: '--home-stars', color: '#36384C' },
    { name: '--home-estela', color: '#36384C' },

    { name: '--about-title-cell-bg', color: '#613A43' },
    { name: '--about-title-cell-shadow', color: '#835d66' },
    { name: '--about-title-cell-text', color: '#ffeaef' },
    { name: '--about-title-cell-text-random', color: '#cca1ab7c' },
    { name: '--about-biography-title', color: '#36384C' },
    { name: '--about-biography-text', color: '#36384C' },
    { name: '--about-img-line', color: '#36384C' },
    { name: '--about-biography-background-1', color: 'linear-gradient(#88bcc9, #88bcc9)' },
    { name: '--about-biography-background-2', color: 'linear-gradient(#91d3af, #91d3af)' },
    { name: '--about-biography-background-3', color: 'linear-gradient(#a9d88e, #a9d88e)' },
    { name: '--about-biography-background-4', color: 'linear-gradient(#d3c576, #d3c576)' },
    { name: '--about-biography-background-5', color: 'linear-gradient(#dbb98d, #dbb98d)' },
    { name: '--about-biography-background-6', color: 'linear-gradient(#cf9d94, #cf9d94)' },
    { name: '--about-skills-title', color: '#36384C' },
    { name: '--about-skills-title-glitch-1', color: '#fd527a' },
    { name: '--about-skills-title-glitch-2', color: '#a1fc56' },
    { name: '--about-skills-card-bg', color: '#cee0c2' },
    { name: '--about-skills-card-title', color: '#4e222d' },
    { name: '--about-skills-card-text', color: '#36384C' },
    { name: '--about-skills-card-circle-1', color: '#4e222d' },
    { name: '--about-skills-card-circle-2', color: '#ffff6c' },
    { name: '--about-skills-card-circle-3', color: '#5f6e53' },

    { name: '--projects-title', color: '#36384C' },
    { name: '--projects-card-title', color: '#8f1030' },
    { name: '--projects-card-link', color: '#36384C' },
    { name: '--projects-card-text', color: '#36384C' },
    { name: '--projects-card-line', color: 'rgb(27 27 27/ 1)' },
    { name: '--projects-card-line-under', color: 'black' },

    { name: '--contactme-overlay', color: 'rgba(0, 0, 0, 0.5)' },
    { name: '--contactme-title-text', color: '#041e49' },
    { name: '--contactme-title-bg', color: '#b5c7a7' },
    { name: '--contactme-title-bg-error', color: '#ff8a8a' },
    { name: '--contactme-title-bg-success', color: '#9cf05c' },
    { name: '--contactme-message-text', color: '#36384C' },
    { name: '--contactme-message-bg', color: '#f5ffee' },
    { name: '--contactme-message-placeholder', color: '#4b4e69' },
    { name: '--contactme-button-text', color: '#f5ffee' },
    { name: '--contactme-button-text-error', color: '#ffcccb' },
    { name: '--contactme-button-text-success', color: 'lightGreen' },
    { name: '--contactme-button-bg', color: '#4e222d' },
    { name: '--contactme-button-bg-error', color: 'red' },
    { name: '--contactme-button-bg-success', color: 'green' },
    { name: '--contactme-button-loader', color: 'lightBlue' },
    { name: '--contactme-button-loader-spin', color: 'rgb(255, 255, 255)' },
    { name: '--contactme-button-loader-error', color: 'darkRed' },
    { name: '--contactme-button-loader-success', color: 'green' },

    { name: '--transition-time-slow', color: '1s' },
    { name: '--transition-time-fast', color: '.7s' },
    { name: '--transition-time-project', color: '.8s' },
    { name: '--transition-time-lang', color: '.3s' }

  ]
}

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState()

  useEffect(() => {
    // Verifica si el usuario ya ha seleccionado el modo oscuro en el pasado
    const storedValue = localStorage.getItem(localStorageKey)
    if (storedValue) {
      setIsDarkMode(JSON.parse(storedValue))
    } else {
      // Si no hay una preferencia guardada en localStorage, usa el valor inicial
      // Esto podría basarse en la hora del día o en cualquier otra lógica que desees
      const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkMode(isDarkPreferred)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode === undefined) return
    colorPalette[`${isDarkMode}`].forEach(variable => {
      document.documentElement.style.setProperty(variable.name, variable.color)
    })

    // const className = 'dark'
    // const bodyClasses = window.document.body.classList
    // isDarkMode ? bodyClasses.add(className) : bodyClasses.remove(className)
  }, [isDarkMode])

  // Función para cambiar entre modos claro y oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(localStorageKey, JSON.stringify(!isDarkMode))
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
