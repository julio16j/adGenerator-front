import Home from '@/pages/Index'
import Cadastra from '@/pages/Cadastra'
import Dashboard from '@/pages/Dashboard'
import CriarModelo from '@/pages/Modelo/CriarModelo'
import DescricaoCadastro from '@/pages/DadosBasicos/Descricao/Cadastro'
import DescricaoListar from '@/pages/DadosBasicos/Descricao/Listar'
import CartaoListar from '@/pages/Cartao/Listar'
import CartaoCadastro from '@/pages/Cartao/Cadastro'

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
      },
      {
        path: 'Descricao',
        component: Router,
        children: [
          { path: 'cadastro', component: DescricaoCadastro, name: 'descricaoCadastro' },
          { path: 'listar', component: DescricaoListar, name: 'descricaoListar' },
          {
            path: 'editar/:descricaoId',
            component: DescricaoCadastro,
            name: 'descricaoEditar',
            props: { contexto: 'editar' }
          },
          {
            path: 'excluir/:descricaoId',
            component: DescricaoListar,
            name: 'descricaoExcluir'
          }
        ]
      },
      {
        path: 'cartao',
        component: Router,
        children: [
          { path: 'listar', component: CartaoListar, name: 'cartaoListar' },
          { path: 'cadastro', component: CartaoCadastro, name: 'cartaoCadastro' },
          {
            path: 'editar/:cartaoId',
            component: CartaoCadastro,
            name: 'cartaoEditar',
            props: { contexto: 'editar' }
          }
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
