
export function toCurrency(num) { return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }

export function toCrypto(num, digits) {
  return num.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '')
}

export function computeSymbols(records) {
    const symbols = new Set()
    records.forEach(r => r.coins.forEach(c => symbols.add(c.split(',')[0])))

    return [...symbols]
}
