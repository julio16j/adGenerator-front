<template>
  <q-card >
    <q-section class="row justify-between q-pa-md">
      <div class="text-h5 colorPrimary" >
        Olá {{usuario.nome}}
      </div>
      <div>
        <q-btn icon="fa fa-plus" label="Adicionar Modelo" color="primary" :to="{ name: 'criarModelo' }" />
      </div>
    </q-section>
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
        localStorage.setItem('logado', 'nao')
        this.$router.push({ name: 'home' })
        this.notificacaoErro(error.message || 'Erro ao logar')
      }
    },
    formatarData (data) {
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  }
}
</script>
