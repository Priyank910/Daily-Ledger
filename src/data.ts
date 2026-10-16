import type { LedgerData } from './types'
const KEY='daily-ledger-data-v1'
export const demoData:LedgerData={shopName:'Sharma General Store',openingBalance:34100,setupDate:new Date().toISOString().slice(0,10),transactions:[
  {id:'1',type:'income',title:'Daily sales',amount:12450,date:new Date().toISOString().slice(0,10),payment:'Cash'},
  {id:'2',type:'expense',title:'Supplies',amount:4800,date:new Date(Date.now()-86400000).toISOString().slice(0,10),payment:'UPI'},
  {id:'3',type:'expense',title:'Electricity',amount:2350,date:new Date(Date.now()-2*86400000).toISOString().slice(0,10),payment:'Bank transfer'},
  {id:'4',type:'income',title:'Counter sales',amount:5400,date:new Date(Date.now()-3*86400000).toISOString().slice(0,10),payment:'UPI'}]}
export function loadData():LedgerData|null{try{const v=localStorage.getItem(KEY);return v?JSON.parse(v):null}catch{return null}}
export function saveData(data:LedgerData){localStorage.setItem(KEY,JSON.stringify(data))}
