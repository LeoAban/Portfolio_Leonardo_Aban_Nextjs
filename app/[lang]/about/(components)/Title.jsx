import styles from '../(styles)/Title.module.css'
import { TitleCell } from './TitleCell'
import dictionary from '@/content'

function dividirStringPorLaMitad (inputString) {
  // Divide el string en palabras
  const palabras = inputString.split(' ')

  // Encuentra la mitad del número de palabras
  const mitad = Math.ceil(palabras.length / 2)

  // Une las palabras en dos partes
  const primeraMitad = palabras.slice(0, mitad).join(' ')
  const segundaMitad = palabras.slice(mitad).join(' ')

  return [primeraMitad, segundaMitad]
}

function llenarHastaLongitud (array, longitudDeseada) {
  const resultado = []
  for (const cadena of array) {
    if (cadena.length < longitudDeseada) {
      const espaciosFaltantes = longitudDeseada - cadena.length
      const cadenaRellenada = cadena + ' '.repeat(espaciosFaltantes)
      resultado.push(cadenaRellenada)
    } else {
      resultado.push(cadena)
    }
  }
  return resultado
}

function centrarCadenasEnLongitud (array, longitudDeseada) {
  const resultado = []
  for (const cadena of array) {
    const espaciosFaltantes = longitudDeseada - cadena.length
    if (espaciosFaltantes > 0) {
      const espaciosIzquierda = Math.floor(espaciosFaltantes / 2)
      const espaciosDerecha = espaciosFaltantes - espaciosIzquierda
      const cadenaRellenada = ' '.repeat(espaciosIzquierda) + cadena + ' '.repeat(espaciosDerecha)
      resultado.push(cadenaRellenada)
    } else {
      resultado.push(cadena)
    }
  }
  return resultado
}

export const Title = ({ lang }) => {
  const rowsArray = dividirStringPorLaMitad(dictionary[lang]?.aboutTitle)
  const rows = centrarCadenasEnLongitud(rowsArray, 19)

  return (
    <div className={styles.container}>
      <div className={styles.slide}>
        {rows.map((row, rowIndex) => {
          const splitStringWithSpaces = (inputString) => {
            const resultArray = []

            for (let i = 0; i < inputString.length; i++) {
              resultArray.push(inputString[i])
            }

            return resultArray
          }
          const cells = splitStringWithSpaces(row)

          return (
            <div key={rowIndex} className={styles.row}>
              {cells.map((cell, cellIndex) => {
                const defaultTime = 100
                const initialTime = (defaultTime * ((cellIndex + 1) + (rowIndex * cells.length)))
                return (
                  <TitleCell key={cellIndex} cell={cell} initialTime={initialTime} defaultTime={defaultTime} />
                )
              })}

            </div>
          )
        })}

      </div>
    </div>
  )
}
