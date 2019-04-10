//主要为全部菜单结构和权限的配置，visible=true不在菜单显示，defaultDock=true会跳过lookUp权限默认在菜单显示
//permissionCode为权限映射码，若permissionCode未对应到用户权限则不显示也无跳转访问权限
//route和routeReg为匹配路由，二者必须有一个，若都有则为“或”逻辑
export default [
    {
        menu: '工作台',
        permissionCode: 'mainDashboard',
        icon: '&#xe601;',
        subMenu: [{
            menu: '工作台',
            route: '/Dashboard',
            key:'dashboard',
            permissionCode: 'dashboard'
        }]
    },
    {
        menu: '任务订单',
        permissionCode: 'orderManager',
        icon: '&#xe601;',
        subMenu: [{
            menu: '订单新建',
            route: '/OrderAdd',
            key:'orderAdd',
            permissionCode: 'orderAdd'
        },
        {
            menu: '订单管理',
            route: '/OrderList',
            key:'orderList',
            permissionCode: 'orderList'
        }]
    },
    {
        menu: '生产设备',
        permissionCode: 'device"',
        icon: '&#xe61c;',
        subMenu: [{
            menu: '我的设备',
            route: '/MyDevice',
            key:'myDevice',
            permissionCode: 'myDevice'
        },
        {
            menu: '设备分类',
            route: '/DeviceCategory',
            key:'deviceCategory',
            permissionCode: 'deviceCategory'
        },
        {
            menu: '设备监控',
            route:'/Monit',
            key:'monit',
            permissionCode: 'monit'
        },
        {
            menu: '设备绑定',
            route: "/DeviceAdd",
            key:'deviceAdd',
            permissionCode: 'deviceAdd'
        }
        ]
    }
]
