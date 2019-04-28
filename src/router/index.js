import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import OrderList from '@/components/order/OrderList'
import OrderAdd from '@/components/order/OrderAdd'
import MyDevice from '@/components/equipment/index'
import DeviceCategory from '@/components/equipment/DeviceCategory'
import AddEquipment from '@/components/equipment/AddEquipment'
import EditEquipment from '@/components/equipment/EditEquipment'
import Organization from '@/components/organization/index'
import Employee from '@/components/system/employee'
import AddEmployee from '@/components/system/AddEmployee'
import EditEmployee from '@/components/system/EditEmployee'
import Admin from '@/components/system/admin/Admin'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
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
    },
    {
      path: '/MyDevice',
      name: 'MyDevice',
      component: MyDevice,
      children: [{
          path: 'AddEquipment',
          name: 'AddEquipment',
          component: AddEquipment
        },
        {
          path: 'EditEquipment/:id/',
          name: 'EditEquipment',
          component: EditEquipment
        }
      ]
    },
    {
      path: '/DeviceCategory',
      name: 'DeviceCategory',
      component: DeviceCategory
    },
    {
      path: '/Organization',
      name: 'Organization',
      component: Organization
    },
    {
      path: '/Employee',
      name: 'Employee',
      component: Employee,
      children: [{
          path: 'AddEmployee',
          name: 'AddEmployee',
          component: AddEmployee
        },
        {
          path: 'EditEmployee/:id/',
          name: 'EditEmployee',
          component: EditEmployee
        }
      ]
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    },
  ]
})
