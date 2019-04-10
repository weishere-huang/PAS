import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import OrderList from '@/components/OrderList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList
    }
  ]
})
