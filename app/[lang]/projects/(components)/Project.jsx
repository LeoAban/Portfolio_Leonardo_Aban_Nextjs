import styles from '../(styles)/Project.module.css'

import Link from 'next/link'

export const Project = ({ img, title, subtitle, description }) => {
  return (
    <div className={styles.project}>
      <article className={styles.article}>
        <div className={styles.image_video}>{img}</div>

        <div className={styles.data}>
          <span className={styles.articleTitle}>{title}</span>
          <Link href='https://youtu.be/JvGFWqf7DRc?si=nGLX-wmzk3XkREnv' target='_blank' className={styles.articleLink}>
            <h2 className={styles.articleLinkTitle}>{subtitle}</h2>
          </Link>
          <p className={styles.description}>{description}</p>
        </div>
      </article>
    </div>
  )
}
