<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Divulgador" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <ListagemComFiltro titulo="Divulgadores" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaDivulgador"
      :editarBtn="editarBtn" :excluirBtn="excluirBtn" :cadastrarBtn="cadastrarBtn"
    />
  </div>
</template>

<script>
import ListagemComFiltro from '@/components/ListagemComFiltro'
import DivulgadorService from '@/services/userService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'
import Mensagens from '@/classes/enums/Mensagens'

export default {
  components: {
    ListagemComFiltro
  },
  props: {
    contexto: { type: String, default: 'listar' }
  },
  mixins: [NotificacaoMixin],
  data () {
    return {
      inputs: [
        { label: 'Nome', value: null, nome: 'nome', rules: '' },
        { label: 'Email', value: null, nome: 'email', rules: '' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
        { name: 'email', label: 'Email', field: 'email', align: 'center' },
        { name: 'telefone', label: 'Telefone', field: 'telefone', align: 'center' }
      ],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarDivulgador
      },
      listaDivulgador: [],
      editarBtn: {
        mostraBotao: true,
        editar: (linha) => {
          this.$router.push({
            name: 'divulgadorEditar',
            params: { divulgadorId: linha.id }
          })
        }
      },
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirDivulgador(linha.id)
        }
      },
      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'divulgadorCadastrar' }) }
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    listarDivulgador (filtro) {
      DivulgadorService.pesquisarDivulgador(filtro)
        .then(response => {
          if (response.status === 200) {
            this.listaDivulgador = response.data
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    excluirDivulgador (divulgadorId) {
      DivulgadorService.deleteById(divulgadorId)
        .then(() => {
          this.listarDivulgador()
          this.notificacaoSucesso(Mensagens.OperacaoExecutada)
        })
    }
  }
}
</script>
