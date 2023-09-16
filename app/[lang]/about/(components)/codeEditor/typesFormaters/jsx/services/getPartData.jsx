import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'

export const getPartData = ({
  wordsArray,
  positionArray,

  part,

  KEYWORDS,
  RESERVED_VALUES,
  OPERATORS,

  BOOLEANS,

  globalStates: {
    namesArrays,

    curlyBracket,

    globalBooleans,

    htmlTags
  }
}) => {
  /*
      Prioridades:
      1) Comment
      2) Operator

      3) Property
        3.1) if has : or = before
      4) MayusConstant
      ) Keyword
      ) Constant
      ) Function
      ) Variable
      ) Component
      ) ReservedValues
      ) Tag
      ) TagProperty
      ) String
      ) Number
      ) Error
    */

  const word = wordsArray[positionArray]

  const {
    constantsNamesArray,
    variablesNamesArray,
    functionsNamesArray,
    componentNamesArray,
    specialFunctionsNamesArray,
    variablesInScope
  } = namesArrays

  const {
    equalsOpen,
    doubleDotOpen,
    parentheseOpen,
    isImported
  } = globalBooleans

  const {
    isConstant,
    isFunction,
    isVariable,
    isTag,
    isTagProperty,
    isProperty,
    isString,
    isSpecialString
  } = BOOLEANS

  part.content = word

  const dataToReturn = { part }

  if (word.trim().length === 0) { return dataToReturn }

  if (word === '`') {
    if (!BOOLEANS.isString) BOOLEANS.isSpecialString.open = !isSpecialString.open
    globalBooleans.isImported = false
  }

  if (word === '\'') {
    BOOLEANS.isString = !isString
    globalBooleans.isImported = false
  }

  if (isString) {
    part.type = TYPES_PARTS_OF_LINE.string
    return dataToReturn
  }

  if (word === '$') {
    if (wordsArray[positionArray + 1] === '{') {
      part.type = TYPES_PARTS_OF_LINE.operator
      BOOLEANS.isSpecialString.varOpen = true
    }

    return dataToReturn
  }

  if (isSpecialString.open && !isSpecialString.varOpen) {
    part.type = TYPES_PARTS_OF_LINE.string
    return dataToReturn
  }

  if (word === '{') {
    part.type = TYPES_PARTS_OF_LINE.operator

    curlyBracket.open = true
    if ((equalsOpen || doubleDotOpen) && !previousItemIs('=>') && !parentheseOpen && !htmlTags.isText) {
      curlyBracket.isProperty = true

      globalBooleans.equalsOpen = false
      globalBooleans.doubleDotOpen = false
    }
    if (parentheseOpen && !previousItemIs('=>')) {
      curlyBracket.isProperty = false
      globalBooleans.equalsOpen = false
      globalBooleans.doubleDotOpen = false
    }
    if (isSpecialString.open) {
      curlyBracket.open = false
      curlyBracket.isProperty = false
    }
    if (isTagProperty) { BOOLEANS.isTagProperty = false }
    if (htmlTags.isText) {
      htmlTags.isVar = true
    }

    return dataToReturn
  }

  if (word === '}') {
    part.type = TYPES_PARTS_OF_LINE.operator
    curlyBracket.open = false
    curlyBracket.isProperty = false
    BOOLEANS.isSpecialString.varOpen = false

    htmlTags.isVar = false
    if (isTag) { BOOLEANS.isTagProperty = true }

    return dataToReturn
  }

  if (htmlTags.isText && !htmlTags.isVar) {
    if (!BOOLEANS.isTag && !BOOLEANS.isTagProperty && !OPERATORS.includes(word)) {
      part.type = TYPES_PARTS_OF_LINE.htmlText
      return dataToReturn
    }
  }

  if (word === ':') {
    if (curlyBracket.isProperty) {
      part.type = TYPES_PARTS_OF_LINE.operator
      curlyBracket.isProperty = false
      globalBooleans.doubleDotOpen = true
      return dataToReturn
    }
  }

  if (!isNaN(word)) {
    part.type = TYPES_PARTS_OF_LINE.number

    return dataToReturn
  }

  //
  //
  //
  //
  // Forzado los colores para no seguir con esto
  if (word === 'void') {
    part.type = TYPES_PARTS_OF_LINE.constant
    return dataToReturn
  }

  if (word === 'listarInformacion') {
    part.type = TYPES_PARTS_OF_LINE.function
    return dataToReturn
  }

  if (word === 'Routes') {
    part.type = TYPES_PARTS_OF_LINE.constant
    return dataToReturn
  }

  //
  //
  //
  //

  if (isImported && !OPERATORS.includes(word) && !KEYWORDS.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.variable
    namesArrays.variablesNamesArray.push(word)
    return dataToReturn
  }

  if (nextItemIs('(')) {
    if (!OPERATORS.includes(word) && !KEYWORDS.includes(word)) {
      part.type = TYPES_PARTS_OF_LINE.function
      return dataToReturn
    }
  }

  if (specialFunctionsNamesArray.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.specialFunctions

    return dataToReturn
  }

  if (isProperty) {
    if (!OPERATORS.includes(word) && !KEYWORDS.includes(word) &&
    isNaN(word)) {
      if (nextItemIs('(')) {
        part.type = TYPES_PARTS_OF_LINE.function
      } else {
        part.type = TYPES_PARTS_OF_LINE.objectProperty
      }
      BOOLEANS.isProperty = false
      return dataToReturn
    }
  }

  if (curlyBracket.open && curlyBracket.isProperty) {
    if (!OPERATORS.includes(word)) {
      part.type = TYPES_PARTS_OF_LINE.objectProperty
      return dataToReturn
    }
  }

  if (OPERATORS.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.operator
    if (word === '<') {
      BOOLEANS.isTag = true
    }
    if (word === '//') BOOLEANS.isComment = true
    if (word === '/*') globalBooleans.isCommentAll = true
    if (word === '=') {
      globalBooleans.equalsOpen = true
      BOOLEANS.isConstant = false
    }
    if (word === '(') {
      globalBooleans.parentheseOpen = true
      if (curlyBracket.open) {
        curlyBracket.isProperty = false
      }
      BOOLEANS.isProperty = false
    }
    if (word === ')') {
      BOOLEANS.isTag = false
      BOOLEANS.isTagProperty = false
      globalBooleans.parentheseOpen = false
      globalBooleans.equalsOpen = false
      globalBooleans.doubleDotOpen = false
    }
    if (word === '>') {
      BOOLEANS.isTag = false
      BOOLEANS.isTagProperty = false

      globalBooleans.equalsOpen = false
    }
    if (word === '.') {
      BOOLEANS.isProperty = true
    }
    if (word === '/') {
      if (isTag) {
        htmlTags.nextClosed = true
      }
      if (isTagProperty) {
        const lastIndex = htmlTags.tags.length - 1
        if (lastIndex >= 0) htmlTags.tags[lastIndex].closed = true
      }
    }

    return dataToReturn
  }

  if (variablesInScope.includes(word) && !isConstant) {
    part.type = TYPES_PARTS_OF_LINE.variable

    if (isTag && word.charAt(0) === word.charAt(0).toUpperCase()) {
      part.type = TYPES_PARTS_OF_LINE.component
    }

    return dataToReturn
  }

  if (parentheseOpen && !curlyBracket.isProperty && !OPERATORS.includes(word) && !isTag && !isTagProperty && !isConstant && word !== 'function' && (previousItemIs('(') || previousItemIs('{'))) {
    part.type = TYPES_PARTS_OF_LINE.variable

    namesArrays.variablesInScope.push(word)

    return dataToReturn
  }

  if (constantsNamesArray.includes(word)) {
    if (nextItemIs('=>')) {
      part.type = TYPES_PARTS_OF_LINE.variable

      namesArrays.variablesInScope.push(word)
    } else {
      part.type = TYPES_PARTS_OF_LINE.constant
    }

    return dataToReturn
  }

  if (variablesNamesArray.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.variable

    if (isTag && word.charAt(0) === word.charAt(0).toUpperCase()) {
      part.type = TYPES_PARTS_OF_LINE.component
    }

    return dataToReturn
  }

  if (functionsNamesArray.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.function

    return dataToReturn
  }

  if (componentNamesArray.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.component

    return dataToReturn
  }

  if (KEYWORDS.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.keyword
    if (word === 'const') BOOLEANS.isConstant = true
    if (word === 'function') BOOLEANS.isFunction = true
    if (word === 'let') BOOLEANS.isVariable = true
    if (word === 'var') BOOLEANS.isVariable = true
    if (word === 'import') globalBooleans.isImported = true
    if (word === 'from') globalBooleans.isImported = false
    if (word === 'class') BOOLEANS.isConstant = true
    if (word === 'public') BOOLEANS.isVariable = true

    BOOLEANS.isProperty = false

    return dataToReturn
  }

  if (RESERVED_VALUES.includes(word)) {
    part.type = TYPES_PARTS_OF_LINE.reservedValue

    return dataToReturn
  }

  if (isConstant) {
    const newArray = [...wordsArray].slice(positionArray)
    const isFunction = verificaEstructura(newArray)
    if (isFunction) {
      part.type = TYPES_PARTS_OF_LINE.function
      dataToReturn.newFunction = word
      return dataToReturn
    }
    part.type = TYPES_PARTS_OF_LINE.constant
    dataToReturn.newConstant = word

    return dataToReturn
  }

  if (isVariable) {
    const newArray = [...wordsArray].slice(positionArray)
    if (verificaEstructura(newArray)) {
      part.type = TYPES_PARTS_OF_LINE.function
      dataToReturn.newFunction = word
      BOOLEANS.isVariable = false
      return dataToReturn
    }
    part.type = TYPES_PARTS_OF_LINE.variable
    dataToReturn.newVariable = word
    BOOLEANS.isVariable = false

    return dataToReturn
  }

  if (isFunction) {
    part.type = TYPES_PARTS_OF_LINE.function
    dataToReturn.newFunction = word
    BOOLEANS.isFunction = false

    return dataToReturn
  }

  if (isTag) {
    if (word.charAt(0) === word.charAt(0).toUpperCase()) {
      part.type = TYPES_PARTS_OF_LINE.component
      dataToReturn.newComponent = word
    } else {
      part.type = TYPES_PARTS_OF_LINE.htmlTags

      const countOpenTags = (tag) => {
        return htmlTags.tags.filter(obj => obj.tag === tag).length
      }

      const number = countOpenTags(word) + 1

      htmlTags.tags.push({ tag: word, closed: htmlTags.nextClosed, number })
      htmlTags.nextClosed = false

      const closedTrueCount = htmlTags.tags.filter(item => item.closed === true).length
      const closedFalseCount = htmlTags.tags.filter(item => item.closed === false).length

      const hasEqualClosedCounts = closedTrueCount === closedFalseCount

      htmlTags.isText = !hasEqualClosedCounts
    }
    BOOLEANS.isTag = false
    BOOLEANS.isTagProperty = true

    return dataToReturn
  }

  if (isTagProperty) {
    part.type = TYPES_PARTS_OF_LINE.htmlProps

    return dataToReturn
  }

  if (parentheseOpen) {
    if (constantsNamesArray.includes(word)) {
      if (nextItemIs('=>')) {
        part.type = TYPES_PARTS_OF_LINE.variable
      } else {
        part.type = TYPES_PARTS_OF_LINE.constant
      }
    } else {
      part.type = TYPES_PARTS_OF_LINE.variable
    }
    return dataToReturn
  }

  if (curlyBracket.open) {
    curlyBracket.isProperty = true
  }

  if (part.type === '') {
    part.type = TYPES_PARTS_OF_LINE.error

    return dataToReturn
  }

  function nextItemIs (equalTo) {
    let number = 1
    const arrayLength = wordsArray.length

    while (positionArray + number < arrayLength && wordsArray[positionArray + number].trim() === '') {
      number++
    }

    return (
      positionArray + number < arrayLength &&
      wordsArray[positionArray + number].toLowerCase() === equalTo.toLowerCase()
    )
  }

  function previousItemIs (equalTo) {
    let number = 1

    while (positionArray - number >= 0 && wordsArray[positionArray - number].trim() === '') {
      number++
    }

    if (positionArray - number >= 0) {
      return wordsArray[positionArray - number].toLowerCase() === equalTo.toLowerCase()
    }

    return false
  }
}

function verificaEstructura (arr) {
  let estructuraCheckingPosition = 0
  const estructuraObjetivo = ['=', '(', ')', '=>']

  arr.forEach(word => {
    if (estructuraObjetivo.includes(word) && !estructuraObjetivo[estructuraCheckingPosition]) estructuraCheckingPosition = 0
    if (word === estructuraObjetivo[estructuraCheckingPosition]) {
      estructuraCheckingPosition++
    }
  })

  if (estructuraCheckingPosition === estructuraObjetivo.length) return true
  return false
}
