<template>
  <q-page class="flex flex-center" @click.self="desligaFoco">
    <div @click.self="desligaFoco" >
      <div @click.self="desligaFoco">
        <div class="row justify-center q-mb-md text-h4 colorPrimary" @click.self="desligaFoco">
          <div class="col">
            Cadastro de Modelos
          </div>
          <div class="q-ml-md q-gutter-x-md">
            <q-btn label="Voltar" @click="voltar" color="dark" />
            <q-btn label="Salvar" @click="abrirDialog" icon="check" color="green" />
          </div>
        </div>
        <div @click.self="desligaFoco" class="row justify-center">
          <div style="border: 1px solid black; height: 400px; width: 400px; position: relative"
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
        <div class="row justify-center q-mt-md" @click.self="desligaFoco" >
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
          console.log(response.data)
        })
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
    addTitle () {
      if (!this.temElementosByTipo(TipoElemento.Titulo)) {
        this.elements.push({
          id: this.elementsSequence,
          tipo: TipoElemento.Titulo,
          value: 'Titulo',
          absolute: 'position: absolute; right: 200px; z-index:1;',
          style: 'font-size: 16px; color: black;',
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
        style: 'font-size: 12px; color: black;',
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
        absolute: 'position: absolute; top: 0; right: 300px;',
        style: 'font-size: 12px; color: white; height: 40px;',
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
          style: 'color: white; width: 200px; height: 200px;',
          foco: true,
          transform: {}
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
            transformacao: ele.transform
          }
        } else if (ele.tipo === TipoElemento.Titulo) {
          modelo.titulo = {
            elementoTitulo: {
              value: ele.value,
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: ele.transform
          }
        } else if (ele.tipo === TipoElemento.Descricao) {
          modelo.descricoes.push({
            elementoDescricao: {
              value: ele.value,
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: ele.transform
          })
        } else {
          modelo.cartoes.push({
            elementoCartao: {
              value: ele.value,
              estiloInicial: ele.style + ele.absolute
            },
            transformacao: ele.transform
          })
        }
      })
      return modelo
    }
  }
}
</script>
