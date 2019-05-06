import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import OrderList from '@/components/order/OrderList'
import OrderAdd from '@/components/order/OrderAdd'
import OrderEdit from '@/components/order/OrderEdit'
import MyDevice from '@/components/equipment/index'
import DeviceCategory from '@/components/equipment/DeviceCategory'
import AddEquipment from '@/components/equipment/AddEquipment'
import EditEquipment from '@/components/equipment/EditEquipment'
import Organization from '@/components/organization/index'
import Employee from '@/components/system/employee'
import AddEmployee from '@/components/system/AddEmployee'
import EditEmployee from '@/components/system/EditEmployee'
import Admin from '@/components/system/admin/Admin'
import Authority from '@/components/system/authority/Authority'
import AddAuthority from '@/components/system/authority/AddAuthority'
import EditAuthority from '@/components/system/authority/EditAuthority'
import ProcessTypes from '@/components/system/processtypes/ProcessTypes'
import Subcontract from '@/components/system/subcontract/Subcontract'
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
      component: OrderList,
      children: [{
          path: 'OrderAdd',
          name: 'OrderAdd',
          component: OrderAdd
        },
        {
          path: 'OrderEdit/:id/',
          name: 'OrderEdit',
          component: OrderEdit
        },
      ]
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
    {
      path: '/Authority',
      name: 'Authority',
      component: Authority,
      children: [{
          path: 'AddAuthority',
          name: 'AddAuthority',
          component: AddAuthority
        },
        {
          path: 'EditAuthority/:id/',
          name: 'EditAuthority',
          component: EditAuthority
        }
      ]
    },
    {
      path: '/ProcessTypes',
      name: 'ProcessTypes',
      component: ProcessTypes
    },
    {
      path: '/Subcontract',
      name: 'Subcontract',
      component: Subcontract
    },
  ]
})
