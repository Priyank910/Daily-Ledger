import type { LedgerData } from './types'

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)
const validDate = (v: unknown): boolean => {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false
  const date = new Date(`${v}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === v
}
export function createBackup(ledger: LedgerData): string {
  return JSON.stringify({ format: 'daily-ledger-backup', version: 1, ledger }, null, 2)
}
export function parseBackup(contents: string): LedgerData {
  try {
    const file: unknown = JSON.parse(contents)
    if (!isObject(file) || file.format !== 'daily-ledger-backup' || file.version !== 1 || !isObject(file.ledger)) throw Error()
    const data = file.ledger
    if (typeof data.shopName !== 'string' || !data.shopName.trim() || typeof data.openingBalance !== 'number' || !Number.isFinite(data.openingBalance) || !validDate(data.setupDate) || !Array.isArray(data.transactions)) throw Error()
    const ids = new Set<string>()
    for (const t of data.transactions) {
      if (!isObject(t) || typeof t.id !== 'string' || !t.id || ids.has(t.id) || (t.type !== 'income' && t.type !== 'expense') || typeof t.title !== 'string' || typeof t.amount !== 'number' || !Number.isFinite(t.amount) || t.amount <= 0 || !validDate(t.date) || typeof t.payment !== 'string' || (t.note !== undefined && typeof t.note !== 'string')) throw Error()
      ids.add(t.id)
    }
    return data as unknown as LedgerData
  } catch {
    throw new Error('This is not a valid Daily Ledger backup. Your ledger has not been changed.')
  }
}
