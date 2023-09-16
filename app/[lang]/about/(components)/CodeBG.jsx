import styles from '../(styles)/CodeBG.module.css'
import { Code, CopyCodeIcon } from './codeEditor/Code'

export const CodeBG = ({ type }) => {
  return (
    <pre>
      <div className={styles.editor}>
        <div className={styles.editorTitle}>
          <span>{type}</span>
          <button className={styles.editorCopyCodeButton}>
            <CopyCodeIcon />
            Copy code
          </button>

        </div>

        <Code type={type} />
      </div>
    </pre>
  )
}
