<template>
  <q-page class="flex flex-center">
    <q-card style="width: 500px">
      <q-card-section>
        <div class="row justify-center q-mb-md text-h4 colorPrimary">
          Cadastrar-se
        </div>
        <div class="row justify-center text-subtitle1 colorPrimary">
          Informe seus dados de cadastro
        </div>
        <q-form @submit="cadastrar" style="display: flex; justify-content: center" >
          <div style="width: 80%">
            <div>
              <q-input label="Nome" v-model="form.nome"
                :rules="[ val => val && val.length > 0 || '']" />
            </div>
            <div>
              <q-input label="Email" v-model="form.email"
                :rules="[ val => val && val.length > 0 || '']" />
            </div>
            <div>
              <q-input label="Senha" v-model="form.senha" type="password"
                :rules="[ val => val && val.length > 0 || '']" />
            </div>
            <div class="q-mt-md row justify-between">
              <div class="col colorPrimary">
                <q-btn @click="navigateToLogin" label="Já Possui Conta ?" flat round />
              </div>
              <div class="col colorPrimary flex justify-end">
                <q-btn type="submit" label="Confirmar" />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import userService from '../services/userService'
import notificacaoMixin from '../mixins/notificacaoMixin'
export default {
  name: 'Cadastra',
  mixins: [notificacaoMixin],
  data () {
    return {
      form: {
        nome: null,
        email: null,
        senha: null,
        isAdmin: true
      }
    }
  },
  methods: {
    navigateToLogin () {
      this.$router.push({ name: 'home' })
    },
    navigateToDashBoard () {
      this.$router.push({ name: 'dashboard' })
    },
    async cadastrar () {
      try {
        const response = await userService.cadastrar(this.form)
        if (response.data && this.isAdmin(response.data)) {
          localStorage.setItem('logado', 'logado')
          localStorage.setItem('usuarioId', response.data.id)
          this.navigateToDashBoard()
        }
      } catch (error) {
        this.notificacaoErro(error.data + '')
      }
    },
    isAdmin (usuario) {
      const admin = usuario.isAdmin === true
      if (!admin) this.notificacaoErro('Usuário não permitido')
      return admin
    }
  }
}
</script>
<style>
.colorPrimary {
  color: #1976D2;
}
</style>
