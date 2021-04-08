<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Produtos" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <ListagemComFiltro titulo="Produtos" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaProduto"
      :editarBtn="editarBtn" :excluirBtn="excluirBtn" :cadastrarBtn="cadastrarBtn"
    />
  </div>
</template>

<script>
import ListagemComFiltro from '@/components/ListagemComFiltro'
import ProdutoService from '@/services/produtoService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'

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
        { label: 'Título', value: null, nome: 'titulo', rules: '' },
        { label: 'Descrição', value: null, nome: 'descricao', rules: '' },
        { label: 'Preço', value: null, nome: 'preco', rules: '', type: 'price' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'titulo', label: 'Título', field: 'titulo', align: 'center' },
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'center' },
        { name: 'categoria', label: 'Categoria', field: 'categoria', align: 'center' }
      ],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarProduto
      },
      listaProduto: [],
      editarBtn: {
        mostraBotao: true,
        editar: (linha) => {
          this.$router.push({
            name: 'produtoEditar',
            params: { produtoId: linha.id }
          })
        }
      },
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirProduto(linha.id)
        }
      },
      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'produtoCadastro' }) }
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    listarProduto (produto) {
      ProdutoService.pesquisar(produto)
        .then(response => {
          if (response.status === 200) {
            this.listaProduto = response.data
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    excluirProduto (produtoId) {
      ProdutoService.deleteById(produtoId)
        .then(this.listarProduto)
    }
  }
}
</script>
