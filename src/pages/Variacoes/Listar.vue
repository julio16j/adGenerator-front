<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Variações" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>
    <div class="q-mx-md q-gutter-md" >
      <q-card class="q-ml-md" >
        <q-card-section class="row justify-between">
          <div class="text-h6 colorPrimary">
            Variações
          </div>
          <div v-if="cadastrarBtn.mostraBotao" class="col-auto">
            <q-btn color="primary" no-caps @click="cadastrarBtn.cadastrar"
              :label=" cadastrarBtn.label || 'Cadastrar'" />
          </div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <simple-form @formMontado="form => filtroVariacao = form" :inputs="inputs" :submitButton="submitButton" />
        </q-card-section>
      </q-card>
      <q-card>
        <q-table v-if="listaVariacao.length > 0" :data="listaVariacao" :columns="tableColumns"
          class="no-shadow q-pa-none" row-key="chave"
          hide-pagination grid >
          <template v-slot:item="item">
            <q-card style="width: 400px; height: 400px" class="q-ma-md" >
              <div class="flex flex-center" :style="getProdutoStyle(item.row.modelo.imagem)" >
                <q-img
                  :src="urlImagem(item.row.produto.caminhoImagem)"
                  spinner-color="white"
                  style="height: 100%"
                />
              </div>
              <div class="flex flex-center" :style="getTituloDescricaoStyle(item.row.modelo.titulo, 'titulo')" >
                {{ item.row.titulo.descricao }}
              </div>
              <div class="flex flex-center" v-for="(descricao, index) in item.row.modelo.descricoes"
                :key="descricao.transformacao.translate" :style="getTituloDescricaoStyle(descricao, 'descricao')" >
                {{ item.row.descricoes[index].descricao }}
              </div>
              <div class="flex flex-center" v-for="(cartao, index) in item.row.modelo.cartoes"
                :key="cartao.transformacao.translate" :style="getCartaoStyle(cartao)" >
                <q-img
                  :src="urlImagem(item.row.cartoes[index].caminhoImagem)"
                  spinner-color="white"
                  style="height: 100%"
                />
              </div>
            </q-card>
          </template>
        </q-table>
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagination.pagesNumber"
            size="sm"
            @input="atualizarPaginacao"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import SimpleForm from '@/components/SimpleForm'
import VariacaoService from '@/services/variacaoService'
import NotificacaoMixin from '@/mixins/notificacaoMixin'
import StorageService from '@/services/storageService.js'
import { capitalCase } from '@/utils'

export default {
  components: {
    SimpleForm
  },
  props: {
    contexto: { type: String, default: 'listar' }
  },
  mixins: [NotificacaoMixin],
  data () {
    return {
      inputs: [
        { label: 'Modelo', value: null, nome: 'modeloId' },
        { label: 'Produto', value: null, nome: 'produtoId' },
        { label: 'Título', value: null, nome: 'tituloId' }
      ],
      filtroVariacao: {
        modeloId: null,
        produtoId: null,
        tituloId: null
      },
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'modelo', label: 'Modelo', field: row => row.modelo.nome, align: 'center' },
        { name: 'produto', label: 'Produto', field: row => row.produto.nome, align: 'center' },
        { name: 'titulo', label: 'Titulo', field: row => row.titulo.descricao, align: 'center' }
      ],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarVariacao
      },
      listaVariacao: [],
      excluirBtn: {
        mostraBotao: true,
        excluir: (linha) => {
          this.excluirVariacao(linha.nome)
        }
      },
      cadastrarBtn: {
        mostraBotao: true,
        cadastrar: () => { this.$router.push({ name: 'variacoesGerar' }) },
        label: 'Gerar Variações'
      },
      pagination: {
        page: 1,
        rowsPerPage: 5,
        pagesNumber: 0
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    onRequest (props) {
      this.pagination = props.pagination
      this.listarVariacao(this.filtroVariacao)
    },
    listarVariacao (variacaoFiltro) {
      VariacaoService.pesquisar({ ...variacaoFiltro, page: this.pagination.page - 1, size: this.pagination.rowsPerPage })
        .then(response => {
          if (response.status === 200) {
            this.listaVariacao = response.data.content
            this.pagination.page = response.data.number + 1
            this.pagination.pagesNumber = response.data.totalPages
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    excluirVariacao (produtoId) {
      VariacaoService.deleteById(produtoId)
        .then(this.listarVariacao)
    },
    atualizarPaginacao (novoValor) {
      this.pagination.page = novoValor
      this.listarVariacao(this.filtroVariacao)
    },
    getProdutoStyle (produtoSetup) {
      const transformacao = produtoSetup.transformacao
      let produtoStyle = 'color: white; width: 200px; height: 200px; background-color: #333333;'
      produtoStyle += this.transformarElemento(produtoSetup, transformacao, 'elementoImagem')
      return produtoStyle
    },
    getTituloDescricaoStyle (setup, tituloOuDescricao) {
      const transformacao = setup.transformacao
      let descricaoStyle = 'min-width: 60px; font-size: 12px; color: ;'
      const elementoTituloDescricao = 'elemento' + capitalCase(tituloOuDescricao)
      descricaoStyle += this.transformarElemento(setup, transformacao, elementoTituloDescricao)
      return descricaoStyle
    },
    getCartaoStyle (cartaoSetup) {
      const transformacao = cartaoSetup.transformacao
      let cartaoStyle = 'width: 60px; height: 40px; font-size: 12px; color: white;background-color: #333333;'
      cartaoStyle += this.transformarElemento(cartaoSetup, transformacao, 'elementoCartao')
      return cartaoStyle
    },
    transformarElemento (setup, transformacao, elemento) {
      let style = setup[elemento].estiloInicial + ' ;transform: '
      style += transformacao.translate == null ? '' : transformacao.translate + ' '
      style += transformacao.rotate == null ? '' : transformacao.rotate + ' '
      style += transformacao.scale == null ? '' : transformacao.scale
      return style
    },
    urlImagem (fileName) {
      return StorageService.downloadUrl(fileName)
    }
  }
}
</script>
