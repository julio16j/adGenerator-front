import { converteEnumInOptions } from '@/utils'

const CategoriaProdutoEnum = {
  Eletronicos: 'Eletronicos',
  Mercado: 'Mercado',
  Utensilios: 'Utensilios',
  Tecidos: 'Tecidos'
}

export default CategoriaProdutoEnum
export const CategoriaProdutoOptions = converteEnumInOptions(CategoriaProdutoEnum)
