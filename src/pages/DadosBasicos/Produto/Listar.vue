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
import { CategoriaProdutoOptions } from '@/classes/enums/CategoriaProduto'
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
        { label: 'Nome', value: null, nome: 'nome', rules: '' },
        { label: 'Descrição', value: null, nome: 'descricao', rules: '' },
        { label: 'Categoria', value: null, nome: 'categoria', options: CategoriaProdutoOptions, type: 'select', rules: '' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
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
            params: { produtoId: linha.nome }
          })
        }
      },
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirProduto(linha.nome)
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
