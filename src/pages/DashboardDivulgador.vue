<template>
  <div class="q-gutter-y-md">
    <q-card class="q-mx-md" >
      <q-card-section class="row justify-between items-center q-pa-md q-gutter-x-md">
        <div class="text-h6 colorPrimary" >
          Divulgador: {{ usuario.nome }}
        </div>
        <div class="col row q-gutter-x-md">
          <div class="col ">
            <div class="row text-center colorPrimary">
              Total de Anúncios no dia
            </div>
            <div class="row justify-center">
              <div class="caixaValor" >
                {{ totalAnuncioDia }}
              </div>
            </div>
          </div>
          <div class="col ">
            <div class="row text-center colorPrimary">
              Total de Anúncios no mês
            </div>
            <div class="row justify-center">
              <div class="caixaValor" >
                {{ totalAnuncioMes }}
              </div>
            </div>
          </div>
          <div class="col ">
            <div class="row text-center colorPrimary">
              Valor acumulado no mês
            </div>
            <div class="row justify-center">
              <div class="caixaValor" >
                {{ totalReais }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-mx-md flex itens-center">
      <q-card-section class="row q-gutter-x-md items-center">
        <div>
          <input-check v-model="contaOlx.email" label="Usuário Olx" />
        </div>
        <div>
          <input-check v-model="contaOlx.senha" label="Senha Olx" />
        </div>
        <div class="col ">
          <div class="row text-center colorPrimary">
            Total de Anúncios nesta conta
          </div>
          <div class="row justify-center">
            <div class="caixaValor" >
              {{ totalAnuncioMes }}
            </div>
          </div>
        </div>
        <div class="col ">
          <div class="row text-center colorPrimary">
            Status Conta
          </div>
          <div class="row q-mt-md">
            <div class="caixaValor" >
              {{ contaOlx.status }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card>
      <q-table v-if="listaVariacao.length > 0" :data="listaVariacao" :columns="tableColumns"
        class="no-shadow q-pa-none" row-key="chave"
        hide-pagination grid >
        <template v-slot:item="item">
          <div class="row justify-center q-gutter-md">
            <div class="col-12 flex justify-center">
              <q-card ref="variacao" :style="'width: 25em; height: 25em;background-color:' + item.row.temaCor.corFundo "
                class="q-ma-md" >
                <div ref="downloadButton" class="absolute-right">
                  <q-btn color="primary" flat icon="fas fa-download" @click="() =>baixarVariacao(item.row)" />
                </div>
                <div class="flex flex-center" :style="getElementoStyle(item.row.modelo.imagem)" >
                  <q-img
                    :src="urlImagem(item.row.produto.caminhoImagem)"
                    spinner-color="white"
                    :style="'height: 100%;' + getInvertidaStyle(item.row.invertida)"
                  />
                </div>
                <div class="flex flex-center" :style="getElementoStyle(item.row.modelo.titulo)" >
                  <span :style="'color:' + item.row.temaCor.corFonte" >
                    {{ item.row.titulo.descricao }}
                  </span>
                </div>
                <div class="flex flex-center" v-for="(descricao, index) in item.row.modelo.descricoes"
                  :key="descricao.transformacao" :style="getElementoStyle(descricao)" >
                  <span :style="'color:' + item.row.temaCor.corFonte" >
                    {{ item.row.descricoes[index].descricao }}
                  </span>
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
            </div>
            <div class="col-12 q-gutter-xl">
              <div class="row q-gutter-x-md justify-center">
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.titulo"
                    name="titulo"
                    label="Título"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.titulo ? 'bg-green-6' : ''"
                  />
                </div>
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.descricao"
                    name="descricao"
                    label="Descrição"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.descricao ? 'bg-green-6' : ''"
                  />
                </div>
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.preco"
                    name="preco"
                    label="Preço"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.preco ? 'bg-green-6' : ''"
                  />
                </div>
              </div>
              <div class="row q-gutter-x-md justify-center items-center">
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.categoria"
                    name="categoria"
                    label="Categoria"
                    checkType="checkbox"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.categoria ? 'bg-green-6' : ''"
                  />
                </div>
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.subCategoria"
                    name="subCategoria"
                    label="SubCategoria"
                    checkType="checkbox"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.subCategoria ? 'bg-green-6' : ''"
                  />
                </div>
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.tipo" name="tipo"
                    label="Tipo"
                    checkType="checkbox"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.tipo ? 'bg-green-6' : ''"
                  />
                </div>
              </div>
              <div class="row q-gutter-x-md justify-center">
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.condicao"
                    name="condicaoProduto"
                    checkType="checkbox"
                    label="Novo / Usado"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.condicaoProduto ? 'bg-green-6' : ''"
                  />
                </div>
                <div class="col-3">
                  <input-check
                    v-model="item.row.produto.cep"
                    name="cep"
                    label="Cep Cidade"
                    @check="name => validaCheck(name)"
                    :class="anuncioValidador.cep ? 'bg-green-6' : ''"
                  />
                </div>
                <div class="col-3 flex justify-end">
                  <div>
                    <q-btn :disable="desabilitaSalvar" label="Salvar" color="primary" @click="salvar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import domtoimage from 'dom-to-image-more'
import { exportFile } from 'quasar'
import Mensagens from '@/classes/enums/Mensagens'
import UserService from '@/services/userService'
import VariacaoService from '@/services/variacaoService'
import AnuncioService from '@/services/anuncioService'
import ProdutoService from '@/services/produtoService'
import StorageService from '@/services/storageService.js'
import ContaOlxService from '@/services/contaOlxService.js'
import notificacaoMixin from '@/mixins/notificacaoMixin'
import inputCheck from '@/components/InputCheck'
import { formatCurrencyBrl, getFontSize } from '@/utils'
import { mapActions } from 'vuex'
export default {
  mixins: [notificacaoMixin],
  components: { inputCheck },
  mounted () {
    this.getUsuario()
    this.obterContaOlx()
    this.listarProdutos()
  },
  computed: {
    totalReais () {
      return formatCurrencyBrl(this.totalAnuncioMes * 0.01)
    },
    desabilitaSalvar () {
      const listaFalsa = Object.keys(this.anuncioValidador).filter(chave => !this.anuncioValidador[chave])
      if (listaFalsa.length === 0) return false
      return true
    }
  },
  data () {
    return {
      usuario: {},
      anuncio: {
        status: 'PENDENTE'
      },
      anuncioValidador: {
        imagem: false,
        titulo: false,
        descricao: false,
        categoria: false,
        subCategoria: false,
        tipo: false,
        preco: false,
        cep: false,
        condicaoProduto: false
      },
      contaOlx: {
        email: null,
        senha: null,
        status: null
      },
      listaVariacao: [],
      listaProdutos: [],
      tableColumns: [
        { name: 'acoes', label: 'Ações', align: 'center' },
        { name: 'modelo', label: 'Modelo', field: row => row.modelo.nome, align: 'center' },
        { name: 'produto', label: 'Produto', field: row => row.produto.nome, align: 'center' },
        { name: 'titulo', label: 'Titulo', field: row => row.titulo.descricao, align: 'center' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 1,
        pagesNumber: 0
      },
      totalAnuncioDia: 0,
      totalAnuncioMes: 0,
      totalAnuncioConta: 0,
      index: 0
    }
  },
  methods: {
    ...mapActions('usuario', ['setUsuario']),
    async getUsuario () {
      try {
        const id = localStorage.getItem('usuarioId')
        const response = await UserService.getById(id)
        if (response.data) {
          this.usuario = response.data
          this.getTotalAnuncios()
          this.setUsuario(response.data)
        }
      } catch (error) {
        localStorage.removeItem('usuarioId')
        this.$router.push({ name: 'home' })
        this.notificacaoErro(error.message || 'Erro ao logar')
      }
    },
    async getTotalAnuncios () {
      try {
        const diaResponse = await AnuncioService.totalDia(this.usuario.id)
        this.totalAnuncioDia = diaResponse.data
        const mesResponse = await AnuncioService.totalMes(this.usuario.id)
        this.totalAnuncioMes = mesResponse.data
      } catch (error) {
        this.notificacaoErro(error.message || 'Erro ao obter Totais anúncios')
      }
    },
    async obterContaOlx () {
      try {
        const contaOlxResponse = await ContaOlxService.obterDisponivel()
        this.contaOlx = contaOlxResponse.data
        this.obterTotalContaOlx(this.contaOlx.email)
      } catch (error) {
        this.notificacaoErro(error.message || 'Erro ao obter contaOlx por favor recarrege a página')
      }
    },
    async obterTotalContaOlx (email) {
      try {
        const response = await AnuncioService.totalContaOlx(email)
        this.totalAnuncioConta = response.data
      } catch (error) {
        this.notificacaoErro(error.message || 'Erro ao obter contaOlx por favor recarrege a página')
      }
    },
    voltar () {
      this.$router.back()
    },
    atualizarPaginacao (novoValor) {
      this.pagination.page = novoValor
      this.listarVariacao(this.filtroVariacao)
    },
    getInvertidaStyle (booleano) {
      if (booleano) return 'transform: scaleX(-1);'
      return ''
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
    },
    executarClique ({ menuItem, index }, variacao) {
      menuItem.click(variacao)
    },
    onRequest (props) {
      this.pagination = props.pagination
      this.listarVariacao(this.filtroVariacao)
    },
    listarProdutos () {
      ProdutoService.listar()
        .then(response => {
          this.listaProdutos = response.data
          if (this.listaProdutos.length > 0) {
            const produto = this.listaProdutos.shift()
            if (produto) {
              this.listarVariacao({ produtoId: produto.titulo })
            }
          }
        })
    },
    listarVariacao (variacaoFiltro) {
      VariacaoService.listarVariacoesSemAnuncio({ ...variacaoFiltro, page: this.pagination.page - 1, size: this.pagination.rowsPerPage })
        .then(response => {
          if (response.status === 200) {
            if (response.data.content.length > 0) {
              this.listaVariacao = response.data.content
              this.pagination.page = response.data.number + 1
              this.pagination.pagesNumber = response.data.totalPages
            } else {
              const produto = this.listaProdutos.shift()
              if (produto) {
                this.listarVariacao({ produtoId: produto.titulo })
              }
            }
          }
        }).catch(error => {
          this.notificacaoErro(error.message)
        })
    },
    baixarVariacao (variacao) {
      const variacaoEle = this.$refs.variacao.$el
      const downloadButton = this.$refs.downloadButton
      variacaoEle.removeChild(downloadButton)
      domtoimage.toBlob(variacaoEle)
        .then(blob => {
          exportFile(variacao.produto.nome + '.png', blob)
          this.anuncio.variacaoModelo = variacao
          this.anuncioValidador.imagem = true
          variacaoEle.appendChild(downloadButton)
        })
    },
    validaCheck (nomeCampo) {
      this.anuncioValidador[nomeCampo] = true
    },
    salvar () {
      this.anuncio.contaOlx = this.contaOlx
      this.anuncio.usuarioDivulgador = this.usuario
      AnuncioService.cadastrar(this.anuncio)
        .then(() => {
          this.notificacaoSucesso(Mensagens.OperacaoExecutada)
          this.anuncioValidador = {
            imagem: false,
            titulo: false,
            descricao: false,
            categoria: false,
            subCategoria: false,
            tipo: false,
            preco: false,
            cep: false,
            condicaoProduto: false
          }
          const produto = this.listaProdutos.shift()
          if (!produto) {
            this.listarProdutos()
          } else {
            this.listarVariacao({ produtoId: produto.titulo })
          }
        })
    }
  }
}
</script>
<style scoped>
.caixaValor {
  border: 1px solid black;
  padding: 10px;
  color: var(--primary);
  min-width: 4rem;
  text-align: center;
}
</style>
