export const getFontSize = () => {
  const fontSizeString = window.getComputedStyle(document.getElementById('q-app')).fontSize
  return Number(fontSizeString.substring(0, 2))
}
export function converteEnumInOptions (Enum) {
  return Object.keys(Enum).map(chave => {
    return { label: chave, value: Enum[chave] }
  })
}
export function capitalCase (palavra) {
  if (!palavra && palavra.length < 1) return ''
  return palavra[0].toLocaleUpperCase() + palavra.substring(1)
}

export function converterPxToEm (stringPx) {
  const fontSizeAtual = getFontSize()
  const intPx = Number(stringPx.replace('px', ''))
  return intPx / fontSizeAtual + 'em'
}

export function converterEmToPx (stringEm) {
  const fontSizeAtual = getFontSize()
  const intEm = Number(stringEm.replace('em', ''))
  return intEm * fontSizeAtual + 'px'
}
export function formatCurrencyBrl (value) {
  const val = (value / 1).toFixed(2).replace('.', ',')
  return 'R$ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
