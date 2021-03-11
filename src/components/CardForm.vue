<template>
  <q-card :style="cardStyle" :class="cardClass">
    <q-card-section>
      <div :class="tituloStyle">{{ titulo }}</div>
      <div :class="subTituloStyle">{{ subTitulo }}</div>

      <q-form @submit="onSubmit" style="display: flex; justify-content: center" >
        <div style="width: 80%">
          <div class="row q-gutter-x-md">
            <div v-for="input in inputs"
              :key="input.nome"
              v-bind:class="{
                'col': input.type !== 'file',
                'col-12': input.type === 'file'
              }"
            >
              <q-input
                v-if="input.type !== 'select' && input.type !== 'file'"
                :type="input.type || 'text'"
                :label="input.label"
                v-model="input.value"
                :clearable="true && !input.clearable"
                :rules="input.rules || [ val => val && val.length > 0 || '']"
                :readonly="input.readonly || false"
              />

              <div v-else-if="input.type === 'file'">
                <q-file
                  :type="input.type"
                  :label="input.label"
                  v-model="input.value"
                  @rejected="onRejected"
                  @input="onChange"
                  accept="image/*"
                  max-files="1"
                  outlined bottom-slots
                  style="width: calc(100% - 16px)"
                >
                  <template v-slot:append>
                    <q-icon name="create_new_folder"></q-icon>
                  </template>
                </q-file>
                <img v-if="url" :src="url" alt="imagemCartao" style="width: calc(100% - 16px)">
              </div>

              <q-select
                v-else :label="input.label"
                v-model="input.value"
                emit-value map-options
                :options="input.options || []"
                :clearable="true && !input.clearable"
                :rules="input.rules || [ val => val && !!val || '']"
              />
            </div>
          </div>

          <div class="q-mt-md row justify-end">
            <div class="col-3 colorPrimary">
              <q-btn
                @click="cancelButton.click"
                :label="cancelButton.label || 'Cancelar'"
                flat round
              />
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
  data () {
    return {
      url: null
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
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    onChange (e) {
      this.url = URL.createObjectURL(e)
    }
  }
}
</script>
