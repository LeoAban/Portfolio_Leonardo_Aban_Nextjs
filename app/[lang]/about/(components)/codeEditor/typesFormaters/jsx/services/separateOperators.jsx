export const separateOperators = (words, OPERATORS) => {
  return words.reduce((acc, word) => {
    // Segun el array de operadores designado arriba reviso si la palabra tiene algun operador
    const hasOperator = OPERATORS.some(operator => word.includes(operator))

    // Si tenia un operador la palabra la separo en partes, las palabras y los operadores separados en orden para q cada uno pueda tener su propio tipo designado mas tarde
    if (hasOperator) {
      const parts = []
      let part = ''

      // Reviso letra a letra si es un operador
      for (let i = 0; i < word.length; i++) {
        const char = word[i]

        const isOperator = OPERATORS.includes(char)

        if (OPERATORS.includes(char + word[i + 1])) {
          parts.push(part)
          parts.push(char + word[i + 1])
          part = ''
          i++
        } else {
          // Si esa letra es un operador entonces guardo las letras q tenia hasta ahora como una palabra y el operador tambien lo guardo como palabra aparte
          if (isOperator) {
            parts.push(part)
            parts.push(char)
            part = ''
          } else {
            part = part + char
          }
        }
      }

      parts.push(part)

      const separatedParts = parts.filter(part => part !== '')
      acc.push(...separatedParts)
    } else {
      acc.push(word)
    }

    return acc
  }, [])
}
