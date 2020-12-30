<script>
export default {
  methods: {
    criarNotificacao (message, type) {
      this.$q.notify({
        type,
        message
      })
    },
    notificacaoSucesso (message) {
      this.criarNotificacao(message, 'positive')
    },
    notificacaoErro (message) {
      this.criarNotificacao(message, 'negative')
    }
  }
}
</script>
