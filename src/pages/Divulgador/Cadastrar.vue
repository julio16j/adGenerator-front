<template>
  <div class="flex flex-center">
    <CardForm :titulo="titulo" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import Mensagens from '@/classes/enums/Mensagens'
import DivulgadorService from '@/services/userService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'

export default {
  components: {
    CardForm
  },
  props: {
    contexto: { type: String, default: 'cadastro' },
    label: { type: String, default: 'Cadastro de Divulgadores' }
  },
  mixins: [NotificacaoMixin],
  created () {
    if (this.contexto === 'editar') {
      this.getDivulgador(this.$route.params.divulgadorId)
      this.titulo = this.label
    }
  },
  data () {
    return {
      titulo: 'Cadastro de Divulgadores',
      inputs: [
        { label: 'Nome', value: null, nome: 'nome' },
        { label: 'Email', value: null, nome: 'email', type: 'email' },
        { label: 'Senha', value: null, nome: 'senha', type: 'password', hide: this.contexto === 'editar' },
        { label: 'Confirme a Senha', value: null, nome: 'confirmaSenha', type: 'password', hide: this.contexto === 'editar' },
        { label: 'Telefone', value: null, nome: 'telefone', mask: '(##) #####-####' }
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
            this.inputs[4].value = response.data.telefone
            this.inputs[1].value = response.data.email
          }
        })
    },
    validaCadastro (divulgador) {
      if (divulgador.senha !== divulgador.confirmaSenha) {
        this.notificacaoErro('Senhas não coicidem')
        return false
      } return true
    },
    salvarDivulgador (divulgador) {
      if (this.contexto === 'cadastro') {
        if (!this.validaCadastro(divulgador)) return
        DivulgadorService.cadastrar(divulgador)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagens.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      } else {
        divulgador.id = this.$route.params.divulgadorId
        DivulgadorService.editar(divulgador)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagens.OperacaoExecutada)
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
