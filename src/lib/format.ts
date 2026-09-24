export function formatPrice(value: number, currency = '₦') {
  return `${currency}${new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(value)}`
}

export function formatArea(value: number, unit = 'sqm') {
  return `${new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(value)} ${unit}`
}
