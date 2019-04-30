<template>
	<a-locale-provider :locale="zh_CN">
		<a-layout id="components-layout">
			<a-layout-header class="header">
				<a-row>
					<a-col :span="20">
						<div class="logo">
							<p>生产计划排程系统</p>Changhong
						</div>
						<a-menu theme="dark" mode="horizontal" class="header-menu" :selectable="false">
							<a-menu-item
								v-for="(item,index) in headerMenuGroup"
								:key="index"
								@click="switchTab(item.key)"
							>
								<span>
									<i class="iconfont anticon" v-html="item.icon"></i>
									<br>
									{{item.menu}}
								</span>
							</a-menu-item>
						</a-menu>
					</a-col>
					<a-col :span="4" class="header-user">
						<router-link to="user/profile">Administrator</router-link>

						<router-link to="user/msg">
							<a-tooltip placement="bottom">
								<template slot="title">
									<span>您有20条待办事项</span>
								</template>
								<a-badge dot>
									<a-icon class="weak" type="notification"/>
								</a-badge>
							</a-tooltip>
						</router-link>

						<router-link to="user/logout">
							<a-tooltip placement="bottom">
								<template slot="title">
									<span>退出系统</span>
								</template>
								<a-icon type="logout"/>
							</a-tooltip>
						</router-link>
					</a-col>
				</a-row>
			</a-layout-header>
			<a-layout>
				<a-layout-sider
					width="200"
					collapsedWidth="60"
					style="background: #fff"
					defaultCollapsed
					collapsible
					v-model="collapsed"
				>
					<a-menu mode="inline" :selectable="false" :style="{ height: '100%', borderRight: 0 }">
						<a-sub-menu :key="menu.permissionCode" v-for="(menu,index) in menuSource">
							<span slot="title">
								<i class="iconfont anticon" v-html="menu.icon"></i>
								<span>{{menu.menu}}</span>
							</span>
							<a-menu-item
								:key="sub_menu.key"
								v-for="(sub_menu,index2) in menu.subMenu"
								@click="switchTab(sub_menu.key)"
							>{{sub_menu.menu}}</a-menu-item>
						</a-sub-menu>
					</a-menu>
				</a-layout-sider>
				<a-layout style="padding: 0px 12px 0 12px;">
					<div class="main-tabs">
						<ul>
							<li
								v-for="(item,index) in tabsList"
								v-bind:class="{ active: item.active}"
								@click="switchTab(item.key)"
								:key="index"
							>
								<span>{{item.title}}</span>
								<a-icon @click.stop="closeTab(item.key)" type="close"/>
							</li>
						</ul>
						<a-button style="float:right;margin-top:8px" shape="circle" @click="reload" icon="redo"/>
					</div>

					<a-layout-content
						:style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
					>
						<center v-if="!isShow">
							<a-spin/>
						</center>
						<keep-alive :include="cachedViews">
							<router-view v-if="isShow"/>
						</keep-alive>
					</a-layout-content>
				</a-layout>
			</a-layout>
			<a-layout-footer>Production planning and scheduling system (V1.1.1_{{version?(new Date(version).format("yyMMdd")):'0'}}_{{node_dev}}) ©2019 Created by Changhong Intelligent Manufacturing</a-layout-footer>
		</a-layout>
	</a-locale-provider>
</template>
<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import Vue from "vue";
import router from "./router";
//import './assets/font.css';
import {
	Layout,
	Menu,
	Breadcrumb,
	Spin,
	Col,
	Row,
	Badge,
	Tooltip
} from "ant-design-vue";
import menuSourceMap from "./router/routeMap";
import clone from "clone";
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);
Vue.component(Spin.name, Spin);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Badge.name, Badge);
Vue.component(Tooltip.name, Tooltip);

const global = window;
export default {
	data() {
		return {
			zh_CN,
			collapsed: false,
			menuSource: [],
			isShow: true,
			cachedViews: [],
			version: versionInfo,
			node_dev: process.env.NODE_ENV,
			tabsList: [
				{
					key: "dashboard",
					title: "工作台",
					route: "/Dashboard",
					active: true
				}
			],
			headerMenu: [
				"dashboard",
				"orderList",
				"workOrderList",
				"myDevice",
				"drawingsList",
				"processCardList"
			],
			headerMenuGroup: []
		};
	},
	methods: {
		switchTab(key, path) {
			//先检查tabsList
			let chooseMenu = this.tabsList.find(item => item.key == key);
			if (!chooseMenu) {
				//从menuSourceMap取得
				let _m = null;
				menuSourceMap.forEach(menu => {
					let m = menu.subMenu.find(i => i.key === key);
					if (m) _m = m;
				});
				if (_m) {
					chooseMenu = {
						key: _m.key,
						title: _m.menu,
						route: _m.route,
						active: true
					};
					this.tabsList.push(chooseMenu);
				}
			}
			const arr = clone(this.tabsList);
			arr.forEach(item => {
				item.active = item.key === chooseMenu.key ? true : false;
			});
			this.tabsList = arr;
			//if (chooseMenu) window.location.hash = chooseMenu.key;
			this.$router.push({ path: path ? path : chooseMenu.route });
		},
		closeTab(key) {
			let chooseMenu = this.tabsList.find(item => item.key == key);
			const index = this.tabsList.indexOf(chooseMenu);
			this.tabsList = this.tabsList.filter(item => item.key !== key);
			if (this.tabsList.length === 0 || !chooseMenu.active) {
				return;
			}
			if (index > 0) {
				this.switchTab(this.tabsList[index - 1].key);
			} else {
				this.switchTab(this.tabsList[index].key);
			}
		},
		reload() {
			//重新加载组件
			const _tabsList = clone(this.tabsList);
			this.isShow = false;
			this.tabsList = this.tabsList.filter(item => !item.active);
			window.setTimeout(() => {
				this.tabsList = _tabsList;
				this.isShow = true;
			}, 100);
		},
		initPermission() {
			const permissionUrl = [];
			let _menuSource = [];
			clone(menuSourceMap).forEach(per => {
				if (per.defaultDock) {
					_menuSource.push(per);
				} else {
					const willShowMenu = per.subMenu.filter(m => {
						if (m.visible) return false;
						return true;
					});
					if (willShowMenu.length !== 0) {
						per.subMenu = willShowMenu;
						_menuSource.push(per);
					}
				}
			});
			this.menuSource = _menuSource;
		},
		initHeaderMenu() {
			let _headerMenuGroup = []; //clone(this.headerMenuGroup);
			const _headerMenu = this.headerMenu;
			menuSourceMap.forEach(item => {
				let obj = item.subMenu.find(menu => {
					return _headerMenu.find(i => i === menu.key) ? true : false;
				});
				if (obj) {
					obj["icon"] = item.icon;
					_headerMenuGroup.push(obj);
				}
			});
			this.headerMenuGroup = _headerMenuGroup;
		}
	},
	mounted() {
		const hash = this.$route.path;
		for (let i = 0, l = menuSourceMap.length; i < l; i++) {
			for (let m = 0, n = menuSourceMap[i].subMenu.length; m < n; m++) {
				let isRoute = menuSourceMap[i].subMenu[m].routeReg
					? menuSourceMap[i].subMenu[m].routeReg.test(this.$route.fullPath)
					: menuSourceMap[i].subMenu[m].route === this.$route.path
					? true
					: false;
				if (isRoute) {
					this.switchTab(menuSourceMap[i].subMenu[m].key, this.$route.path);
				}
			}
		}
	},
	watch: {
		$route() {},
		tabsList() {
			this.cachedViews = this.tabsList.map(item => item.key);
		}
	},
	created() {
		this.initPermission();
		this.initHeaderMenu();
	}
};
</script>

<style lang="less">
@import url("./assets/font.css");
@import url("./assets/layout.less");
.ant-layout-content {
	overflow: scroll;
}
body {
	min-width: 1200px;
}
</style>
