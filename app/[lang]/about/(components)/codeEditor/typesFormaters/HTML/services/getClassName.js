import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'
import styles from '../HTMLTextFormater.module.css'

export const getClassName = (type) => {
  if (type === TYPES_PARTS_OF_LINE.operator) return styles.operator
  if (type === TYPES_PARTS_OF_LINE.tag) return styles.tag
  if (type === TYPES_PARTS_OF_LINE.property) return styles.property
  if (type === TYPES_PARTS_OF_LINE.text) return styles.text
  if (type === TYPES_PARTS_OF_LINE.error) return styles.error
  return null
}
