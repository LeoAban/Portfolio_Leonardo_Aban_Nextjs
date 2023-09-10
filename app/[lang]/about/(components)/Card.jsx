import styles from '../(styles)/Card.module.css'
import { CardBottom } from './CardBottom'
export const Card = ({ children, background, description }) => {
  return (
    <div className={styles.skill}>
      <div className={styles.card}>
        <section className={styles.top}>
          <div className={styles.background}>
            {background}
          </div>
          <div className={styles.glass}>
            {children}
          </div>
        </section>
        <section className={styles.bottom}>
          <CardBottom description={description} />
        </section>
      </div>
    </div>
  )
}
