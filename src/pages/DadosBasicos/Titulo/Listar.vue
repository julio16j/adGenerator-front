<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Títulos" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <ListagemComFiltro titulo="Títulos" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaTitulo"
      :editarBtn="editarBtn" :excluirBtn="excluirBtn" :cadastrarBtn="cadastrarBtn"
    />
  </div>
</template>

<script>
import ListagemComFiltro from '@/components/ListagemComFiltro'
import { TamanhoOptions } from '@/classes/enums/Tamanho'
import TituloService from '@/services/tituloService'
import ProdutoService from '@/services/produtoService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'

const produtoOptions = []

export default {
  components: {
    ListagemComFiltro
  },
  props: {
    contexto: { type: String, default: 'listar' }
  },
  mixins: [NotificacaoMixin],
  created () {
    this.listarProduto()
  },
  data () {
    return {
      inputs: [
        { label: 'Descrição', value: null, nome: 'descricao', rules: '' },
        { label: 'Produto', value: null, nome: 'produto', rules: '', type: 'select', options: produtoOptions },
        { label: 'Tamanho', value: null, nome: 'tamanho', options: TamanhoOptions, type: 'select', rules: '' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'center' },
        { name: 'produto', label: 'Produto', field: (linha) => { return linha.produto.nome }, align: 'center' },
        { name: 'tamanho', label: 'Tamanho', field: 'tamanho', align: 'center' }
      ],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarTitulo
      },
      listaTitulo: [],
      editarBtn: {
        mostraBotao: true,
        editar: (linha) => {
          this.$router.push({
            name: 'tituloEditar',
            params: { tituloId: linha.descricao }
          })
        }
      },
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirTitulo(linha.descricao)
        }
      },
      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'tituloCadastro' }) }
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    listarTitulo (titulo) {
      TituloService.pesquisar(titulo)
        .then(response => {
          if (response.status === 200) {
            this.listaTitulo = response.data
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    listarProduto () {
      ProdutoService.listar()
        .then(response => {
          response.data.forEach(produto => {
            produtoOptions.push(produto.nome)
          })
        })
    },
    excluirTitulo (tituloId) {
      TituloService.deleteById(tituloId)
        .then(this.listarTitulo)
    }
  }
}
</script>
