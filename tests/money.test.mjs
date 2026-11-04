import {test} from 'node:test'
import assert from 'node:assert/strict'
import {money} from '../src/money.ts'

test('formats rupees without unnecessary decimal zeroes and preserves paise', () => {
  assert.equal(money(13500), '₹13,500')
  assert.equal(money(0), '₹0')
  assert.equal(money(12.5), '₹12.5')
  assert.equal(money(12.25), '₹12.25')
})
