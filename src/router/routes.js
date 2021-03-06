import Home from '@/pages/Index'
import Cadastra from '@/pages/Cadastra'
import Dashboard from '@/pages/Dashboard'
import DashboardDivulgador from '@/pages/DashboardDivulgador'
import CriarModelo from '@/pages/Modelo/CriarModelo'
import ModeloListar from '@/pages/Modelo/Listar'
import DescricaoCadastro from '@/pages/DadosBasicos/Descricao/Cadastro'
import DescricaoListar from '@/pages/DadosBasicos/Descricao/Listar'
import CartaoListar from '@/pages/DadosBasicos/Cartao/Listar'
import CartaoCadastro from '@/pages/DadosBasicos/Cartao/Cadastro'
import TituloListar from '@/pages/DadosBasicos/Titulo/Listar'
import TituloCadastro from '@/pages/DadosBasicos/Titulo/Cadastro'
import ProdutoListar from '@/pages/DadosBasicos/Produto/Listar'
import ProdutoCadastro from '@/pages/DadosBasicos/Produto/Cadastro'
import VariacoesListar from '@/pages/Variacoes/Listar'
import DivulgadorListar from '@/pages/Divulgador/Listar'
import DivulgadorCadastrar from '@/pages/Divulgador/Cadastrar'
import AnunciosListar from '@/pages/Anuncios/Listar'

import Router from '../layouts/Router'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: Home, name: 'home' },
      { path: 'cadastrar', component: Cadastra, name: 'cadastrar' },
      { path: 'dashboard', component: Dashboard, name: 'dashboard' },
      { path: 'dashboardDivulgador', component: DashboardDivulgador, name: 'dashboardDivulgador' },
      {
        path: 'modelo',
        component: Router,
        children: [
          { path: 'adicionar', component: CriarModelo, name: 'criarModelo' },
          { path: 'listar', component: ModeloListar, name: 'modeloListar' },
          {
            path: 'editar/:modeloId',
            component: CriarModelo,
            name: 'editarModelo',
            props: { contexto: 'editar' }
          }
        ]
      },
      {
        path: 'divulgador',
        component: Router,
        children: [
          { path: 'cadastro', component: DivulgadorCadastrar, name: 'divulgadorCadastrar' },
          { path: 'listar', component: DivulgadorListar, name: 'divulgadorListar' },
          {
            path: 'editar/:divulgadorId',
            component: DivulgadorCadastrar,
            name: 'divulgadorEditar',
            props: { contexto: 'editar', label: 'Edição de Divulgadores' }
          }
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
      },
      {
        path: 'titulo',
        component: Router,
        children: [
          { path: 'listar', component: TituloListar, name: 'tituloListar' },
          { path: 'cadastro', component: TituloCadastro, name: 'tituloCadastro' },
          {
            path: 'editar/:tituloId',
            component: TituloCadastro,
            name: 'tituloEditar',
            props: { contexto: 'editar' }
          }
        ]
      },
      {
        path: 'produto',
        component: Router,
        children: [
          { path: 'listar', component: ProdutoListar, name: 'produtoListar' },
          { path: 'cadastro', component: ProdutoCadastro, name: 'produtoCadastro' },
          {
            path: 'editar/:produtoId',
            component: ProdutoCadastro,
            name: 'produtoEditar',
            props: { contexto: 'editar' }
          }
        ]
      },
      {
        path: 'variacoes',
        component: Router,
        children: [
          { path: 'listar', component: VariacoesListar, name: 'variacoesListar' },
          { path: 'gerar', component: VariacoesListar, name: 'variacoesGerar' }
        ]
      },
      {
        path: 'anuncios',
        component: Router,
        children: [
          { path: 'listar', component: AnunciosListar, name: 'anunciosListar' }
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
