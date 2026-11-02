import type { LedgerData } from './types'

export function yearlyReport(data: LedgerData, year: number, today: string) {
  const start = `${year}-01-01`
  const end = year === Number(today.slice(0, 4)) ? today : `${year}-12-31`
  const cents = (amount: number) => Math.round(amount * 100)
  let closing = cents(data.openingBalance)
  for (const t of data.transactions) if (t.date < start) closing += t.type === 'income' ? cents(t.amount) : -cents(t.amount)
  const count = year === Number(today.slice(0, 4)) ? Number(today.slice(5, 7)) : 12
  let income = 0, expense = 0
  const months = Array.from({length: count}, (_, i) => {
    const prefix = `${year}-${String(i + 1).padStart(2, '0')}`
    const transactions = data.transactions.filter(t => t.date.startsWith(prefix) && t.date <= end)
    const monthIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + cents(t.amount), 0)
    const monthExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + cents(t.amount), 0)
    income += monthIncome; expense += monthExpense; closing += monthIncome - monthExpense
    return { month: i + 1, income: monthIncome / 100, expense: monthExpense / 100, cashflow: (monthIncome - monthExpense) / 100, closing: closing / 100, transactions }
  })
  return { start, end, months, income: income / 100, expense: expense / 100, cashflow: (income - expense) / 100, closing: closing / 100 }
}
