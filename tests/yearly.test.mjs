import { test } from 'node:test'
import assert from 'node:assert/strict'
import { yearlyReport } from '../src/yearly.ts'
const tx=(id,date,type,amount)=>({id,date,type,amount,title:id,payment:'Cash'})
const data={shopName:'Test',openingBalance:1000,setupDate:'2024-01-01',transactions:[tx('old','2024-12-31','income',200),tx('jan','2025-01-01','income',300),tx('jan2','2025-01-31','expense',100),tx('march','2025-03-15','expense',50),tx('late','2025-12-31','income',100),tx('next','2026-01-01','income',900)]}
test('historical year includes prior balance, empty months and year-end totals',()=>{const r=yearlyReport(data,2025,'2026-04-01');assert.equal(r.months.length,12);assert.deepEqual(r.months.slice(0,3).map(m=>[m.income,m.expense,m.closing]),[[300,100,1400],[0,0,1400],[0,50,1350]]);assert.equal(r.income,400);assert.equal(r.expense,150);assert.equal(r.closing,1450)})
test('current year ends today and excludes later transactions and future months',()=>{const r=yearlyReport(data,2025,'2025-03-01');assert.equal(r.months.length,3);assert.equal(r.closing,1400);assert.equal(r.expense,100);assert.equal(r.end,'2025-03-01')})
test('decimal amounts produce exact currency totals',()=>{const d={shopName:'Test',openingBalance:0.1,setupDate:'2025-01-01',transactions:[tx('a','2025-01-01','income',0.1),tx('b','2025-01-02','income',0.2)]};const r=yearlyReport(d,2025,'2026-01-01');assert.equal(r.income,0.3);assert.equal(r.closing,0.4)})
