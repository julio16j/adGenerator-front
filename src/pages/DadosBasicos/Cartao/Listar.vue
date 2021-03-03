<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Cartão" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>

    <ListagemComFiltro titulo="Cartões" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaCartao"
      :editarBtn="editarBtn" :excluirBtn="excluirBtn" :cadastrarBtn="cadastrarBtn"
    />
  </div>
</template>

<script>
import ListagemComFiltro from '@/components/ListagemComFiltro'
import CartaoService from '@/services/cartaoService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'

export default {
  components: {
    ListagemComFiltro
  },

  mixins: [NotificacaoMixin],

  data () {
    return {
      inputs: [{ label: 'Nome', value: null, nome: 'nome', rules: '' }],

      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'center' }
      ],

      listaCartao: [],

      cancelButton: {
        click: this.voltar
      },

      submitButton: {
        submit: this.listarCartao
      },

      editarBtn: {
        mostraBotao: true,
        editar: (linha) => {
          this.$router.push({
            name: 'cartaoEditar',
            params: { cartaoId: linha.nome }
          })
        }
      },

      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirCartao(linha.nome)
        }
      },

      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'cartaoCadastro' }) }
      }
    }
  },

  methods: {
    voltar () {
      this.$router.back()
    },
    listarCartao (cartao) {
      CartaoService.pesquisar(cartao)
        .then(response => {
          if (response.status === 200) {
            this.listaCartao = response.data
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },

    excluirCartao (cartaoId) {
      CartaoService.deleteById(cartaoId)
        .then(this.listarCartao)
    }
  }
}
</script>
