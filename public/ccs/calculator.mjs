export function calculate(input) {
  const text = String(input).trim()
  const grouped = /^\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?$/.test(text)
  if (!grouped && !/^\d{1,9}(?:[.,]\d{1,2})?$/.test(text)) return null

  const realCents = Math.round(Number(grouped ? text.replace(/,/g, '') : text.replace(',', '.')) * 100)
  if (!Number.isSafeInteger(realCents)) return null

  const share = realCents / 500
  const hypothetical = realCents / 250

  return {
    real: realCents / 100,
    hypothetical,
    share,
    fractionalCent: realCents % 5 !== 0,
  }
}
