<template>
  <q-form @submit="onSubmit">
    <div class="row q-gutter-x-md">
      <div
        class="col"
        v-for="input in inputs"
        :key="input.nome"
      >
        <q-input
          v-if="input.type !== 'select'"
          v-model="input.value"
          :type="input.type || 'text'"
          :label="input.label"
          :clearable="true && !input.clearable"
        />

        <q-select
          v-else-if="input.nome !== 'produto'"
          emit-value map-options
          v-model="input.value"
          :label="input.label"
          :options="input.options || []"
          :clearable="true && !input.clearable"
        />

        <q-select
          v-else
          emit-value map-options use-input
          v-model="input.value"
          :label="input.label"
          :options="options || []"
          :clearable="true && !input.clearable"
          @filter="filtrarProduto"
        />
      </div>
      <div class="col colorPrimary q-mt-md">
        <q-btn type="submit" :label="submitButton.label || 'Pesquisar'" />
      </div>
    </div>
  </q-form>
</template>
<script>
export default {
  name: 'SimpleForm',
  props: {
    inputs: {
      type: Array,
      default: () => [],
      required: true
    },
    submitButton: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      options: [],
      produtoOptions: this.inputs.find(input => input.nome === 'produto').options
    }
  },
  methods: {
    onSubmit () {
      const formData = this.montarForm()
      this.submitButton.submit(formData)
    },
    montarForm () {
      const form = {}
      this.inputs.map(input => {
        form[input.nome] = input.value
      })
      this.$emit('formMontado', form)
      return form
    },
    filtrarProduto (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.produtoOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.produtoOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
