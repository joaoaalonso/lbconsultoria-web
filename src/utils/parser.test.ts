import { parseNumber } from './parser'

describe('parseNumber', () => {
  it('converts Brazilian decimal format string to integer cents', () => {
    expect(parseNumber('1,50', 100)).toBe(150)
  })

  it('handles whole numbers', () => {
    expect(parseNumber('10', 100)).toBe(1000)
  })

  it('handles zero', () => {
    expect(parseNumber('0,00', 100)).toBe(0)
  })

  it('returns NaN for non-numeric input', () => {
    expect(parseNumber('abc', 100)).toBeNaN()
  })

  it('handles large numbers', () => {
    expect(parseNumber('1000,00', 100)).toBe(100000)
  })
})
