import { converteEnumInOptions } from '@/utils'
const TamanhoEnum = {
  Grande: 'Grande',
  Medio: 'Medio',
  Pequeno: 'Pequeno'
}
export default TamanhoEnum
export const TamanhoOptions = converteEnumInOptions(TamanhoEnum)
