import styles from '../(styles)/Photo.module.css'

import Image from 'next/image'

export const Photo = () => {
  return (
    <div className={styles.container}>
      <Image src='/image/blackWhite.png' alt='photoB&W' width={225} height={320} />
    </div>
  )
}
