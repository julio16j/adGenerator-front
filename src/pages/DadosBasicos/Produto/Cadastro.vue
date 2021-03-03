<template>
  <div class="flex flex-center">
    <CardForm titulo="Cadastro de Produtos" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import { CategoriaProdutoOptions } from '@/classes/enums/CategoriaProduto'
import Mensagems from '@/classes/enums/Mensagens'
import ProdutoService from '@/services/produtoService'
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
        { label: 'Nome', value: null, nome: 'nome', readonly: this.contexto === 'editar' },
        { label: 'Descricao', value: null, nome: 'descricao' },
        { label: 'Categoria', value: null, nome: 'categoria', options: CategoriaProdutoOptions, type: 'select' },
        { label: 'Imagem', value: null, nome: 'imagemBase64', type: 'file' }
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
    getProduto (produtoValorId) {
      ProdutoService.getById(produtoValorId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.nome
            this.inputs[1].value = response.data.descricao
            this.inputs[2].value = response.data.categoria
            this.inputs[3].value = response.data.caminhoImagem
          }
        })
    },
    salvarProduto (produto) {
      var file = document.querySelector('input[type=file]').files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        produto.imagemBase64 = e.target.result
        produto.imagemBase64 = produto.imagemBase64.replace(/^data:image\/(png|jpg);base64,/, '')

        if (this.contexto === 'cadastro') {
          ProdutoService.cadastrar(produto)
            .then(response => {
              if (response.status === 200) {
                this.notificacaoSucesso(Mensagems.OperacaoExecutada)
                this.$router.back()
              }
            }).catch(error => {
              this.notificacaoErro(error.message)
            })
        } else {
          ProdutoService.editar(produto)
            .then(response => {
              if (response.status === 200) {
                this.notificacaoSucesso(Mensagems.OperacaoExecutada)
                this.$router.back()
              }
            }).catch(error => {
              this.notificacaoErro(error.message)
            })
        }
      }
      reader.readAsDataURL(file)
    },
    imprimeXablau (xablau) {
      console.log(xablau)
    }
  }
}
</script>
