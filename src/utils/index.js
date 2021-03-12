export function converteEnumInOptions (Enum) {
  return Object.keys(Enum).map(chave => {
    return { label: chave, value: Enum[chave] }
  })
}
export function capitalCase (palavra) {
  if (!palavra && palavra.length < 1) return ''
  return palavra[0].toLocaleUpperCase() + palavra.substring(1)
}
