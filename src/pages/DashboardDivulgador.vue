<template>
  <div class="q-gutter-y-md">
    <q-card class="q-mx-md" >
      <q-card-section class="row justify-between items-center q-pa-md q-gutter-x-md">
        <div class="text-h6 colorPrimary" >
          DIVULGADOR: {{ usuario.nome }}
        </div>
        <div class="col row q-gutter-x-md">
          <div class="col ">
            <div class="row text-center colorPrimary">
              TOTAL DE ANÚNCIOS NO DIA
            </div>
            <div class="row justify-center">
              <div class="caixaValor" >
                {{ totalAnuncioDia }}
              </div>
            </div>
          </div>
          <div class="col ">
            <div class="row text-center colorPrimary">
              TOTAL DE ANÚNCIOS NO MÊS
            </div>
            <div class="row justify-center">
              <div class="caixaValor" >
                {{ totalAnuncioMes }}
              </div>
            </div>
          </div>
          <div class="col ">
            <div class="row text-center colorPrimary">
              VALOR ACUMULADO NO MÊS
            </div>
            <div class="row justify-center">
              <div class="caixaValor" >
                {{ totalReais }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import UserService from '@/services/userService'
import AnuncioService from '@/services/anuncioService'
import notificacaoMixin from '@/mixins/notificacaoMixin'
import { formatCurrencyBrl } from '@/utils'
import { mapActions } from 'vuex'
export default {
  name: 'dashboardDivulgador',
  mixins: [notificacaoMixin],
  components: {},
  mounted () {
    this.getUsuario()
  },
  computed: {
    totalReais () {
      return formatCurrencyBrl(this.totalAnuncioMes * 0.01)
    }
  },
  data () {
    return {
      usuario: {},
      contaOlx: {
        email: 'Julin@gmail.com',
        senha: 123
      },
      totalAnuncioDia: 0,
      totalAnuncioMes: 0
    }
  },
  methods: {
    ...mapActions('usuario', ['setUsuario']),
    async getUsuario () {
      try {
        const id = localStorage.getItem('usuarioId')
        const response = await UserService.getById(id)
        if (response.data) {
          this.usuario = response.data
          this.getTotalAnuncios()
          this.setUsuario(response.data)
        }
      } catch (error) {
        localStorage.removeItem('usuarioId')
        this.$router.push({ name: 'home' })
        this.notificacaoErro(error.message || 'Erro ao logar')
      }
    },
    async getTotalAnuncios () {
      try {
        const diaResponse = await AnuncioService.totalDia(this.usuario.id)
        this.totalAnuncioDia = diaResponse.data
        const mesResponse = await AnuncioService.totalMes(this.usuario.id)
        this.totalAnuncioMes = mesResponse.data
      } catch (error) {
        this.notificacaoErro(error.message || 'Erro ao obter Totais anúncios')
      }
    },
    voltar () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.caixaValor {
  border: 1px solid black;
  padding: 10px;
  color: var(--primary)
}
</style>
