import { useState } from 'react'
import styles from ''

export const useSelectionText = () => {
  const [selectedText, setSelectedText] = useState({ top: {}, bottom: {}, middle: {} })

  const SelectionText = () => {
    return (
      <div className={styles.selection}>
        {selectedText.top.length > 0 &&
          <div className={styles.selectionPart} style={{ ...selectedText.top }} />}

        {selectedText.bottom.length > 0 &&
          <div className={styles.selectionPart} style={{ ...selectedText.bottom }} />}

        {selectedText.middle.length > 0 &&
          <div className={styles.selectionPart} style={{ ...selectedText.middle }} />}
      </div>
    )
  }

  return { SelectionText, setSelectedText }
}
