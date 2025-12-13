export const parseNumber = (number: string, decimalPlaces: number = 100) => {
    return Math.floor(parseFloat(number.replace(',', '.')) * decimalPlaces)
}