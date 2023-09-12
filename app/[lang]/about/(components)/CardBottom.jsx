import styles from '../(styles)/CardBottom.module.css'

export const CardBottom = ({ description: { title, text } }) => {
  return (
    <>
      <div className={styles.header}>
        <div />
        <div />
        <div />
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.text}>{text}</p>
    </>
  )
}
