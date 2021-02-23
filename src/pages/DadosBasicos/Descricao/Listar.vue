<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Movimentos" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <ListagemComFiltro titulo="Descrições" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaDescricao"
      :editarBtn="editarBtn" :excluirBtn="excluirBtn" :cadastrarBtn="cadastrarBtn"
    />
  </div>
</template>
<script>
import ListagemComFiltro from '@/components/ListagemComFiltro'
import { CategoriaOptions } from '@/classes/enums/Categoria'
import { TamanhoOptions } from '@/classes/enums/Tamanho'
import DescricaoService from '@/services/descricaoService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'
export default {
  components: {
    ListagemComFiltro
  },
  mixins: [NotificacaoMixin],
  data () {
    return {
      inputs: [
        { label: 'Descrição', value: null, nome: 'descricao', rules: '' },
        { label: 'Categoria', value: null, nome: 'categoria', options: CategoriaOptions, type: 'select', rules: '' },
        { label: 'Tamanho', value: null, nome: 'tamanho', options: TamanhoOptions, type: 'select', rules: '' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'center' },
        { name: 'categoria', label: 'Categoria', field: 'categoria', align: 'center' },
        { name: 'tamanho', label: 'Tamanho', field: 'tamanho', align: 'center' }
      ],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarDescricao
      },
      listaDescricao: [],
      editarBtn: {
        mostraBotao: true,
        editar: (linha) => {
          this.$router.push({
            name: 'descricaoEditar',
            params: { descricaoId: linha.descricao }
          })
        }
      },
      excluirBtn: { mostraBotao: true, excluir: () => {} },
      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'descricaoCadastro' }) }
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    listarDescricao (descricao) {
      DescricaoService.pesquisar(descricao)
        .then(response => {
          if (response.status === 200) {
            this.listaDescricao = response.data
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    }
  }
}
</script>
