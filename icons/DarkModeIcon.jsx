'use client'

import styles from './DarkModeIcon.module.css'
import { useDarkMode } from '../hooks/useDarkMode'

const MoonIcon = ({ isDarkMode, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    xmlSpace='preserve'
    width={38}
    height={38}
    viewBox='0 0 472.618 472.618'
    {...props}
  >
    <path
      fill={isDarkMode ? '#fff' : '#353535'} d='M380.525 337.291c-135.427 0-245.302-109.773-245.302-245.302 0-32.502 6.338-63.575 17.991-91.988C63.372 36.286 0 124.39 0 227.315c0 135.427 109.875 245.302 245.302 245.302 102.923 0 191.029-63.472 227.316-153.315-28.417 11.652-59.489 17.989-92.093 17.989z'
    />
  </svg>
)

const Star = ({ isDarkMode, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    viewBox='0 0 32 32'
    {...props}
  >
    <path
      fill={isDarkMode ? '#fff' : '#353535'} d='m3.488 13.184 6.272 6.112-1.472 8.608L16 23.84l7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248L16 4.128l-3.872 7.808z'
    />
  </svg>
)

const Cloud1 = ({ isDarkMode, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    viewBox='0 -1.5 35 35'
    {...props}
  >
    <path
      fill={isDarkMode ? '#353535' : '#fff'} d='M27.873 28s5.52.006 6.295-5.395c.369-5.906-5.336-7.07-5.336-7.07s.649-8.743-7.361-9.74c-6.865-.701-8.954 5.679-8.954 5.679s-2.068-1.988-4.873-.364c-2.511 1.55-2.067 4.388-2.067 4.388S0 16.582 0 22.266C.125 27.943 6.057 28 6.057 28'
    />
  </svg>
)

const Cloud2 = ({ isDarkMode, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={40}
    height={40}
    viewBox='0 -4 32 32'
    {...props}
  >
    <path
      fill={isDarkMode ? '#353535' : '#fff'}
      fillRule='evenodd'
      d='M23.067 5.028C21.599 2.053 18.543 0 15 0c-4.749 0-8.63 3.682-8.967 8.345C2.542 9.34 0 12.39 0 16c0 4.26 3.54 7.755 8 8h15c4.966 0 9-4.253 9-9.5 0-5.056-3.951-9.177-8.933-9.472'
    />
  </svg>
)

const onClickWrapper = (event, toggleDarkMode, isDarkMode) => {
  // when mobile device is zoomed in using the pinch gesture, we need to get the relative
  // coordinate on the page.
  // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-
  // an-html-element-relative-to-the-browser-window
  const bodyRect = document.body.getBoundingClientRect()
  const elemRect = event.target.getBoundingClientRect()
  const offsetTop = elemRect.top - bodyRect.top
  const offsetLeft = elemRect.left - bodyRect.left

  // this tells us how much the user has zoomed in using the pinch gesture
  const deviceZoomRatio =
        document.documentElement.clientWidth / window.innerWidth

  const customEventState = {
    x: offsetLeft + elemRect.width / 2,
    // if the user is pinch zoomed in, then use the pinch zoom coordinate detection logic,
    // otherwise, use the distance of the icon from the top of the page. For some reason
    // offsetTop doesn't work when the user scrolls down and the zoom ratio == 1 (iOS14)
    y: (deviceZoomRatio > 1 ? offsetTop : elemRect.top) + elemRect.height / 2
  }

  const darkModeToggleEvent = new CustomEvent('darkModeToggle', {
    detail: customEventState
  })
  toggleDarkMode(!isDarkMode)
  dispatchEvent(darkModeToggleEvent)
}

const DarkModeIcon = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  // Se me ocurre no puedo sacar las ref en toda la pagina por ser un hook pero capaz puedo hacer algo para pasar el styles.clase a una funcion q mira el isDarkMode y con un useEffect cambia los q tienen el styles.clase

  return (
    <div className={styles.yinyang} onClick={(event) => onClickWrapper(event, toggleDarkMode, isDarkMode)}>
      <div className={styles.moon}>
        <MoonIcon isDarkMode={isDarkMode} />
      </div>
      <div className={styles.star1}>
        <Star isDarkMode={isDarkMode} />
      </div>
      <div className={styles.star2}>
        <Star isDarkMode={isDarkMode} />
      </div>
      <div className={styles.star3}>
        <Star isDarkMode={isDarkMode} />
      </div>
      <div className={styles.cloud1}>
        <Cloud1 isDarkMode={isDarkMode} />
      </div>
      <div className={styles.cloud2}>
        <Cloud2 isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}

export default DarkModeIcon
