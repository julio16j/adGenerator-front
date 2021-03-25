<template>
  <div>
    <q-file
      :type="input.type"
      :label="input.label"
      v-model="input.value"
      @rejected="onRejected"
      @input="onChange"
      accept="image/*"
      max-files="1"
      outlined bottom-slots
    >
      <template v-slot:append>
        <q-icon name="create_new_folder"></q-icon>
      </template>
    </q-file>

    <q-img
      v-if="url || input.url"
      :src="url || input.url"
      spinner-color="white"
      alt="imagemCartao"
    />
  </div>
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
      url: null
    }
  },
  methods: {
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
