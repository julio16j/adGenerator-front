import Home from '../pages/Index'
import Cadastra from '../pages/Cadastra'
import Dashboard from '../pages/Dashboard'
import CadastraLimpeza from '../pages/CadastraLimpeza'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Home, name: 'home' },
      { path: 'cadastrar', component: Cadastra, name: 'cadastrar' },
      { path: 'dashboard', component: Dashboard, name: 'dashboard' },
      { path: 'novaLimpeza', component: CadastraLimpeza, name: 'cadastrarLimpeza' }
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
