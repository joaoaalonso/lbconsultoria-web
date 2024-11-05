export const parseNumber = (number: string) => {
    return Math.floor(parseFloat(number.replace(',', '.')) * 100)
}