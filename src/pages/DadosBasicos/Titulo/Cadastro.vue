<template>
  <div class="flex flex-center">
    <CardForm titulo="Cadastro de Títulos" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>

<script>
import CardForm from '@/components/CardForm'
import { TamanhoOptions } from '@/classes/enums/Tamanho'
import Mensagems from '@/classes/enums/Mensagens'
import TituloService from '@/services/tituloService'
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
      this.getTitulo(this.$route.params.tituloId)
    }
  },
  data () {
    return {
      inputs: [
        { label: 'Descrição', value: null, nome: 'descricao', readonly: this.contexto === 'editar' },
        { label: 'Produto', value: null, nome: 'produtoId' },
        { label: 'Tamanho', value: null, nome: 'tamanho', options: TamanhoOptions, type: 'select' }
      ],
      cancelButton: {
        click: () => this.voltar()
      },
      submitButton: {
        submit: this.salvarTitulo
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    getTitulo (tituloValorId) {
      TituloService.getById(tituloValorId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.descricao
            this.inputs[2].value = response.data.tamanho
            this.inputs[1].value = response.data.produto.nome
          }
        })
    },
    salvarTitulo (titulo) {
      if (this.contexto === 'cadastro') {
        TituloService.cadastrar(titulo)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagems.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      } else {
        TituloService.editar(titulo)
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
    }
  }
}
</script>
