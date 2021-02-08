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
            <q-btn label="Salvar" @click="salvar" icon="check" color="green" />
          </div>
        </div>
        <div @click.self="desligaFoco" class="row justify-center">
          <div style="border: 1px solid black; height: 400px; width: 400px; position: relative"
            @click.self="desligaFoco" >
            <MoveableElement @focou="()=>{element.foco = true}"
              @excluirElemento="excluirElemento"
              @transform="tranformarElemento"
              v-for="element in elements" :key="element.id"
              :element="element" :foco="element.foco"
              :style="element.style"
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
  </q-page>
</template>
<script>
import MoveableElement from '../../components/MoveableElement'
export default {
  name: 'CriarModelo',
  components: {
    MoveableElement
  },
  data: () => ({
    elements: []
  }),
  methods: {
    addTitle () {
      this.elements.push(
        {
          id: this.elements.length,
          tipo: 'titulo',
          value: 'Titulo',
          style: 'position: absolute; right: 200px',
          foco: true,
          transform: {}
        })
    },
    addDescricao () {
      this.elements.push({
        id: this.elements.length,
        tipo: 'descricao',
        style: 'position: absolute; bottom: 200px',
        value: 'Descrição',
        foco: true,
        transform: {}
      })
    },
    addCartao () {
      this.elements.push({
        id: this.elements.length,
        tipo: 'cartao',
        style: 'position: absolute; top: 0; right: 300px',
        value: 'Cartão',
        foco: true,
        transform: {}
      })
    },
    addImage () {
      const listaElementosTipoImagem = this.elements.filter((element, index) => {
        if (element.tipo === 'imagem') {
          this.elements[index].foco = true
          return element.tipo === 'imagem'
        }
      })
      if (listaElementosTipoImagem.length === 0) {
        this.elements.push({
          id: this.elements.length,
          tipo: 'imagem',
          style: 'position: absolute; top: 0',
          foco: true,
          transform: {}
        })
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
          console.log(ele.transform)
        }
        return ele
      })
    },
    voltar () {
      this.$router.back()
    },
    salvar () {}
  }
}
</script>
