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
            <q-card style="width: 25em; height: 25em" class="q-ma-md" >
              <div style="position: absolute; right: 0">
                <q-btn flat>
                  <q-icon name="fas fa-ellipsis-v" style="font-size: 1em;" color="grey" />
                  <q-menu cover anchor="bottom right" auto-close
                    transition-show="scale" transition-hide="scale">
                    <q-list>
                      <q-item clickable @click="excluirVariacao(item.row.chave)">
                        <q-item-section avatar>
                          <q-icon size="sm" color="red" name="far fa-trash-alt" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Excluir</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div class="flex flex-center" :style="getElementoStyle(item.row.modelo.imagem)" >
                <q-img
                  :src="urlImagem(item.row.produto.caminhoImagem)"
                  spinner-color="white"
                  style="height: 100%"
                />
              </div>
              <div class="flex flex-center" :style="getElementoStyle(item.row.modelo.titulo)" >
                {{ item.row.titulo.descricao }}
              </div>
              <div class="flex flex-center" v-for="(descricao, index) in item.row.modelo.descricoes"
                :key="descricao.transformacao" :style="getElementoStyle(descricao)" >
                {{ item.row.descricoes[index].descricao }}
              </div>
              <div class="flex flex-center" v-for="(cartao, index) in item.row.modelo.cartoes"
                :key="cartao.transformacao" :style="getElementoStyle(cartao)" >
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
import Mensagens from '@/classes/enums/Mensagens'
import { getFontSize } from '@/utils'

export default {
  components: {
    SimpleForm
  },
  props: {
    contexto: { type: String, default: 'listar' }
  },
  created () {
    if (this.$route.params.modeloId) {
      this.filtroVariacao.modeloId = this.$route.params.modeloId
      this.inputs[0].value = this.filtroVariacao.modeloId
      this.listarVariacao(this.filtroVariacao)
    }
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
      transformacao: {
        rotate: null,
        scale: null,
        translate: null
      },
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
    excluirVariacao (chave) {
      VariacaoService.deleteById(chave)
        .then(() => {
          this.listarVariacao(this.filtroVariacao)
          this.notificacaoSucesso(Mensagens.OperacaoExecutada)
        })
    },
    atualizarPaginacao (novoValor) {
      this.pagination.page = novoValor
      this.listarVariacao(this.filtroVariacao)
    },
    getElementoStyle (elemento) {
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
    },
    urlImagem (fileName) {
      return StorageService.downloadUrl(fileName)
    }
  }
}
</script>
