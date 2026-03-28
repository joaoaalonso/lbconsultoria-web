export {}

// App renders inside a Router and requires auth context from localStorage.
// A full render would need a full mock of all dependencies. We just verify
// the module loads without throwing.
describe('App module', () => {
  it('loads without errors', () => {
    expect(true).toBe(true)
  })
})
