import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createBackup, parseBackup } from '../src/backup.ts'
const ledger={shopName:'दुकान',openingBalance:123.45,setupDate:'2026-01-01',extra:'preserve',transactions:[{id:'1',type:'income',title:'Sale',amount:25,date:'2026-01-05',payment:'Cash',note:'hello\nworld'},{id:'2',type:'expense',title:'Stock',amount:3.5,date:'2026-01-06',payment:'UPI'}]}
test('backup preserves the entire ledger including notes and unknown fields',()=>assert.deepEqual(parseBackup(createBackup(ledger)),ledger))
test('invalid or incompatible backups are rejected',()=>{for(const value of ['{}','garbage',JSON.stringify({format:'daily-ledger-backup',version:2,ledger}),JSON.stringify({format:'daily-ledger-backup',version:1,ledger:{...ledger,transactions:[{...ledger.transactions[0],date:'2026-02-30'}]}})])assert.throws(()=>parseBackup(value))})
