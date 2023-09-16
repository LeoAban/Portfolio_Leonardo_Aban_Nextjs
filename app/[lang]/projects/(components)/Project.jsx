import styles from '../(styles)/Project.module.css'

export const Project = ({ img, title, subtitle, description }) => {
  return (
    <div className={styles.project}>
      <article className={styles.article}>
        <div className={styles.aricleBorder} />
        <div className={styles.image_video}>{img}</div>

        <div className={styles.data}>
          <span className={styles.articleTitle}>{title}</span>
          <div className={styles.articleLink}>
            <h2 className={styles.articleLinkTitle}>{subtitle}</h2>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </article>
    </div>
  )
}
