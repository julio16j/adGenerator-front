<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Ad Generator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-expansion-item class="colorPrimary" group="leftMenu" expand-separator icon="fa fa-exchange-alt" label="Cadastros Básicos" caption="">
          <div class="itemMenu">
            <q-item clickable tag="a" v-ripple :to="{name: 'descricaoListar'}">
              <q-item-section avatar>
                <q-icon fa fa-dollar-sign name="fa fa-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" v-ripple :to="{name: 'cartaoListar'}">
              <q-item-section avatar>
                <q-icon fa fa-dollar-sign name="fa fa-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cartão</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" v-ripple :to="{name: 'produtoListar'}">
              <q-item-section avatar>
                <q-icon fa fa-dollar-sign name="fa fa-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Produto</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" v-ripple :to="{name: 'tituloListar'}">
              <q-item-section avatar>
                <q-icon fa fa-dollar-sign name="fa fa-list" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Título</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-expansion-item>
        <EssentialLink
          v-bind="signoutLink"
          @clickLink="logout"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const menuItens = [
  {
    title: 'Home',
    caption: 'Página Principal',
    icon: 'home',
    link: 'home'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: menuItens,
      signoutLink: {
        title: 'Sair',
        caption: '',
        icon: 'fas fa-sign-out-alt'
      }
    }
  },
  methods: {
    logout () {
      localStorage.setItem('logado', null)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
