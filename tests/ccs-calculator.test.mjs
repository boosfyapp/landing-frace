import assert from 'node:assert/strict'
import test from 'node:test'
import { calculate } from '../public/ccs/calculator.mjs'

test('10,000 reales producen 4,000 hipotéticos y cinco partes de 2,000', () => {
  const result = calculate('10000')
  assert.equal(result.real, 10000)
  assert.equal(result.hypothetical, 4000)
  assert.equal(result.share, 2000)
  assert.equal(result.share * 5, result.real)
  assert.equal(result.share / result.hypothetical, 0.5)
})

test('conserva las cinco partes iguales incluso con fracciones de centavo', () => {
  assert.deepEqual(calculate('0.01'), { real: 0.01, hypothetical: 0.004, share: 0.002, fractionalCent: true })
  assert.deepEqual(calculate('1234.56'), { real: 1234.56, hypothetical: 493.824, share: 246.912, fractionalCent: true })
  assert.equal(calculate('0').share, 0)
})

test('no presenta resultados para montos vacíos, negativos o inválidos', () => {
  for (const value of ['', '-100', 'Infinity', 'NaN', '1e3', '1.234', 'abc', '1000000000']) {
    assert.equal(calculate(value), null, value)
  }
  assert.equal(calculate('100,50').real, 100.5)
  assert.equal(calculate('10,000').real, 10000)
  assert.equal(calculate('10,000.50').real, 10000.5)
})
