import {test} from 'node:test'
import assert from 'node:assert/strict'
import {pdfAmount} from '../src/pdfAmounts.ts'
test('signs and colors positive, negative and zero amounts',()=>{assert.deepEqual(pdfAmount(1900),{text:'+ Rs. 1,900',color:[8,119,90]});assert.deepEqual(pdfAmount(-1900),{text:'- Rs. 1,900',color:[185,28,28]});assert.deepEqual(pdfAmount(0),{text:'Rs. 0',color:[70,70,70]})})
