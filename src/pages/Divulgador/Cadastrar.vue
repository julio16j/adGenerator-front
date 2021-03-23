<template>
  <div class="flex flex-center">
    <CardForm titulo="Cadastro de Divulgadores" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import Mensagems from '@/classes/enums/Mensagens'
import DivulgadorService from '@/services/userService'
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
      this.getDivulgador(this.$route.params.divulgadorId)
    }
  },
  data () {
    return {
      inputs: [
        { label: 'Nome', value: null, nome: 'nome' },
        { label: 'Telefone', value: null, nome: 'telefone', mask: '(##) #####-####' },
        { label: 'Email', value: null, nome: 'email', type: 'email' },
        { label: 'Senha', value: null, nome: 'senha', type: 'password', readonly: this.contexto === 'editar' }
      ],
      cancelButton: {
        click: () => this.voltar()
      },
      submitButton: {
        submit: this.salvarDivulgador
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    getDivulgador (divulgadorValorId) {
      DivulgadorService.getById(divulgadorValorId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.nome
            this.inputs[1].value = response.data.telefone
            this.inputs[2].value = response.data.email
          }
        })
    },
    salvarDivulgador (divulgador) {
      if (this.contexto === 'cadastro') {
        console.log(divulgador)
        DivulgadorService.cadastrar(divulgador)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagems.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      } else {
        DivulgadorService.editar(divulgador)
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
  }
}
</script>
