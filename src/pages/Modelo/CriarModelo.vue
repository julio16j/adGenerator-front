<template>
  <q-page class="flex justify-center" @click.self="desligaFoco">
    <div @click.self="desligaFoco" >
      <div @click.self="desligaFoco">
        <div class="row justify-center q-my-md text-h4 colorPrimary" @click.self="desligaFoco">
          <div class="col text-h5 text-center q-pl-md flex items-center">
            Cadastro de Modelos
          </div>
          <div class="q-ml-md q-gutter-x-md q-pr-md">
            <q-btn label="Voltar" @click="voltar" color="dark" />
            <q-btn label="Salvar" @click="abrirDialog" icon="check" color="green" />
          </div>
        </div>
        <div @click.self="desligaFoco" class="row justify-center">
          <div style="border: 1px solid black; height: 25em; width: 25em; position: relative"
            @click.self="desligaFoco" >
            <moveable-element @focou="()=>{element.foco = true}"
              @excluirElemento="excluirElemento"
              @transform="transformarElemento"
              v-for="element in elements" :key="element.id"
              :element="element" :foco="element.foco"
              :style="element.absolute"
            />
          </div>
        </div>
        <div class="row justify-center q-mt-md q-px-md" @click.self="desligaFoco" >
            <q-btn-group push  >
              <q-btn push color="primary" label="Imagem" icon="image" @click="addImage" />
              <q-btn push color="primary" label="Título" icon="title" @click="addTitle" />
              <q-btn push color="primary" label="Descrição" icon="description" @click="addDescricao" />
              <q-btn push color="primary" label="Cartão" icon="far fa-credit-card" @click="addCartao" />
            </q-btn-group>
          </div>
      </div>
    </div>
    <q-dialog v-model="abreNomeDialog" >
      <q-card >
        <q-card-section class="colorPrimary text-h6">
          Insira um Nome para o Modelo
        </q-card-section>
        <q-card-section>
          <div>
            <q-input label="Nome" v-model="modelo.nome" />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Salvar" @click="salvar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import MoveableElement from 'components/MoveableElement'
import TipoElemento from '@/classes/enums/TipoElemento'
import Mensagens from '@/classes/enums/Mensagens'
import ModeloService from '@/services/modeloService.js'
import notificacaoMixin from '@/mixins/notificacaoMixin'
import { getFontSize, converterPxToEm, converterEmToPx } from '@/utils'
export default {
  name: 'CriarModelo',
  mixins: [notificacaoMixin],
  components: {
    MoveableElement
  },
  props: {
    contexto: { type: String, default: 'cadastro' }
  },
  created () {
    if (this.contexto === 'editar') {
      this.getModelo(this.$route.params.modeloId)
    }
  },
  data: () => ({
    elements: [],
    modelo: {
      nome: '',
      descricoes: [],
      cartoes: []
    },
    abreNomeDialog: false,
    elementsSequence: 0
  }),
  methods: {
    getModelo (modeloId) {
      ModeloService.getById(modeloId)
        .then(response => {
          Object.keys(response.data).forEach(key => {
            this.addElement(key, response.data[key])
          })
          // const { imagem } = response.data
          // const { style, absolute, transformacao } = this.getElementoStyle(imagem)
          // this.addImage({ absolute, style, transformacao })
        })
    },
    getElementoStyle (elemento) {
      const transformacao = this.getTransform(elemento.transformacao)
      const elementoStyle = elemento.estiloInicial
      let [style, absolute] = elementoStyle.split('position')
      absolute = absolute.replace(':', 'position:')
      return ({ style, absolute, transformacao })
    },
    getTransform (transformacao) {
      const fontSize = getFontSize()
      const [matrix, translate] = transformacao.split(')')
      let matrixSplit = matrix.split(',')
      matrixSplit[4] = String(Number(matrixSplit[4] * fontSize))
      matrixSplit[5] = String(Number(matrixSplit[5] * fontSize))
      matrixSplit = matrixSplit.join(',') + ')'

      if (!translate.includes('translate')) return matrixSplit + ' ' + translate
      let translateSplit = translate.split(',')
      translateSplit[0] = translateSplit[0].split('(')
      translateSplit[0][1] = converterEmToPx(translateSplit[0][1])
      translateSplit[0] = translateSplit[0].join('(')
      translateSplit[1] = converterEmToPx(translateSplit[1])
      translateSplit = translateSplit.join(', ') + ')'

      return matrixSplit + ' ' + translateSplit
    },
    temElementosByTipo (tipo) {
      const listaElementosByTipo = this.elements.filter((element, index) => {
        if (element.tipo === tipo) {
          this.elements[index].foco = true
          return element.tipo === tipo
        }
      })
      return listaElementosByTipo.length > 0
    },
    addElement (tipo, elemento) {
      if (tipo === 'nome') {
        this.modelo.nome = elemento
      } else if (Array.isArray(elemento)) {
        elemento.forEach(ele => {
          const { style, absolute, transformacao } = this.getElementoStyle(ele)

          if (tipo === 'cartoes') this.addCartao({ absolute, style, transformacao })
          else if (tipo === 'descricoes') this.addDescricao({ absolute, style, transformacao })
        })
      } else {
        const { style, absolute, transformacao } = this.getElementoStyle(elemento)

        if (tipo === 'imagem') this.addImage({ absolute, style, transformacao })
        else if (tipo === 'titulo') this.addTitle({ absolute, style, transformacao })
      }
    },
    addTitle ({ absolute, style, transformacao }) {
      if (!this.temElementosByTipo(TipoElemento.Titulo)) {
        this.elements.push({
          id: this.elementsSequence,
          tipo: TipoElemento.Titulo,
          value: 'Titulo',
          absolute: absolute || 'position: absolute; right: 3em; z-index:1;',
          style: style || 'font-size: 1em; color: black;',
          foco: true,
          transform: transformacao
        })
        this.elementsSequence++
      }
    },
    addDescricao ({ absolute, style, transformacao }) {
      this.elements.push({
        id: this.elementsSequence,
        tipo: TipoElemento.Descricao,
        absolute: absolute || 'position: absolute; bottom: 1emx;z-index:1;',
        style: style || 'color: black;',
        value: 'Descrição',
        foco: true,
        transform: transformacao
      })
      this.elementsSequence++
    },
    addCartao ({ absolute, style, transformacao }) {
      this.elements.push({
        id: this.elementsSequence,
        tipo: TipoElemento.cartao,
        absolute: absolute || 'position: absolute; top: 0; right: 1em;',
        style: style || 'color: white; height: 2.5em; width: 4em;',
        value: 'Cartão',
        foco: true,
        transform: transformacao
      })
      this.elementsSequence++
    },
    addImage ({ absolute, style, transformacao }) {
      if (!this.temElementosByTipo(TipoElemento.Imagem)) {
        this.elements.push({
          id: this.elementsSequence,
          tipo: TipoElemento.Imagem,
          absolute: absolute || 'position: absolute; top: 0;',
          style: style || 'color: white; width: 12.5em; height: 12.5em;',
          foco: true,
          transform: transformacao
        })
        this.elementsSequence++
      }
    },
    desligaFoco () {
      this.elements = this.elements.map(element => {
        element.foco = false
        return element
      })
    },
    excluirElemento (id) {
      this.elements = this.elements.filter(element => element.id !== id)
    },
    transformarElemento ({ id, transform }) {
      this.elements = this.elements.map(ele => {
        if (ele.id === id) {
          ele.transform = transform
        }
        return ele
      })
    },
    voltar () {
      this.$router.back()
    },
    abrirDialog () {
      this.abreNomeDialog = true
    },
    salvar () {
      if (this.contexto === 'cadastro') {
        ModeloService.cadastrar(this.montarModelo())
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagens.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.data + '')
          })
        this.abreNomeDialog = false
      } else {
        ModeloService.editar(this.montarModelo())
          .then(response => {
            if (response.status === 200) {
              this.notificacaoSucesso(Mensagens.OperacaoExecutada)
              this.$router.back()
            }
          }).catch(error => {
            this.notificacaoErro(error.data + '')
          })
        this.abreNomeDialog = false
      }
    },
    montarModelo () {
      const modelo = { ...this.modelo }
      this.elements.map(ele => {
        if (ele.tipo === TipoElemento.Imagem) {
          modelo.imagem = {
            estiloInicial: ele.style + ele.absolute,
            transformacao: this.tratarTransform(ele.transform)
          }
        } else if (ele.tipo === TipoElemento.Titulo) {
          modelo.titulo = {
            estiloInicial: ele.style + ele.absolute,
            transformacao: this.tratarTransform(ele.transform)
          }
        } else if (ele.tipo === TipoElemento.Descricao) {
          modelo.descricoes.push({
            estiloInicial: ele.style + ele.absolute,
            transformacao: this.tratarTransform(ele.transform)
          })
        } else {
          modelo.cartoes.push({
            estiloInicial: ele.style + ele.absolute,
            transformacao: this.tratarTransform(ele.transform)
          })
        }
      })
      return modelo
    },
    tratarTransform (transform, isEditar) {
      if (!transform) return transform
      const transformSplit = transform.split(') ')
      const matrix = this.tratarMatrix(transformSplit[0])
      const transformDireita = this.tratarDireita(transformSplit[1])
      if (isEditar) return matrix + ') ' + transformSplit[1]
      return matrix + ') ' + transformDireita
    },
    tratarMatrix (matrix) {
      const fontSize = getFontSize()
      const matrixSplit = matrix.split(',')
      matrixSplit[4] = String(Number(matrixSplit[4] / fontSize))
      matrixSplit[5] = String(Number(matrixSplit[5] / fontSize))
      return matrixSplit.join(',')
    },
    tratarDireita (direita) {
      if (!direita.includes('translate')) return direita
      const direitaSplit = direita.split(', ')
      direitaSplit[0] = direitaSplit[0].split('(')
      direitaSplit[0][1] = converterPxToEm(direitaSplit[0][1])
      direitaSplit[1] = converterPxToEm(direitaSplit[1].replace(')', '')) + ')'
      return direitaSplit[0].join('(') + ', ' + direitaSplit[1]
    }
  }
}
</script>
