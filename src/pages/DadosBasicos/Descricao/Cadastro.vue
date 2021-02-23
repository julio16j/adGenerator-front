<template>
  <div class="flex flex-center">
    <CardForm titulo="Cadastro de Descrições" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton" />
  </div>
</template>
<script>
import CardForm from '@/components/CardForm'
import { CategoriaOptions } from '@/classes/enums/Categoria'
import { TamanhoOptions } from '@/classes/enums/Tamanho'
import Mensagems from '@/classes/enums/Mensagens'
import DescricaoService from '@/services/descricaoService'
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
      this.getDescricao(this.$route.params.descricaoId)
    }
  },
  data () {
    return {
      inputs: [
        { label: 'Descrição', value: null, nome: 'descricao', readonly: this.contexto === 'editar' },
        { label: 'Categoria', value: null, nome: 'categoria', options: CategoriaOptions, type: 'select' },
        { label: 'Tamanho', value: null, nome: 'tamanho', options: TamanhoOptions, type: 'select' }
      ],
      cancelButton: {
        click: () => this.voltar()
      },
      submitButton: {
        submit: this.salvarDescricao
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    getDescricao (descricaoValorId) {
      DescricaoService.getById(descricaoValorId)
        .then(response => {
          if (response.status === 200) {
            this.inputs[0].value = response.data.descricao
            this.inputs[1].value = response.data.categoria
            this.inputs[2].value = response.data.tamanho
          }
        })
    },
    salvarDescricao (descricao) {
      if (this.contexto === 'cadastro') {
        DescricaoService.cadastrar(descricao)
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagems.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.message)
          })
      } else {
        DescricaoService.editar(descricao)
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
