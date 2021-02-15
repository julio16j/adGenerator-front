import { converteEnumInOptions } from '@/utils'
const CategoriaEnum = {
  Geral: 'Geral',
  Tecnico: 'Tecnico',
  Persuasivo: 'Persuasivo',
  Financeiro: 'Financeiro'
}
export default CategoriaEnum
export const CategoriaOptions = converteEnumInOptions(CategoriaEnum)
