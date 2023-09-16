import { useState, useEffect } from 'react'

export const useEventsListeners = ({ setIsVisible, setMarkPostiion, textRef }) => {
  const [listenersAdded, setListenersAdded] = useState(false)

  const getTextData = (event) => {
    const elemento = event.target
    const texto = elemento.innerText
    const numCaracteres = texto.length
    const rect = elemento.getBoundingClientRect()
    const width = rect.width
    const caracterWidth = width / numCaracteres

    return { caracterWidth }
  }

  function handleMouseDown (event) {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    const { caracterWidth } = getTextData(event)

    const { clientX } = event
    const rect = event.target.getBoundingClientRect()
    const offsetX = clientX - rect.left
    const elementsInRage = Math.round(offsetX / caracterWidth)
    const position = caracterWidth * elementsInRage

    setMarkPostiion({ left: position, top: 0 })
    setIsVisible(true)
  }

  function handleClickOutside (event) {
    if (!event) return document.removeEventListener('click', handleClickOutside)

    if (textRef.current && !textRef.current.contains(event.target)) {
      setIsVisible(false)
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEditText)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      setListenersAdded(false)
    }
  }

  function handleMouseMove (event) {
    if (!event) return document.removeEventListener('mousemove', handleMouseMove)

    if (!listenersAdded) {
      setListenersAdded(true)
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEditText)
    }

    const selection = window.getSelection()
    console.log('selection', selection)

    const range = selection.getRangeAt(0)
    const textNode = textRef.current

    console.log('range', range)
    console.log('textNode', textNode)
    // Obtener el texto completo del elemento
    const textContent = textNode.textContent
    console.log('textContent', textContent)

    // Obtener la posición de inicio y final de la selección
    const startOffset = range.startOffset
    const endOffset = range.endOffset

    // Obtener el texto seleccionado
    const selectedText = textContent.slice(startOffset, endOffset)

    console.log('Texto seleccionado:', selectedText)
    console.log('Posición de inicio:', startOffset)

    // const { caracterWidth } = getTextData(event)

    // const leftMove = caracterWidth * endOffset
    // console.log('Posición de final:', endOffset)
    // console.log('caracterWidth', caracterWidth)
    // setMarkPostiion({ left: leftMove, top: 0 })
  }

  function handleMouseUp () {
    console.log('mouseup')

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  function handleEditText (event) {
    if (!event) return document.removeEventListener('keydown', handleEditText)

    // Tengo q pasar las teclas tal cual y editar el texto con eso creo

    console.log('event')
    const teclaPresionada = event.key
    const code = event.keyCode
    console.log('teclaPresionada', teclaPresionada)
    console.log('code', code)

    const ACTIONS = {
      Backspace: () => {
        console.log('Se presionó la tecla Retroceso')
      },
      Delete: () => {
        console.log('Se presionó la tecla Suprimir')
      },
      Enter: () => {
        console.log('Se presionó la tecla Enter')
      },
      Space: () => {
        console.log('Se presionó la tecla Space')
      }
    }

    if (Object.prototype.hasOwnProperty.call(ACTIONS, teclaPresionada)) {
      ACTIONS[teclaPresionada]()
    } else {
      if (event.keyCode === 32) {
        // Se presionó la tecla de espacio
        console.log('Se presionó la tecla de espacio')
      } else {
        // Manejar otras teclas
      }
    }
  }

  useEffect(() => {
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEditText)

      // document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return { handleMouseDown }
}
