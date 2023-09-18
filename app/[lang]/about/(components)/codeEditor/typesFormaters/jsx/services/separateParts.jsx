import { getPartData } from '../services/getPartData'
import { separateOperators } from './separateOperators'

import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'

const reserved = () => {
  // Palabras clave de js reservadas
  const KEYWORDS = ['const', 'let', 'var', 'return', 'if', 'switch', 'function', 'else', 'break', 'continue', 'for', 'while', 'import', 'from', 'export', 'default', 'public', 'async', 'await', 'class', 'new', 'void', 'constructor']

  // valores reservados de js
  const RESERVED_VALUES = ['null', 'undefined', 'true', 'false']

  // Operadores de js
  const OPERATORS = ['(', ')', '{', '}', '[', ']', '<', '>', '=', '?', ':', '+', '*', '-', '//', '/*', '*/', '/', '.', ',', '!', ';', '\'', '?', '`', '$', '=>']

  return { KEYWORDS, RESERVED_VALUES, OPERATORS }
}

const checkIfCommented = (wordsArray, globalBooleans, BOOLEANS, all, partModel, i) => {
  const result = { array: '', index: undefined }

  // Si es un comentario tipo /* no tengo q seguir iterando a menos q sea uno q abre y cierre como el /+ */ porq si cierra el resto de la linea deja de ser comentario
  if (globalBooleans.isCommentAll) {
    let index

    for (let iterable = i; iterable < wordsArray.length; iterable++) {
      const partComment = { ...partModel }
      partComment.type = TYPES_PARTS_OF_LINE.comment
      partComment.content = wordsArray[iterable]
      all.push(partComment)

      if (wordsArray[iterable] === '*/') {
        index = iterable
        globalBooleans.isCommentAll = false
        break
      }
    }

    // Si existe un */ termino el comentario ahi y sigo el array desde la siguiente palabra luego de */, si no existe significa q todo el resto de la linea es un comentario
    if (index) {
      result.index = index
      result.array = 'continue'
    } else {
      result.array = 'break'
    }
  }

  // Si es un comentario (comentario tipo //) entonces toda la linea queda como tipo comentario a partir de donde se encuentre el //
  if (BOOLEANS.isComment) {
    result.array = 'break'
    globalBooleans.isComment = false

    for (let iterable = i; iterable < wordsArray.length; iterable++) {
      const part = { type: TYPES_PARTS_OF_LINE.comment, content: wordsArray[iterable] }
      all.push(part)
    }
  }

  return result
}

export const separateParts = (
  line,

  globalStates

) => {
  const {

    namesArrays,

    globalBooleans

  } = globalStates

  // Constante q guarda el conjunto de palabras de la linea de codigo
  const all = []

  // Modelo de la parte (osea la palabra) que puede tener tipo (define el color) o contenido (palabra en si)
  const partModel = { type: '', content: '' }

  /* Types checks */ // Datos a checkear para saber a q tipo pertenece cada palabra
  const { KEYWORDS, RESERVED_VALUES, OPERATORS } = reserved()

  // Booleanos q dicen de q tipo es la palabra

  const BOOLEANS = {
    isConstant: false,
    isVariable: false,
    isTag: false,
    isTagProperty: false,
    isFunction: false,
    isComment: false,
    isProperty: false,
    isString: false,
    isSpecialString: { open: false, varOpen: false }
  }

  globalStates.namesArrays.variablesInScope = []
  /**/

  // Separo la linea en un array de palabras, contando espacios tambien
  const words = line.split(/(\s+)/)

  // Separo strings dentro del array de palabras si cuentan con un operador
  const wordsArray = separateOperators(words, OPERATORS)

  // Reviso palabra por palabra para ver q tipo es
  for (let i = 0; i < wordsArray.length; i++) {
    const iterationChange = checkIfCommented(wordsArray, globalBooleans, BOOLEANS, all, partModel, i)

    if (iterationChange.array === 'break') break

    if (iterationChange.array === 'continue') {
      i = iterationChange.index
      continue
    }

    // Devuelvo la palabra para ver q tipo y contenido tiene. Aparate devuelvo todos los booleanos para ver si cambio algun valor, si es asi lo actualizo al booleano para q la siguiente palabra sea del tipo del booleano q sea true
    const {
      part,

      newConstant,
      newVariable,
      newFunction,
      newComponent

    } = getPartData({
      wordsArray,
      positionArray: i,

      part: { ...partModel },

      KEYWORDS,
      RESERVED_VALUES,
      OPERATORS,

      BOOLEANS,

      globalStates

    })

    const {
      constantsNamesArray,
      variablesNamesArray,
      functionsNamesArray,
      componentNamesArray
    } = namesArrays

    if (newConstant) constantsNamesArray.push(newConstant)
    if (newVariable) variablesNamesArray.push(newVariable)
    if (newFunction) functionsNamesArray.push(newFunction)
    if (newComponent) componentNamesArray.push(newComponent)

    // Guardo la palabra en el array de palabras
    all.push(part)
  }

  return all
}
