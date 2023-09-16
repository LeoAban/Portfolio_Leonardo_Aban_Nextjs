import { separateOperators } from './separateOperators'
import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'

const OPERATORS = ['<', '>', '/']

export const separateParts = (
  line,

  globalStates
) => {
  // Constante q guarda el conjunto de palabras de la linea de codigo
  const all = []

  // Separo la linea en un array de palabras, contando espacios tambien
  const words = line.split(/(\s+)/)

  // Separo strings dentro del array de palabras si cuentan con un operador
  const wordsArray = separateOperators(words, OPERATORS)

  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i]

    const part = { type: '', content: word }

    if (word === '<' && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.operator
      globalStates.isTag = true
    }

    if (word === '>' && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.operator
      globalStates.isTag = false
      globalStates.isTagProperty = false
      globalStates.isText = true

      if (globalStates.nextClosed) {
        globalStates.nextClosed = false
      }
    }

    if (globalStates.isTag && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.tag

      if (word === '/') {
        part.type = TYPES_PARTS_OF_LINE.operator
        globalStates.nextClosed = true
      }

      if (globalStates.tags.includes(word) && globalStates.nextClosed) {
        globalStates.isText = false

        const indexToRemove = globalStates.tags.findIndex(tag => tag === word)
        globalStates.tags = globalStates.tags.splice(indexToRemove, 1)
      } else {
        globalStates.tags = [...globalStates.tags, word]
        globalStates.isTag = false
        globalStates.isTagProperty = true
      }
    }

    if (globalStates.isTagProperty && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.property

      if (word === '=') {
        part.type = TYPES_PARTS_OF_LINE.operator
      }
    }

    if (globalStates.isText && part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.text
    }

    if (part.type === '') {
      part.type = TYPES_PARTS_OF_LINE.error
    }

    if (word.trim().length === 0) { part.type = '' }

    all.push(part)
  }

  return all
}
