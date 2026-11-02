import type { LedgerData } from './types'

export const BACKUP_MARKER = 'DAILY_LEDGER_BACKUP_V1:'
export function encodeBackup(data: LedgerData): string {
  const bytes = new TextEncoder().encode(JSON.stringify({version: 1, data}))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}
export function decodeBackup(encoded: string): LedgerData {
  try {
    const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0))
    const payload = JSON.parse(new TextDecoder('utf-8', {fatal:true}).decode(bytes))
    const d = payload.data
    const date = (s: unknown) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s))
    if (payload.version !== 1 || !d || typeof d.shopName !== 'string' || !d.shopName.trim() || typeof d.openingBalance !== 'number' || !Number.isFinite(d.openingBalance) || !date(d.setupDate) || !Array.isArray(d.transactions) || !d.transactions.every((t: Record<string, unknown>) => t && typeof t.id === 'string' && (t.type === 'income' || t.type === 'expense') && typeof t.title === 'string' && typeof t.amount === 'number' && Number.isFinite(t.amount) && t.amount >= 0 && date(t.date) && typeof t.payment === 'string' && (t.note === undefined || typeof t.note === 'string'))) throw Error('invalid')
    if (new Set(d.transactions.map((t: {id:string}) => t.id)).size !== d.transactions.length) throw Error('duplicate')
    return d as LedgerData
  } catch { throw new Error('This file does not contain a valid Daily Ledger backup. Older exports cannot restore all data.') }
}
export function backupFromFile(contents: string): LedgerData {
  const match = contents.match(/DAILY_LEDGER_BACKUP_V1:([A-Za-z0-9+/=]+)/)
  if (!match) throw new Error('This file does not contain a Daily Ledger backup. Older exports cannot restore all data.')
  return decodeBackup(match[1])
}
