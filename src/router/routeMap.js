//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [{
    menu: '工作台',
    permissionCode: 'mainDashboard',
    icon: '&#xe60a;',
    subMenu: [{
        menu: '工作台',
        route: '/Dashboard',
        key: 'dashboard',
        permissionCode: 'dashboard',
        defaultDock: true
      },
      {
        menu: '生产监控台',
        route: '/Dashboard/progress',
        key: 'progressDashboard',
        permissionCode: 'progressDashboard'
      }
    ]
  },
  {
    menu: '任务订单',
    permissionCode: 'order',
    icon: '&#xe602;',
    subMenu: [{
        menu: '订单新建',
        route: '/OrderList/OrderAdd',
        key: 'orderAdd',
        visible: true,
        permissionCode: 'orderAdd'
      },
      {
        menu: '修改订单',
        routeReg: /^\/OrderList\/OrderEdit\/\d{1,}$/i,
        key: 'orderEdit',
        visible: true,
        permissionCode: 'orderEdit'
      },
      {
        menu: '订单管理',
        route: '/OrderList',
        key: 'orderList',
        permissionCode: 'orderList'
      }
    ]
  },
  {
    menu: '工作令',
    permissionCode: 'workOrder',
    icon: '&#xe63c;',
    subMenu: [{
        menu: '工作令管理',
        route: '/WorkOrderList',
        key: 'workOrderList',
        permissionCode: 'workOrderList'
      }, {
        menu: '工作令新建',
        route: '/WorkOrderAdd',
        key: 'workOrderAdd',
        permissionCode: 'workOrderAdd'
      },
      {
        menu: '移交单管理',
        routeReg: /^\/workOrder\/transferOrder\/\d{1,}$/i,
        key: 'transferOrder',
        permissionCode: 'transferOrder'
      }
    ]
  },
  {
    menu: '生产设备',
    permissionCode: 'device"',
    icon: '&#xe61c;',
    subMenu: [{
        menu: '我的设备',
        route: '/MyDevice',
        key: 'myDevice',
        permissionCode: 'myDevice'
      },
      {
        menu: '添加设备',
        route: '/MyDevice/AddEquipment',
        key: 'addEquipment',
        visible: true,
        permissionCode: 'addEquipment'
      },
      {
        menu: '修改设备',
        routeReg: /^\/MyDevice\/EditEquipment\/\d{1,}$/i,
        key: 'editEquipment',
        visible: true,
        permissionCode: 'editEquipment'
      },
      {
        menu: '设备分类',
        route: '/DeviceCategory',
        key: 'deviceCategory',
        permissionCode: 'deviceCategory'
      },
      {
        menu: '设备监控',
        route: '/Monit',
        key: 'monit',
        permissionCode: 'monit'
      },
      {
        menu: '设备绑定',
        route: "/DeviceAdd",
        key: 'deviceAdd',
        permissionCode: 'deviceAdd'
      }
    ]
  },
  {
    menu: '工艺卡片',
    permissionCode: 'processCard',
    icon: '&#xe613;',
    subMenu: [{
        menu: '工艺卡片新建',
        route: '/ProcessCardAdd',
        key: 'processCardAdd',
        permissionCode: 'processCardAdd'
      },
      {
        menu: '工艺卡片管理',
        route: '/ProcessCardList',
        key: 'processCardList',
        permissionCode: 'processCard'
      }
    ]
  },
  {
    menu: '图纸管理',
    permissionCode: 'drawingsManager',
    icon: '&#xe704;',
    subMenu: [{
        menu: '图纸库',
        route: '/DrawingsList',
        key: 'drawingsList',
        permissionCode: 'drawings'
      },
      {
        menu: '图纸新增',
        route: '/DrawingsAdd',
        key: 'drawingsAdd',
        permissionCode: 'drawingsAdd'
      }
    ]
  },
  {
    menu: '生产记录',
    permissionCode: 'history',
    icon: '&#xe915;',
    subMenu: [{
        menu: '生产记录管理',
        route: '/HistoryList',
        key: 'historyList',
        permissionCode: 'historyList'
      },
      {
        menu: '生产报表',
        route: '/Report',
        key: 'report',
        permissionCode: 'report'
      }
    ]
  },
  {
    menu: '系统配置',
    permissionCode: 'system',
    icon: '&#xe915;',
    subMenu: [{
        menu: '委外加工',
        route: '/Subcontract',
        key: 'Subcontract',
        permissionCode: 'Subcontract'
      },
      {
        menu: '工序类型',
        route: '/ProcessTypes',
        key: 'ProcessTypes',
        permissionCode: 'ProcessTypes'
      },
      {
        menu: '组织构架',
        route: '/Organization',
        key: 'organization',
        permissionCode: 'organization'
      },
      {
        menu: '管理员',
        route: '/Admin',
        key: 'Admin',
        permissionCode: 'Admin'
      },
      {
        menu: '员工',
        route: '/Employee',
        key: 'employee',
        permissionCode: 'employee'
      },
      {
        menu: '员工添加',
        route: '/Employee/AddEmployee',
        key: 'addEmployee',
        visible: true,
        permissionCode: 'addEmployee'
      },
      {
        menu: '员工修改',
        routeReg: /^\/Employee\/EditEmployee\/\d{1,}$/i,
        key: 'editEmployee',
        visible: true,
        permissionCode: 'editEmployee'
      },
      {
        menu: '角色权限',
        route: '/Authority',
        key: 'authority',
        permissionCode: 'authority'
      }, {
        menu: '权限添加',
        route: '/Authority/AddAuthority',
        key: 'addEmployee',
        visible: true,
        permissionCode: 'addEmployee'
      }, {
        menu: '权限修改',
        routeReg: /^\/Authority\/EditAuthority\/\d{1,}$/i,
        key: 'editEmployee',
        visible: true,
        permissionCode: 'editEmployee'
      },
    ]
  }
]
