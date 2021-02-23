<template>
  <q-card :style="cardStyle" :class="cardClass">
    <q-card-section>
      <div :class="tituloStyle">
        {{ titulo }}
      </div>
      <div :class="subTituloStyle">
        {{ subTitulo }}
      </div>
      <q-form @submit="onSubmit" style="display: flex; justify-content: center" >
        <div style="width: 80%">
          <div class="row q-gutter-x-md">
            <div class="col" v-for="input in inputs" :key="input.nome">
              <q-input v-if="input.type !== 'select'" :type="input.type || 'text'"
                :label="input.label" v-model="input.value" :clearable="true && !input.clearable"
                :rules="input.rules || [ val => val && val.length > 0 || '']"
                :readonly="input.readonly || false" />
              <q-select v-else :label="input.label" v-model="input.value"
                emit-value map-options :options="input.options || []" :clearable="true && !input.clearable"
                :rules="input.rules || [ val => val && !!val || '']" />
            </div>
          </div>
          <div class="q-mt-md row justify-end">
            <div class="col-3 colorPrimary">
              <q-btn @click="cancelButton.click" :label="cancelButton.label || 'Cancelar'" flat round />
            </div>
            <div class="col-2 colorPrimary">
              <q-btn type="submit" :label="submitButton.label || 'Salvar'" />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'CardForm',
  props: {
    titulo: {
      type: String,
      default: 'Formulário'
    },
    tituloStyle: {
      type: String,
      default: 'row justify-center q-mb-md text-h4 colorPrimary'
    },
    subTitulo: {
      type: String,
      default: 'Preencha os Campos abaixo'
    },
    subTituloStyle: {
      type: String,
      default: 'row justify-center text-subtitle1 colorPrimary'
    },
    submitButton: {
      type: Object,
      required: true
    },
    cardStyle: {
      type: String,
      default: 'width: 500px;'
    },
    cardClass: {
      type: String,
      default: 'q-mt-xl'
    },
    inputs: {
      required: true
    },
    cancelButton: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSubmit () {
      const formData = this.montarForm()
      this.submitButton.submit(formData)
      this.$emit('xablau', { xablau: 'xablau' })
    },
    montarForm () {
      const form = {}
      this.inputs.map(input => {
        form[input.nome] = input.value
      })
      return form
    }
  }
}
</script>
