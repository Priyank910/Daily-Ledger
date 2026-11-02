import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encodeBackup, decodeBackup } from '../src/backup.ts';
const ledger={shopName:'दुकान',openingBalance:123.45,setupDate:'2026-01-01',transactions:[{id:'1',type:'income',title:'Sale, test',amount:2.5,date:'2026-01-05',payment:'Cash',note:'hello\nworld'}]};
test('round trips a complete ledger',()=>assert.deepEqual(decodeBackup(encodeBackup(ledger)),ledger));
test('rejects missing or invalid data',()=>{assert.throws(()=>decodeBackup('old report'));assert.throws(()=>decodeBackup(btoa(JSON.stringify({shopName:'x'}))))});
