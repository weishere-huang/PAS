//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [
    {
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
        }]
    },
    {
        menu: '任务订单',
        permissionCode: 'order',
        icon: '&#xe602;',
        subMenu: [{
            menu: '订单新建',
            route: '/OrderAdd',
            key: 'orderAdd',
            permissionCode: 'orderAdd'
        },
        {
            menu: '订单管理',
            route: '/OrderList',
            key: 'orderList',
            permissionCode: 'orderList'
        }]
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
            }]
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
        }]
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
        }]
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
        }]
    }
]
