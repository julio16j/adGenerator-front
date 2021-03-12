<template>
  <q-form @submit="onSubmit">
    <div class="row q-gutter-x-md">
      <div class="col" v-for="input in inputs" :key="input.nome">
        <q-input v-if="input.type !== 'select'" :type="input.type || 'text'"
          :label="input.label" v-model="input.value" :clearable="true && !input.clearable"
        />
        <q-select v-else :label="input.label" v-model="input.value"
          emit-value map-options :options="input.options || []" :clearable="true && !input.clearable"
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
    }
  }
}
</script>
