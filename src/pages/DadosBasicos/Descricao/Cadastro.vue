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
  mixins: [NotificacaoMixin],
  data () {
    return {
      inputs: [
        { label: 'Descrição', value: null, nome: 'descricao' },
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
    salvarDescricao (descricao) {
      DescricaoService.cadastrar(descricao)
        .then(response => {
          if (response.status === 200) {
            this.notificacaoSucesso(Mensagems.OperacaoExecutada)
            this.$router.back()
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    imprimeXablau (xablau) {
      console.log(xablau)
    }
  }
}
</script>
