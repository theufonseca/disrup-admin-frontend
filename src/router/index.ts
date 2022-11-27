import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ListaEmpresas from '@/views/ListaEmpresas.vue'
import FormularioEmpresa from '@/views/FormularioEmpresa.vue'
import DetalheEmpresa from '@/views/DetalheEmpresa.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Listar Empresas',
    component: ListaEmpresas
  },
  {
    path: '/empresa/nova',
    name: 'Nova Empresa',
    component: FormularioEmpresa
  },
  {
    path: '/empresa/detalhe/:id',
    name: 'Detalhe Empresa',
    component: DetalheEmpresa,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
