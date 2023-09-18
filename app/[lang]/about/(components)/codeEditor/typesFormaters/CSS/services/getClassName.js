import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'
import styles from '../CSSTextFormater.module.css'

// Otorgo clases segun el tipo que tiene la palabra
export const getClassName = (type) => {
  if (type === TYPES_PARTS_OF_LINE.keyword) return styles.keyword
  if (type === TYPES_PARTS_OF_LINE.class) return styles.class
  if (type === TYPES_PARTS_OF_LINE.property) return styles.property
  if (type === TYPES_PARTS_OF_LINE.value) return styles.value
  if (type === TYPES_PARTS_OF_LINE.operator) return styles.operator
  if (type === TYPES_PARTS_OF_LINE.tag) return styles.tag
  if (type === TYPES_PARTS_OF_LINE.error) return styles.error
  return null
}
