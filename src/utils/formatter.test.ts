import {
  capitalize,
  formatCurrency,
  formatDate,
  formatDocument,
  formatNumber,
  formatPercentage,
  formatPhone,
} from './formatter'

describe('formatDate', () => {
  it('formats a date in pt-BR locale', () => {
    // Use a fixed UTC date to avoid timezone flakiness
    const date = new Date('2024-03-15T12:00:00Z')
    const result = formatDate(date)
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/)
  })
})

describe('formatCurrency', () => {
  it('formats value in BRL', () => {
    expect(formatCurrency(1500)).toContain('1.500')
    expect(formatCurrency(1500)).toContain(',00')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toContain('0,00')
  })
})

describe('formatNumber', () => {
  it('formats with pt-BR decimal separator', () => {
    const result = formatNumber(1234.5)
    expect(result).toContain('1.234')
    expect(result).toContain(',5')
  })
})

describe('formatPercentage', () => {
  it('formats with one decimal place and comma separator', () => {
    expect(formatPercentage(56.789)).toBe('56,8%')
  })

  it('formats whole numbers', () => {
    expect(formatPercentage(100)).toBe('100,0%')
  })
})

describe('formatDocument', () => {
  it('formats CPF (11 digits)', () => {
    expect(formatDocument('12345678901')).toBe('123.456.789-01')
  })

  it('formats CNPJ (14 digits)', () => {
    expect(formatDocument('12345678000195')).toBe('12.345.678/0001-95')
  })
})

describe('formatPhone', () => {
  it('formats 9-digit cellphone', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
  })

  it('formats 8-digit landline', () => {
    expect(formatPhone('1132109876')).toBe('(11) 3210-9876')
  })
})

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('hello world')).toBe('Hello world')
  })

  it('handles already capitalized string', () => {
    expect(capitalize('Already')).toBe('Already')
  })

  it('handles empty string', () => {
    expect(capitalize('')).toBe('')
  })
})
