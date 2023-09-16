import styles from './(styles)/Home.module.css'
import Main from './(components)/Main'

import Tecnologies from './(components)/Tecnologies'
import Welcome from './(components)/Welcome'

export default function HomePage ({ params }) {
  const { lang } = params

  return (
    <Main className={styles.main}>

      <article className={styles.article}>

        <div className={styles.introduction}>

          <section className={styles.tecnologies}>
            <Tecnologies lang={lang} />
          </section>

          <section className={styles.welcome}>
            <Welcome lang={lang} />
          </section>

        </div>
      </article>

    </Main>
  )
}
