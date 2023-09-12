import styles from './About.module.css'

import { Skills } from './(components)/Skills'
// import { Education } from './(components)/Education'
import { Biography } from './(components)/Biography'
import { Photo } from './(components)/Photo'
import { Title } from './(components)/Title'

import Main from '../(components)/Main'

export default function About ({ params }) {
  const { lang } = params

  return (
    <Main className={styles.main}>
      <h1 className={styles.title}><Title lang={lang} /></h1>
      <section className={styles.presentationWrapper}>
        <div className={styles.presentation}>
          <div className={styles.biography}><Biography lang={lang} /></div>
          <div className={styles.photo}><Photo /></div>
        </div>
      </section>
      <section className={styles.skills}><Skills lang={lang} /></section>
      {/* <section className={styles.education}><Education /></section> */}

    </Main>
  )
}
