<template>
  <div>
    <div v-if="element.tipo===TipoElemento.Imagem"  >
      <Moveable
        class="moveable"
        v-bind="moveable"
        ref="moveableRef"
        @drag="handleDrag"
        @scale="handleScale"
        @rotate="handleRotate"
        :style="`width: 12.5em; height: 12.5em; transform: ${element.transform}`"
      >
        <div class="relative-position">
          <q-btn v-show="element.foco" padding="none" flat
            style="position: absolute; right: 1px; top: -30px;"
            @click="excluirElement">
            <q-icon name="far fa-times-circle" style="font-size: 1em;" color="primary" />
          </q-btn>
          <div @click="focou" class="flex flex-center elementoMovel" :style=" element.style + 'background-color: #333333; cursor:pointer'">
            Imagem do Produto
          </div>
        </div>
      </Moveable>
    </div>
    <div v-else-if="element.tipo === TipoElemento.Descricao || element.tipo === TipoElemento.Titulo" >
      <Moveable
        class="moveable"
        v-bind="moveable"
        ref="moveableRef"
        @drag="handleDrag"
        @scale="handleScale"
        @rotate="handleRotate"
        :style="`width: 3.75em; transform: ${element.transform}`"
      >
        <div class="relative-position">
          <q-btn v-show="element.foco" padding="none" flat
            style="position: absolute; right: 1px; top: -20px;"
            @click="excluirElement">
            <q-icon name="far fa-times-circle" style="font-size: 1em;" color="primary" />
          </q-btn>
          <div @click="focou" class="flex flex-center elementoMovel" :style=" element.style + 'cursor:pointer;'" >
            {{ element.value }}
          </div>
        </div>
      </Moveable>
    </div>
    <div v-else >
      <Moveable
        class="moveable"
        ref="moveableRef"
        v-bind="moveable"
        @drag="handleDrag"
        @scale="handleScale"
        @rotate="handleRotate"
        :style="`width: 3.75em; height: 2.5em; transform: ${element.transform}`"
      >
        <div class="relative-position">
          <q-btn v-show="element.foco" padding="none" flat
            style="position: absolute; right: 1px; top: -20px;"
            @click="excluirElement">
            <q-icon name="far fa-times-circle" style="font-size: 1em;" color="primary" />
          </q-btn>
          <div @click="focou" class="flex flex-center elementoMovel" :style="element.style + 'background-color: #333333; cursor:pointer;'" >
            {{ element.value }}
          </div>
        </div>
      </Moveable>
    </div>
  </div>
</template>
<script>
import Moveable from 'vue-moveable'
import TipoElemento from '@/classes/enums/TipoElemento'
export default {
  props: ['element', 'foco'],
  components: {
    Moveable
  },
  created () {
    if (this.element.tipo !== 'imagem') this.moveable.rotatable = false
    if (this.foco) this.ligaFoco()
    else this.desligaFoco()
  },
  watch: {
    foco: function (val) {
      if (val) this.ligaFoco()
      else this.desligaFoco()
    }
  },
  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 1,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0.01,
      rotatable: true,
      throttleRotate: 0.2,
      origin: false
    },
    TipoElemento
  }),
  methods: {
    handleDrag ({ target, transform }) {
      this.$emit('transform', { id: this.element.id, transform })
      target.style.transform = transform
    },
    handleScale ({ target, transform }) {
      this.$emit('transform', { id: this.element.id, transform })
      target.style.transform = transform
    },
    handleRotate ({ target, transform }) {
      this.$emit('transform', { id: this.element.id, transform })
      target.style.transform = transform
    },
    desligaFoco () {
      this.moveable.draggable = false
      this.moveable.scalable = false
      this.moveable.rotatable = false
    },
    ligaFoco () {
      this.moveable.draggable = true
      this.moveable.scalable = true
      if (this.element.tipo === 'imagem') this.moveable.rotatable = true
    },
    focou () {
      this.$emit('focou')
    },
    excluirElement () {
      this.$emit('excluirElemento', this.element.id)
    }
  }
}
</script>
