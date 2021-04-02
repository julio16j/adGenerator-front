<template>
  <div class="text-white text-center q-pa-md">
    <div v-if="value === 'PENDENTE'" class="bg-warning">
      {{ value }}
    </div>
    <div v-if="value === 'ATIVO'" class="bg-green">
      {{ value }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
