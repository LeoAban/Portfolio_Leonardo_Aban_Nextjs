import { separateParts } from './services/separateParts'
import { getClassName } from './services/getClassName'

export const CSSTextFormater = ({
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
