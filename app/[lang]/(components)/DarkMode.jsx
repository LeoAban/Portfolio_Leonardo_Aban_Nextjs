import styles from '../(styles)/DarkMode.module.css'
import DarkModeIcon from '@/icons/DarkModeIcon'

export const DarkMode = () => {
  return (
    <div className={styles.container}>
      <DarkModeIcon />
    </div>
  )
}
// (event) => onClickWrapper(toggleDarkMode, event)
//   export default DarkModeToggle
