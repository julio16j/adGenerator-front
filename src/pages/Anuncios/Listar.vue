<template>
  <div class="q-gutter-md">
    <q-breadcrumbs class="q-pl-md">
      <q-breadcrumbs-el label="Anúncio" />
      <q-breadcrumbs-el label="Listar" />
    </q-breadcrumbs>

    <ListagemComFiltro titulo="Anúncios" :inputs="inputs"
      :cancelButton="cancelButton" :submitButton="submitButton"
      :tableColumns="tableColumns" :dataList="listaAnuncio"
      :detalharBtn="detalharBtn"
    />

    <q-dialog v-model="modal">
      <q-card style="width: 600px; max-width: 80vw;  padding: 0 2em;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h4">Anúncio</div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Variação</div>

          <q-card
            :style="'width: 25em; height: 25em; margin: 0 auto; background: ' + variacaoModelo.temaCor.corFundo"
            class="q-ma-md"
          >
            <span
              class="q-ma-md"
              :style="'color:' + variacaoModelo.temaCor.corFonte"
            >
              código: {{ variacaoModelo.produto.codigoProduto.codigo }}
            </span>
            <div
              class="flex flex-center"
              :style="getElementoStyle(variacaoModelo.modelo.imagem)"
            >
              <q-img
                spinner-color="white"
                :src="urlImagem(variacaoModelo.produto.caminhoImagem)"
                :style="'height: 100%;' + getInvertidaStyle(variacaoModelo.invertida)"
              />
            </div>

            <div
              class="flex flex-center"
              :style="getElementoStyle(variacaoModelo.modelo.titulo)"
            >
              <span :style="'color:' + variacaoModelo.temaCor.corFonte" >
                {{ variacaoModelo.titulo.descricao }}
              </span>
            </div>

            <div
              class="flex flex-center"
              v-for="(descricao, index) in variacaoModelo.modelo.descricoes"
              :key="descricao.transformacao"
              :style="getElementoStyle(descricao)"
            >
              <span :style="'color:' + variacaoModelo.temaCor.corFonte" >
                {{ variacaoModelo.descricoes[index].descricao }}
              </span>
            </div>

            <div
              class="flex flex-center"
              v-for="(cartao, index) in variacaoModelo.modelo.cartoes"
              :key="cartao.transformacao"
              :style="getElementoStyle(cartao)"
            >
              <q-img
                :src="urlImagem(variacaoModelo.cartoes[index].caminhoImagem)"
                spinner-color="white"
                style="height: 100%"
              />
            </div>
          </q-card>

          Publicado em {{ dataPostado }}
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Conta OLX</div>
          {{ contaOlx.email }}
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Status</div>
          {{ anuncioStatus }}
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Link</div>
          <q-input dense v-model="link" autofocus @keyup.enter="model = false" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Salvar" color="primary" v-close-popup @click="ativarAnuncio" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ListagemComFiltro from '@/components/ListagemComFiltro'
import AnuncioService from '@/services/anuncioService'
import StorageService from '@/services/storageService.js'
import NotificacaoMixin from '@/mixins/notificacaoMixin'
import Mensagems from '@/classes/enums/Mensagens'
import { getFontSize } from '@/utils'

export default {
  components: {
    ListagemComFiltro
  },
  mixins: [NotificacaoMixin],
  data () {
    return {
      modal: false,
      id: 0,
      variacaoModelo: {
        temaCor: {},
        modelo: {},
        produto: {
          codigoProduto: {}
        },
        titulo: {}
      },
      contaOlx: {},
      anuncioStatus: '',
      dataPostado: '',
      link: '',
      inputs: [
        { label: 'Variação', value: null, nome: 'variacaoModeloChave', rules: '' },
        { label: 'Conta olx', value: null, nome: 'contaOlxId', rules: '' },
        { label: 'De', value: null, nome: 'dataInicial', rules: '', type: 'date' },
        { label: 'Até', value: null, nome: 'dataFinal', rules: '', type: 'date' }
      ],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        {
          name: 'variacaoModeloChave',
          label: 'Chave',
          field: (linha) => {
            return linha.variacaoModelo.chave
          },
          align: 'center'
        },
        {
          name: 'contaOlxId',
          label: 'Conta Olx',
          field: (linha) => {
            return linha.contaOlx.email
          },
          align: 'center'
        },
        {
          name: 'dataPostado',
          label: 'Data',
          field: (linha) => {
            return this.tratarData(linha.dataPostado)
          },
          align: 'center'
        },
        { name: 'status', label: 'Status', field: 'status', align: 'center' }
      ],
      listaAnuncio: [],
      cancelButton: {
        click: this.voltar
      },
      submitButton: {
        submit: this.listarAnuncio
      },
      detalharBtn: {
        mostraBotao: true,
        detalhar: (linha) => {
          this.id = linha.id
          this.variacaoModelo = linha.variacaoModelo
          this.contaOlx = linha.contaOlx
          this.anuncioStatus = linha.status
          this.dataPostado = this.tratarData(linha.dataPostado)
          this.link = linha.link
          this.modal = true
        }
      }
    }
  },
  methods: {
    voltar () {
      this.$router.back()
    },
    listarAnuncio (anuncio) {
      anuncio.usuarioId = localStorage.getItem('usuarioId')
      AnuncioService.pesquisar(anuncio)
        .then(response => {
          if (response.status === 200) {
            this.listaAnuncio = response.data
            this.listaAnuncio.sort((a, b) => {
              return new Date(b.dataPostado) - new Date(a.dataPostado)
            })
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    excluirAnuncio (AnuncioId) {
      AnuncioService.deleteById(AnuncioId)
        .then(this.listarAnuncio)
    },
    getInvertidaStyle (booleano) {
      if (booleano) return 'transform: scaleX(-1);'
      return ''
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
    },
    urlImagem (fileName) {
      return StorageService.downloadUrl(fileName)
    },
    tratarData (data) {
      data = data.split('T')[0]
      data = data.split('-').reverse().join('/')
      return data
    },
    ativarAnuncio () {
      const anuncio = { id: this.id, link: this.link }
      AnuncioService.editar(anuncio)
        .then(response => {
          if (response.status === 200) {
            this.notificacaoSucesso(Mensagems.OperacaoExecutada)
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    }
  }
}
</script>
