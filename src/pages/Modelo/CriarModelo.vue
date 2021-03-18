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
              @transform="tranformarElemento"
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
import { fontSizeAtual, converterPxToEm } from '@/utils'
export default {
  name: 'CriarModelo',
  mixins: [notificacaoMixin],
  components: {
    MoveableElement
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
    temElementosByTipo (tipo) {
      const listaElementosByTipo = this.elements.filter((element, index) => {
        if (element.tipo === tipo) {
          this.elements[index].foco = true
          return element.tipo === tipo
        }
      })
      return listaElementosByTipo.length > 0
    },
    addTitle () {
      if (!this.temElementosByTipo(TipoElemento.Titulo)) {
        this.elements.push({
          id: this.elementsSequence,
          tipo: TipoElemento.Titulo,
          value: 'Titulo',
          absolute: 'position: absolute; right: 200px; z-index:1;',
          style: 'font-size: 1em; color: black;',
          foco: true,
          transform: {}
        })
        this.elementsSequence++
      }
    },
    addDescricao () {
      this.elements.push({
        id: this.elementsSequence,
        tipo: TipoElemento.Descricao,
        absolute: 'position: absolute; bottom: 200px;z-index:1;',
        style: 'color: black;',
        value: 'Descrição',
        foco: true,
        transform: {}
      })
      this.elementsSequence++
    },
    addCartao () {
      this.elements.push({
        id: this.elementsSequence,
        tipo: TipoElemento.cartao,
        absolute: 'position: absolute; top: 0; right: 20px;',
        style: 'color: white; height: 2.5em;',
        value: 'Cartão',
        foco: true,
        transform: {}
      })
      this.elementsSequence++
    },
    addImage () {
      if (!this.temElementosByTipo(TipoElemento.Imagem)) {
        this.elements.push({
          id: this.elementsSequence,
          tipo: TipoElemento.Imagem,
          absolute: 'position: absolute; top: 0;',
          style: 'color: white; width: 12.5em; height: 12.5em;',
          foco: true,
          transform: {}
        })
        this.elementsSequence++
      }
      console.log(window.innerWidth)
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
    tranformarElemento ({ id, transform, tipo }) {
      this.elements = this.elements.map(ele => {
        if (ele.id === id) {
          ele.transform[tipo] = transform
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
      const modeloMontado = this.montarModelo()
      ModeloService.cadastrar(modeloMontado)
        .then(response => {
          if (response.status === 200) {
            this.notificacaoSucesso(Mensagens.OperacaoExecutada)
            this.$router.back()
          }
        }).catch(error => {
          this.notificacaoErro(error.data + '')
        })
      this.abreNomeDialog = false
    },
    montarModelo () {
      const modelo = { ...this.modelo }
      this.elements.map(ele => {
        if (ele.tipo === TipoElemento.Imagem) {
          modelo.imagem = {
            elementoImagem: {
              value: 'imagem',
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: this.tratarTransform(ele.transform)
          }
        } else if (ele.tipo === TipoElemento.Titulo) {
          modelo.titulo = {
            elementoTitulo: {
              value: ele.value,
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: this.tratarTransform(ele.transform)
          }
        } else if (ele.tipo === TipoElemento.Descricao) {
          modelo.descricoes.push({
            elementoDescricao: {
              value: ele.value,
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: this.tratarTransform(ele.transform)
          })
        } else {
          modelo.cartoes.push({
            elementoCartao: {
              value: ele.value,
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: this.tratarTransform(ele.transform)
          })
        }
      })
      return modelo
    },
    tratarTransform (transform) {
      if (transform.translate) {
        transform.translate = this.tratarTranslate(transform.translate)
      }
      if (transform.rotate) {
        transform.rotate = this.tratarOutrosTransform(transform.rotate)
      }
      if (transform.scale) {
        transform.scale = this.tratarOutrosTransform(transform.scale)
      }
      return transform
    },
    tratarTranslate (translate) {
      const fontSize = fontSizeAtual()
      const strings = translate.split(',')
      const quintoIndex = strings[5].split(')')
      const direitaQuintoIndex = quintoIndex[1].split('(')
      const sextoIndex = [strings[6][0], strings[6].replace(' ', '').replace('px)', ''), 'em)']
      strings[4] = String(Number(strings[4]) / fontSize)
      quintoIndex[0] = String(Number(quintoIndex[0]) / fontSize)
      direitaQuintoIndex[1] = converterPxToEm(direitaQuintoIndex[1])
      sextoIndex[1] = String(Number(sextoIndex[1]) / fontSize)
      quintoIndex[1] = direitaQuintoIndex
      strings[5] = quintoIndex
      strings[6] = sextoIndex
      let stringFinal = strings[0] + ',' + strings[1] + ',' + strings[2] + ',' + strings[3] + ',' + strings[4] + ','
      stringFinal += quintoIndex[0] + ')' + quintoIndex[1][0] + '(' + quintoIndex[1][1] + ','
      stringFinal += sextoIndex[0] + sextoIndex[1] + sextoIndex[2]
      return stringFinal
    },
    tratarOutrosTransform (outro) {
      const fontSize = fontSizeAtual()
      const strings = outro.split(',')
      const quintoIndex = strings[5].split(')')
      strings[4] = String(Number(strings[4]) / fontSize)
      quintoIndex[0] = String(Number(quintoIndex[0]) / fontSize)
      let stringFinal = strings[0] + ',' + strings[1] + ',' + strings[2] + ',' + strings[3] + ',' + strings[4] + ','
      stringFinal += quintoIndex[0] + ')' + quintoIndex[1] + ')'
      return stringFinal
    }
  }
}
</script>
