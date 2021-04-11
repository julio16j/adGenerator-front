<template>
  <div class="flex flex-center">
    <CardForm
      titulo="Cadastro de Produtos"
      :inputs="inputs"
      :cancelButton="cancelButton"
      :submitButton="submitButton"
    />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import { CondicaoProdutoOptions } from '@/classes/enums/CondicaoProduto'
import Mensagems from '@/classes/enums/Mensagens'
import ProdutoService from '@/services/produtoService'
import StorageService from '@/services/storageService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'

export default {
  components: {
    CardForm
  },
  props: {
    contexto: { type: String, default: 'cadastro' }
  },
  mixins: [NotificacaoMixin],
  created () {
    if (this.contexto === 'editar') {
      this.getProduto(this.$route.params.produtoId)
    }
  },
  data () {
    return {
      inputs: [
        { label: 'Título', value: null, nome: 'titulo', readonly: this.contexto === 'editar', class: 'col-3' },
        { label: 'Categoria', value: null, nome: 'categoria', class: 'col-3' },
        { label: 'Sub-Categoria', value: null, nome: 'subCategoria', class: 'col-3' },
        { label: 'Tipo', value: null, nome: 'tipo', class: 'col-3' },
        { label: 'CEP', value: null, nome: 'cep', class: 'col-3', mask: '#####-###' },
        { label: 'Condição', value: null, nome: 'condicao', class: 'col-3', type: 'select', options: CondicaoProdutoOptions },
        { label: 'Descricao', value: null, nome: 'descricao', class: 'col-9', type: 'textarea' },
        { label: 'Imagem', value: null, nome: 'imagemProduto', type: 'file', class: 'col-6' },
        { label: 'Preço', value: null, nome: 'preco', class: 'col-3', type: 'price' }
      ],
      cancelButton: {
        click: () => this.voltar()
      },
      submitButton: {
        submit: this.salvarProduto
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    getImagem (fileName) {
      const url = this.urlImagem(fileName)

      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const [, name] = fileName.split('_')
          const file = new File([blob], name)

          this.inputs[8].value = file
          this.inputs[8].url = url
        })
    },
    getProduto (produtoValorId) {
      ProdutoService.getById(produtoValorId)
        .then(response => {
          if (response.status === 200) {
            this.inputs.unshift({
              label: 'Código',
              value: response.data.codigoProduto.codigo,
              nome: 'codigo',
              class: 'col-3',
              readonly: true
            })
            this.inputs[1].value = response.data.titulo
            this.inputs[2].value = response.data.categoria
            this.inputs[3].value = response.data.subCategoria
            this.inputs[4].value = response.data.tipo
            this.inputs[5].value = response.data.cep
            this.inputs[6].value = response.data.condicao
            this.inputs[7].value = response.data.descricao
            this.inputs[9].value = response.data.preco.toFixed(2)
            this.getImagem(response.data.caminhoImagem)
          }
        })
    },
    salvarProduto (produto) {
      const {
        titulo,
        descricao,
        categoria,
        subCategoria,
        tipo,
        cep,
        preco,
        condicao,
        imagemProduto
      } = produto

      const formData = new FormData()
      formData.append('imagemProduto', imagemProduto)

      if (this.contexto === 'cadastro') {
        formData.append('novoProduto', JSON.stringify({
          titulo,
          descricao,
          categoria,
          subCategoria,
          tipo,
          cep,
          preco,
          condicao
        }))
        ProdutoService.cadastrar(formData)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagems.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      } else {
        const id = this.$route.params.produtoId
        formData.append('produto', JSON.stringify({
          id,
          titulo,
          descricao,
          categoria,
          subCategoria,
          tipo,
          cep,
          preco: Number(preco),
          condicao
        }))
        ProdutoService.editar(formData)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagems.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      }
    },
    imprimeXablau (xablau) {
      console.log(xablau)
    },
    urlImagem (fileName) {
      return StorageService.downloadUrl(fileName)
    }
  }
}
</script>
