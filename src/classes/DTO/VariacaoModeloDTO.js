const VariacaoModeloDTO = class VariacaoModeloDTO {
  constructor (modelo, produto, titulo, descricoes, cartoes) {
    this.modelo = modelo
    this.produto = produto
    this.titulo = titulo
    this.descricoes = descricoes
    this.cartoes = cartoes
  }
}

const VariacaoModeloDTOFactory = function (item) {
  const { modelo, produto, titulo, descricoes, cartoes } = item
  return new VariacaoModeloDTO(modelo, produto, titulo, descricoes, cartoes)
}

export {
  VariacaoModeloDTO,
  VariacaoModeloDTOFactory
}
