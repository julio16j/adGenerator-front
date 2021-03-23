<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Modelos" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <listagem-com-filtro class="q-pa-md" titulo="Modelos" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaModelo"
      :excluirBtn="excluirBtn" :detalharBtn="detalharBtn" :cadastrarBtn="cadastrarBtn"
    />
  </div>
</template>

<script>
import ModeloService from '@/services/modeloService'
import notificacaoMixin from '@/mixins/notificacaoMixin'
import ListagemComFiltro from '@/components/ListagemComFiltro'
import Mensagens from '@/classes/enums/Mensagens'
export default {
  name: 'dashboard',
  mixins: [notificacaoMixin],
  components: { ListagemComFiltro },
  data () {
    return {
      inputs: [
        { label: 'Nome', value: null, nome: 'nome' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
        { name: 'descricoes', label: 'N° de Descrições', field: row => row.descricoes.length, align: 'center' },
        { name: 'cartoes', label: 'N° de Cartões', field: row => row.cartoes.length, align: 'center' }
      ],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarModelos
      },
      listaModelo: [],
      detalharBtn: {
        mostraBotao: true,
        detalhar: (linha) => {
          this.detalharModelo(linha.nome)
        }
      },
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirModelo(linha.nome)
        }
      },
      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'criarModelo' }) }
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    listarModelos (modelo) {
      ModeloService.pesquisar(modelo)
        .then(response => {
          if (response.status === 200) {
            this.listaModelo = response.data
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    excluirModelo (modeloId) {
      ModeloService.deleteById(modeloId)
        .then(response => {
          if (response.status === 204) {
            this.listarModelos()
            this.notificacaoSucesso(Mensagens.OperacaoExecutada)
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    detalharModelo (modeloId) {
      this.$router.push({ name: 'variacoesListar', params: { modeloId } })
    }
  }
}
</script>
