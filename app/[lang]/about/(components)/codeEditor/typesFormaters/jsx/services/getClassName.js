import { TYPES_PARTS_OF_LINE } from '../constants/TYPES_PARTS_OF_LINE'
import styles from '../JSXTextFormater.module.css'

// Otorgo clases segun el tipo que tiene la palabra
export const getClassName = (type) => {
  if (type === TYPES_PARTS_OF_LINE.keyword) return styles.keyword
  if (type === TYPES_PARTS_OF_LINE.function) return styles.function
  if (type === TYPES_PARTS_OF_LINE.constant) return styles.constant
  if (type === TYPES_PARTS_OF_LINE.number) return styles.number
  if (type === TYPES_PARTS_OF_LINE.string) return styles.string
  if (type === TYPES_PARTS_OF_LINE.reservedValue) return styles.reservedValue
  if (type === TYPES_PARTS_OF_LINE.variable) return styles.variable
  if (type === TYPES_PARTS_OF_LINE.operator) return styles.operator
  if (type === TYPES_PARTS_OF_LINE.htmlTags) return styles.htmlTags
  if (type === TYPES_PARTS_OF_LINE.htmlProps) return styles.htmlProps
  if (type === TYPES_PARTS_OF_LINE.htmlText) return styles.htmlText
  if (type === TYPES_PARTS_OF_LINE.component) return styles.component
  if (type === TYPES_PARTS_OF_LINE.comment) return styles.comment
  if (type === TYPES_PARTS_OF_LINE.objectProperty) return styles.objectProperty
  if (type === TYPES_PARTS_OF_LINE.specialFunctions) return styles.specialFunctions
  if (type === TYPES_PARTS_OF_LINE.error) return styles.error
  return null
}
