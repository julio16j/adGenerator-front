const getFontSizeAtual = fontSizeAtual
export function converteEnumInOptions (Enum) {
  return Object.keys(Enum).map(chave => {
    return { label: chave, value: Enum[chave] }
  })
}
export function capitalCase (palavra) {
  if (!palavra && palavra.length < 1) return ''
  return palavra[0].toLocaleUpperCase() + palavra.substring(1)
}

export function fontSizeAtual () {
  const fontSizeString = window.getComputedStyle(document.getElementById('q-app')).fontSize
  return Number(fontSizeString.substring(0, 2))
}
export function converterPxToEm (stringPx) {
  const fontSizeAtual = getFontSizeAtual()
  const intPx = Number(stringPx.substring(0, 2))
  return intPx / fontSizeAtual + 'em'
}
