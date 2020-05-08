import * as pxToRem from '../px-to-rem'

it('turns pixel arrays into rems', () => {
  const result = pxToRem.withArray([4, 16, 24])
  expect(result).toEqual(['0.25rem', '1rem', '1.5rem'])
})

it('turns pixel objects into rems', () => {
  const result = pxToRem.withObject({ a: 4, b: 24 })
  expect(result).toEqual({ a: '0.25rem', b: '1.5rem' })
})
