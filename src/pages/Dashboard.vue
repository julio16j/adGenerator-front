<template>
  <div class="q-gutter-y-md">
    <q-card class="q-mx-md" >
      <q-section class="row justify-between q-pa-md">
        <div class="text-h5 colorPrimary" >
          Olá {{usuario.nome}}
        </div>
        <div>
          <q-btn icon="fa fa-plus" label="Adicionar Modelo" color="primary" :to="{ name: 'criarModelo' }" />
        </div>
      </q-section>
    </q-card>
    <listagem-com-filtro titulo="Modelos" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaModelo"
      :excluirBtn="excluirBtn" :detalharBtn="detalharBtn"
      :editarBtn="editarBtn"
    />
  </div>
</template>
<script>
import UserService from '@/services/userService'
import ModeloService from '@/services/modeloService'
import notificacaoMixin from '@/mixins/notificacaoMixin'
import ListagemComFiltro from '@/components/ListagemComFiltro'
import Mensagens from '@/classes/enums/Mensagens'
export default {
  name: 'dashboard',
  mixins: [notificacaoMixin],
  components: { ListagemComFiltro },
  mounted () {
    this.getUsuario()
  },
  data () {
    return {
      usuario: {},
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
      editarBtn: {
        mostraBotao: true,
        editar: (linha) => {
          this.$router.push({
            name: 'editarModelo',
            params: { modeloId: linha.nome }
          })
        }
      },
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirModelo(linha.nome)
        }
      }
    }
  },
  methods: {
    async getUsuario () {
      try {
        const id = localStorage.getItem('usuarioId')
        const response = await UserService.getById(id)
        if (response.data) this.usuario = response.data
      } catch (error) {
        localStorage.setItem('logado', 'nao')
        this.$router.push({ name: 'home' })
        this.notificacaoErro(error.message || 'Erro ao logar')
      }
    },
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
