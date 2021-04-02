<template>
  <div class="row" >
    <q-input :class="'col ' + inputClass" :label="label" :readonly="readonly" outlined v-model="value" />
    <q-btn v-if="checkType === 'copy'" flat @click="() => copiar(value)" >
      <q-icon name="far fa-clone" size="1rem" />
    </q-btn>
    <q-btn v-else flat @click="sucess" >
      <q-icon name="fas fa-check" size="1rem" />
    </q-btn>
  </div>
</template>
<script>
import { copyToClipboard } from 'quasar'
export default {
  props: {
    value: {
      default: null
    },
    label: String,
    readonly: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: 'campoCopiado'
    },
    checkType: {
      type: String,
      default: 'copy'
    }
  },
  data () {
    return {
      inputClass: ''
    }
  },
  methods: {
    copiar (text) {
      copyToClipboard(text)
        .then(() => {
          this.sucess()
        })
    },
    sucess () {
      this.inputClass = 'bg-green-6'
      this.$emit('check', this.name)
    }
  }
}
</script>
