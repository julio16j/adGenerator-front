<template>
  <q-card>
    Tem nada aqui
  </q-card>
</template>
<script>
import userService from '../services/userService'
import notificacaoMixin from '../mixins/notificacaoMixin'
import moment from 'moment'
export default {
  name: 'dashboard',
  mixins: [notificacaoMixin],
  mounted () {
    this.getUsuario()
  },
  data () {
    return {
      usuario: {},
      optionsFrequencia: [
        { label: 'Diária', value: 'diaria' },
        { label: 'Semanal', value: 'semanal' },
        { label: 'Mensal', value: 'mensal' },
        { label: 'Sem Frequência', value: 'semFrequencia' }
      ]
    }
  },
  methods: {
    async getUsuario () {
      try {
        const id = localStorage.getItem('usuarioId')
        const response = await userService.getById(id)
        if (response.data) this.usuario = response.data
      } catch (error) {
        this.notificacaoErro(error)
      }
    },
    formatarData (data) {
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  }
}
</script>
