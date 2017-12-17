const thread = require('./index')

test('first', () => {
  expect(
    thread.first(
      10,
      x => x * 10,
      [(x, y) => x - y, 10],
    )
  ).toBe(90)
})

test('last', () => {
  expect(
    thread.last(
      10,
      x => x * 10,
      [(x, y) => x - y, 10],
    )
  ).toBe(-90)
})

test('as', () => {
  expect(
    thread.as(
      10,
      v => [
        x => x * 10,
        [(x, y) => x - y, v, 10],
        [(x, y) => x - y, 10, v],
      ]
    )
  ).toBe(-80)
})
