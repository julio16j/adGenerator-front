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
          iClean Admin
        </q-toolbar-title>

        <div>Powered by Ifpb Students</div>
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
