<template>
  <div class="flex flex-center">
    <CardForm titulo="Cadastro de Cartão" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import Mensagems from '@/classes/enums/Mensagens'
import CartaoService from '@/services/cartaoService'
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
      imageData: '',
      inputs: [
        { label: 'Nome', value: null, nome: 'nome', readonly: this.contexto === 'editar' },
        { label: 'Descrição', value: null, nome: 'descricao' },
        { label: 'Imagem', value: null, nome: 'imagemBase64', type: 'file' }
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
    getCartao (cartaoId) {
      CartaoService.getById(cartaoId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.nome
            this.inputs[1].value = response.data.descricao
            this.inputs[2].value = response.data.caminhoImagem
          }
        })
    },
    salvarCartao (cartao) {
      var file = document.querySelector('input[type=file]').files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        cartao.imagemBase64 = e.target.result
        cartao.imagemBase64 = cartao.imagemBase64.replace(/^data:image\/(png|jpg);base64,/, '')

        if (this.contexto === 'cadastro') {
          CartaoService.cadastrar(cartao)
            .then(response => {
              if (response.status === 200) {
                this.notificacaoSucesso(Mensagems.OperacaoExecutada)
                this.$router.back()
              }
            }).catch(error => {
              this.notificacaoErro(error.message)
            })
        } else {
          CartaoService.editar(cartao)
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
