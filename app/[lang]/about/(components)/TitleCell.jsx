'use client'

import { useState, useEffect } from 'react'
import { LettersAndSymbols } from './LettersAndSymbols'

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const symbols = ['{', '}', '(', ')', '<', '>', '!', '?', ':', '*', '+', '-', '/', ';', '%', '$', '@']

export const TitleCell = ({ cell, initialTime, defaultTime }) => {
  const [randomLetters, setRandomLetters] = useState([])
  const [randomSymbols, setRandomSymbols] = useState([])

  useEffect(() => {
    setRandomLetters(getRandomElementsFromArray(letters, 2))
    setRandomSymbols(getRandomElementsFromArray(symbols, 2))
  }, [])

  return (
    <LettersAndSymbols cell={cell} letters={randomLetters} symbols={randomSymbols} initialTime={initialTime} defaultTime={defaultTime} />
  )
}

function getRandomElementsFromArray (array, count) {
  const shuffledArray = array.sort(() => 0.5 - Math.random())
  return shuffledArray.slice(0, count)
}
