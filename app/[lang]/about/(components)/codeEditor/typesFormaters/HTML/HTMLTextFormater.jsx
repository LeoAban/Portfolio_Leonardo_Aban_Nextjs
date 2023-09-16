import { separateParts } from './services/separateParts'
import { getClassName } from './services/getClassName'

export const HTMLTextFormater = ({
  line,
  globalStates
}) => {
  // separo las lineas de codigo por cada palabra
  const newLine = separateParts(line, globalStates)

  return (
    <>

      {newLine.map(({ type, content }, index) => (
        <span key={index} className={getClassName(type)}>{content}</span>
      ))}

    </>
  )
}

/*
const TagHTML = ({ tag, children }) => {
  return (
    <>

      <div className={styles.codeDiv}>
        &lt;
        <span className={styles.htmlTag}>{tag}</span>
        &gt;
      </div>

      <div className={styles.codeDiv}>
        {children}
      </div>

      <div className={styles.codeDiv}>
        &lt;/
        <span className={styles.htmlTag}>{tag}</span>
        &gt;
      </div>
    </>

  )
}
/**/

/*
  <code className={styles.editorCodeContent}>

    <SelectionText markPostition={markPostition} />
    <CursorText markPostition={markPostition} />

    <TagHTML tag='h1'>

      <span onMouseDown={handleMouseDown} ref={textRef}>{codeText}</span>

    </TagHTML>

  </code>

*/
