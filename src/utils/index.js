export function converteEnumInOptions (Enum) {
  return Object.keys(Enum).map(chave => {
    return { label: chave, value: Enum[chave] }
  })
}
