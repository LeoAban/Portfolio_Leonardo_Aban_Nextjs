import styles from '../(styles)/Footer.module.css'
import Link from 'next/link'

import dictionary from '@/content'

export function Footer ({ lang }) {
  return (
    <footer className={styles.footer}>
      <section className={styles.data}>

        <Link className={styles.curriculum} href='/pdf/cvLeonardoAban.pdf' target='_blank'>CV</Link>
        <> </>
        <Link className={styles.mail} href='?contactMe=true' scroll={false}>
          {dictionary[lang]?.contactMe}
        </Link>

      </section>
    </footer>
  )
}

// El <> </> es porq sino scrolea para arriba, es una solucion q encontro un random por internet
