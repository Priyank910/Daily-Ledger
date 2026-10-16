export type TransactionType = 'income' | 'expense'
export interface Transaction { id:string; type:TransactionType; title:string; amount:number; date:string; payment:string; note?:string }
export interface LedgerData { shopName:string; openingBalance:number; setupDate:string; transactions:Transaction[] }
