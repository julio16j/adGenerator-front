<template>
  <q-form @submit="onSubmit">
    <div class="row q-gutter-x-md">
      <div
        class="col"
        v-for="input in inputs"
        :key="input.nome"
      >
        <q-select
          v-if="input.type === 'select'"
          emit-value map-options
          v-model="input.value"
          :label="input.label"
          :options="input.options || []"
          :clearable="true && !input.clearable"
        />

        <FilterSelect v-else-if="input.type === 'filterSelect'" :input="input" />

        <q-input
          v-else-if="input.type === 'price'"
          v-model="input.value"
          :label="input.label"
          mask="#.##"
          reverse-fill-mask
          prefix="R$"
        />

        <q-input
          v-else
          :type="input.type || 'text'"
          :label="input.label"
          v-model="input.value"
          :clearable="true && !input.clearable"
          :mask="input.mask || ''"
          :stack-label="input.type === 'date'"
        />
      </div>

      <div class="col colorPrimary q-mt-md">
        <q-btn type="submit" :label="submitButton.label || 'Pesquisar'" />
      </div>
    </div>
  </q-form>
</template>

<script>
import FilterSelect from '@/components/FilterSelect'

export default {
  name: 'SimpleForm',
  components: { FilterSelect },
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
