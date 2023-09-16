import styles from '../(styles)/Welcome.module.css'

import dictionary from '@/content'

const Welcome = ({ lang }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {dictionary[lang]?.homeWelcomeTitle}
        <div className={styles.titleAfter}>{dictionary[lang]?.homeWelcomeTitle}</div>
      </h1>
      <h2 className={styles.subtitle}>
        {dictionary[lang]?.homeWelcomeSubtitle.first}
        <span className={styles.underline}>
          {dictionary[lang]?.homeWelcomeSubtitle.underlined}
        </span>
        {dictionary[lang]?.homeWelcomeSubtitle.last}
      </h2>
      <p className={styles.text}>
        {dictionary[lang]?.homeWelcomeText}
      </p>
    </div>
  )
}
export default Welcome
