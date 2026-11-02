export function pdfAmount(value: number): {text: string; color: [number, number, number]} {
  const color: [number, number, number] = value > 0 ? [8, 119, 90] : value < 0 ? [185, 28, 28] : [70, 70, 70]
  const sign = value > 0 ? '+ ' : value < 0 ? '- ' : ''
  return {text: `${sign}Rs. ${Math.abs(value).toLocaleString('en-IN', {maximumFractionDigits: 2})}`, color}
}
