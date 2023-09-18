import { useState } from 'react'
import styles from ''

export const useCursor = () => {
  const [isVisible, setIsVisible] = useState(false)

  const CursorText = ({ markPostition }) => {
    return (
      <div className={styles.cursorWrapper}>
        <div className={styles.cursor} style={{ visibility: isVisible ? 'visible' : 'hidden', ...markPostition }}>
              &nbsp;
        </div>
      </div>
    )
  }

  return { CursorText, setIsVisible }
}
