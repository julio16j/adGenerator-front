<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Modelos" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <listagem-com-filtro
      class="q-pa-md"
      titulo="Modelos"
      :inputs="inputs"
      :cancelButton="cancelButton"
      :submitButton="submitButton"
      :tableColumns="tableColumns"
      :dataList="listaModelo"
      :excluirBtn="excluirBtn"
      :editarBtn="editarBtn"
      :detalharBtn="detalharBtn"
      :cadastrarBtn="cadastrarBtn"
    />
    <q-dialog v-model="modal">
      <q-card
        :style="'width: 25em; height: 25em; margin: 0 auto; background: white;'"
        class="q-ma-md"
      >
        <div
          class="flex flex-center"
          :style="'background-color: #666; ' + getElementoStyle(modelo.imagem)"
        >
          <span>Imagem do produto</span>
        </div>
        <div
          class="flex flex-center"
          :style="'background-color: #666; ' + getElementoStyle(modelo.titulo)"
        >
          <span>Título</span>
        </div>
        <div
          class="flex flex-center"
          v-for="(descricao) in modelo.descricoes"
          :key="descricao.transformacao"
          :style="'background-color: #666; ' + getElementoStyle(descricao)"
        >
          <span>descrição</span>
        </div>
        <div
          class="flex flex-center"
          v-for="(cartao) in modelo.cartoes"
          :key="cartao.transformacao"
          :style="'background-color: #666; ' + getElementoStyle(cartao)"
        >
          <span>Cartão</span>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ModeloService from '@/services/modeloService'
import notificacaoMixin from '@/mixins/notificacaoMixin'
import ListagemComFiltro from '@/components/ListagemComFiltro'
import Mensagens from '@/classes/enums/Mensagens'
import { getFontSize } from '@/utils'

export default {
  name: 'dashboard',
  mixins: [notificacaoMixin],
  components: { ListagemComFiltro },
  data () {
    return {
      modal: false,
      modelo: {},
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
          this.modelo = linha
          this.modal = true
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
    },
    getElementoStyle (elemento) {
      if (!elemento) {
        elemento = {
          transformacao: '',
          estiloInicial: ''
        }
      }
      const transformacao = elemento.transformacao
      let elementoStyle = elemento.estiloInicial
      elementoStyle += 'transform:' + this.tratarTransform(transformacao)
      return elementoStyle
    },
    tratarTransform (transformacao) {
      if (!transformacao) return
      const fontSize = getFontSize()
      const [matrix, direita] = transformacao.split(') ')
      const matrixSplit = matrix.split(',')
      matrixSplit[4] = matrixSplit[4] * fontSize
      matrixSplit[5] = matrixSplit[5] * fontSize
      return matrixSplit.join(',') + ') ' + direita
    }
  }
}
</script>
