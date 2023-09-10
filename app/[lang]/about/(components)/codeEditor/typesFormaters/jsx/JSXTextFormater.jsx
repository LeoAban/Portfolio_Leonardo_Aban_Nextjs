import { separateParts } from './services/separateParts'
import { getClassName } from './services/getClassName'

export const JSXTextFormater = ({
  line,
  globalStates
}) => {
  // Separo las palabras de cada linea de codigo
  const newLine = separateParts(
    line,
    globalStates
  )

  return (
    <>

      {newLine.map(({ type, content }, index) => (
        <span key={index} className={getClassName(type)}>{content}</span>
      ))}

    </>
  )
}

/*

// Anotacion utilizada para tener en cuenta las posibilidades para separar las palabras segun tipo. No cumple funcion en el programa.

const TYPES_EXPLANATION = {
  keyword: ['const', 'let', 'var', 'return', 'if', 'switch', 'function'],
  function: 'Has const, let or var and next has a name and next has = () => or everything next to function and in beteween spaces. Or is a jsx reserved word: useState, useEffect, useRef, etc. Or was declared as function before. next to . example math.random random is property ',
  constant: 'Follow after const',
  number: 'is a number and not next to text',
  string: 'Is in between comillas ',
  reservedValue: [null, undefined, true, false],
  variable: 'next to let or var, or enters as props in functions, or is a prop of an object or was recognized before as variable and is not close to others that bring error or change something',
  operator: ['(', ')', '{', '}', '[', ']', '<', '>', '=', '?', ':', '/', '+', '*', '-'],
  htmlTags: 'is inside <>',
  htmlProps: 'is inside <> and is not the first word and not in the close part of the tag',
  component: 'starts with mayus inside <>',
  comment: 'next to // or inside /*',
  objectProperty: 'inside bracket and bedore operator :',
  error: 'not in any other category'

}

// Checkear si es string
const stringExample = 'Esto es un \'string\' con comillas dobles.'

/**/
