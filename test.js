const thread = require('./index')

test('first', async () => {
  expect(
    await thread.first(
      10,
      x => x * 10,
      [(x, y) => x - y, 10],
    )
  ).toBe(90)
})

test('last', async () => {
  expect(
    await thread.last(
      10,
      x => x * 10,
      [(x, y) => x - y, 10],
    )
  ).toBe(-90)
})

test('as', async () => {
  expect(
    await thread.as(
      10,
      v => [
        x => x * 10,
        [(x, y) => x - y, v, 10],
        [(x, y) => x - y, 10, v],
      ]
    )
  ).toBe(-80)
})
