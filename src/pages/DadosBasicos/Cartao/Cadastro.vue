<template>
  <div class="flex flex-column flex-center">
    <CardForm titulo="Cadastro de Cartão" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import Mensagems from '@/classes/enums/Mensagens'
import CartaoService from '@/services/cartaoService'
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
      this.getCartao(this.$route.params.cartaoId)
    }
  },
  data () {
    return {
      inputs: [
        { label: 'Nome', value: null, nome: 'nome', readonly: this.contexto === 'editar', class: 'col' },
        { label: 'Descrição', value: null, nome: 'descricao', class: 'col' },
        { label: 'Imagem', value: null, nome: 'imagemCartao', type: 'file', class: 'col-12' }
      ],
      cancelButton: {
        click: () => this.voltar()
      },
      submitButton: {
        submit: this.salvarCartao
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

          this.inputs[2].value = file
          this.inputs[2].url = url
        })
    },
    getCartao (cartaoId) {
      CartaoService.getById(cartaoId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.nome
            this.inputs[1].value = response.data.descricao
            this.getImagem(response.data.caminhoImagem)
          }
        })
    },
    salvarCartao (cartao) {
      const { nome, descricao, imagemCartao } = cartao

      const formData = new FormData()
      formData.append('imagemCartao', imagemCartao)

      if (this.contexto === 'cadastro') {
        formData.append('novoCartao', JSON.stringify({ nome, descricao }))

        CartaoService.cadastrar(formData)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagems.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      } else {
        formData.append('cartao', JSON.stringify({ nome, descricao }))

        CartaoService.editar(formData)
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
