import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import OrderList from '@/components/order/OrderList'
import OrderAdd from '@/components/order/OrderAdd'

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
    },
    {
      path: '/OrderAdd',
      name: 'OrderAdd',
      component: OrderAdd
    }
  ]
})
