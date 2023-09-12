import styles from '../(styles)/Tecnologies.module.css'

// import Image from 'next/image'

import SolarSystem from './SolarSystem'
import Rocket from './Rocket'
import TecnologiesUsedNames from './TecnologiesUsedNames'

import dictionary from '@/content'

const Tecnologies = ({ lang }) => {
  return (
    <>
      <h2 className={styles.title}>
        <div className={styles.titleText}>
          {dictionary[lang]?.homeTecnologiesTitle}{' '}
        </div>
        <TecnologiesUsedNames />
      </h2>
      <section className={styles.content}>

        <section className={styles.system}>
          <SolarSystem />
        </section>
        <section className={styles.rocket}>
          <Rocket />
        </section>

      </section>
    </>
  )
}
export default Tecnologies
