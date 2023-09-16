import styles from '../(styles)/SolarSystem.module.css'

import JavascriptIcon from '@/icons/JavascriptIcon'
import ReactIcon from '@/icons/ReactIcon'
import NextjsIcon from '@/icons/NextjsIcon'

const SolarSystem = () => {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.sun}>
          <JavascriptIcon width={60} height={60} />
        </div>

        <div className={styles.planetOrbit}>
          <ReactIcon className={styles.planet} width={20} height={20} />
          <div className={styles.moonOrbit}>
            <NextjsIcon className={styles.moon} width={20} height={20} />
          </div>
        </div>
      </div>

    </div>
  )
}
export default SolarSystem

// const CodigoInicial = () => {
//     return (
//       <div className={styles.body}>
//         <div className={styles.container}>
//           <div className={styles.sun} />
//           <div className={styles.earth}>
//             <div className={styles.moon} />
//           </div>
//         </div>

//       </div>
//     )
//   }
//   export default CodigoInicial
