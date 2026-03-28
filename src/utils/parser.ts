export const parseNumber = (number: string, decimalPlaces = 100) => {
  return Math.floor(parseFloat(number.replace(',', '.')) * decimalPlaces)
}
