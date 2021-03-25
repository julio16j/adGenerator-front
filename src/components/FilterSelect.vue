<template>
  <q-select
    emit-value map-options use-input
    v-model="input.value"
    :label="input.label"
    :options="options || []"
    :clearable="true && !input.clearable"
    @filter="filtrarProduto"
  />
</template>

<script>
export default {
  props: {
    input: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      options: [],
      selectOptions: this.input.options
    }
  },
  methods: {
    filtrarProduto (val, update) {
      if (val === '') {
        update(() => {
          this.options = []
          this.options = this.selectOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.selectOptions.filter(v => {
          if (typeof v === 'object') {
            return v.value.toLowerCase().indexOf(needle) > -1
          } else {
            return v.toLowerCase().indexOf(needle) > -1
          }
        })
      })
    }
  }
}
</script>
