import { separateOperators } from './separateOperators'
import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'

const OPERATORS = ['(', ')', ',', ':', ';']
const CLASS_OPERATORS = ['{', '}', '.']

export const separateParts = (
  line,

  globalStates
) => {
  // Constante q guarda el conjunto de palabras de la linea de codigo
  const all = []

  // Separo la linea en un array de palabras, contando espacios tambien
  const words = line.split(/(\s+)/)

  // Separo strings dentro del array de palabras si cuentan con un operador
  const wordsArray = separateOperators(words, [...CLASS_OPERATORS, ...OPERATORS])

  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i]

    const part = { type: '', content: word }

    if (word === '.' && !globalStates.insideClass && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.class
      globalStates.isClass = true
    }

    if (word === '{' && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.class
      globalStates.isClass = false
      globalStates.insideClass = true
    }

    if (word === '}' && globalStates.insideClass && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.class
      globalStates.insideClass = false
      globalStates.isClass = false
    }

    if (globalStates.isClass && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.class
    }

    if (word === ':' && globalStates.insideClass && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.property
      globalStates.isValue = true
    }

    if (word === ';' && globalStates.isValue && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.property
      globalStates.isValue = false
    }

    if (globalStates.insideClass && !globalStates.isValue && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.property
    }

    if (OPERATORS.includes(word) && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.property
    }

    if (globalStates.isValue && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.value
    }

    if (!globalStates.insideClass && !globalStates.isClass && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.tag
    }

    if (word.trim().length === 0) { part.type = '' }

    all.push(part)
  }

  return all
}
