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
import { CategoriaProdutoOptions } from '@/classes/enums/CategoriaProduto'
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
        { label: 'Nome', value: null, nome: 'nome', readonly: this.contexto === 'editar', class: 'col' },
        { label: 'Descricao', value: null, nome: 'descricao', class: 'col' },
        { label: 'Categoria', value: null, nome: 'categoria', options: CategoriaProdutoOptions, type: 'select', class: 'col' },
        { label: 'Imagem', value: null, nome: 'imagemProduto', type: 'file', class: 'col-12' }
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

          this.inputs[3].value = file
          this.inputs[3].url = url
        })
    },
    getProduto (produtoValorId) {
      ProdutoService.getById(produtoValorId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.nome
            this.inputs[1].value = response.data.descricao
            this.inputs[2].value = response.data.categoria
            this.getImagem(response.data.caminhoImagem)
          }
        })
    },
    salvarProduto (produto) {
      const { nome, descricao, categoria, imagemProduto } = produto

      const formData = new FormData()
      formData.append('imagemProduto', imagemProduto)

      if (this.contexto === 'cadastro') {
        formData.append('novoProduto', JSON.stringify({ nome, descricao, categoria }))
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
        formData.append('produto', JSON.stringify({ nome, descricao, categoria }))
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
