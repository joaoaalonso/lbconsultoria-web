import { sortByType } from './sort'

describe('sortByType', () => {
  it('sorts items by numeric type ascending', () => {
    const input = [
      { type: '3', name: 'three' },
      { type: '1', name: 'one' },
      { type: '2', name: 'two' },
    ]
    const result = sortByType(input)
    expect(result.map((i) => i.type)).toEqual(['1', '2', '3'])
  })

  it('does not mutate the original array', () => {
    const input = [{ type: '2' }, { type: '1' }]
    const original = [...input]
    sortByType(input)
    expect(input).toEqual(original)
  })

  it('handles single-element array', () => {
    const input = [{ type: '5', value: 'x' }]
    expect(sortByType(input)).toEqual([{ type: '5', value: 'x' }])
  })

  it('handles empty array', () => {
    expect(sortByType([])).toEqual([])
  })

  it('preserves all original properties', () => {
    const input = [
      { type: '2', value: 'b', extra: true },
      { type: '1', value: 'a', extra: false },
    ]
    const result = sortByType(input)
    expect(result[0]).toEqual({ type: '1', value: 'a', extra: false })
    expect(result[1]).toEqual({ type: '2', value: 'b', extra: true })
  })
})
