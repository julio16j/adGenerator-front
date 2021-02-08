import Home from '../pages/Index'
import Cadastra from '../pages/Cadastra'
import Dashboard from '../pages/Dashboard'
import CriarModelo from '../pages/Modelo/CriarModelo'
import Router from '../layouts/Router'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Home, name: 'home' },
      { path: 'cadastrar', component: Cadastra, name: 'cadastrar' },
      { path: 'dashboard', component: Dashboard, name: 'dashboard' },
      {
        path: 'modelo',
        component: Router,
        children: [
          { path: 'adicionar', component: CriarModelo, name: 'criarModelo' }
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
