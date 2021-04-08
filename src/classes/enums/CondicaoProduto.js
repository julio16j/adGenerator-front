import { converteEnumInOptions } from '@/utils'

const CondicaoProdutoEnum = {
  Novo: 'NOVO',
  Usado: 'USADO'
}

export default CondicaoProdutoEnum
export const CondicaoProdutoOptions = converteEnumInOptions(CondicaoProdutoEnum)
