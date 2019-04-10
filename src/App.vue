<template>
  <a-layout id="components-layout">
    <a-layout-header class="header">
      <div class="logo">
        <p>生产计划排程系统</p>Changhong
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">工作台</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        collapsedWidth="80"
        style="background: #fff"
        defaultCollapsed
        collapsible
        v-model="collapsed"
      >
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
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
      <a-layout style="padding: 0 24px 24px">
        <div class="main-tabs">
          <ul>
            <li
              v-for="(item,index) in tabsList"
              v-bind:class="{ active: item.active}"
              @click="switchTab(item.key)"
            >
              <span>{{item.title}}</span>
              <a-icon type="close"/>
            </li>
          </ul>
        </div>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import Vue from "vue";
//import './assets/font.css';
import { Layout, Menu, Breadcrumb } from "ant-design-vue";
import menuSourceMap from "./router/routeMap";
import clone from "clone";
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);
const global = window;
export default {
  data() {
    return {
      collapsed: true,
      menuSource: [],
      tabsList: [
        { key: "orderList", title: "订单管理", url: "/OrderList", active: false }
      ]
    };
  },
  methods: {
    switchTab(key) {
      //先检查tabsList
      let chooseMenu = this.tabsList.find(item => item.key == key);
      if (!chooseMenu) {
        //从menuSourceMap取得
        menuSourceMap.forEach(menu => {
          let m = menu.subMenu.find(i => i.key === key);
          if (m) chooseMenu = m;
        });
        if (chooseMenu)
          this.tabsList.push({
            key: chooseMenu.key,
            title: chooseMenu.menu,
            url: "",
            active: true
          });
      }
      if (chooseMenu) window.location.hash = chooseMenu.key;
      //this.$router.push({ path: chooseMenu.url });
    },
    initPermission() {
      const permissionUrl = [];
      let _menuSource = [];
      clone(menuSourceMap).forEach(per => {
        if (per.defaultDock) {
          _menuSource.push(per);
        } else {
          const willShowMenu = per.subMenu.filter(m => {
            if (m.visible) {
              return false;
            }
            return true;
            // return permissionUrl.find(p => p.module === m.permissionCode)
            //   ? true
            //   : false;
          });
          if (willShowMenu.length !== 0) {
            per.subMenu = willShowMenu;
            _menuSource.push(per);
          }
        }
      });
      this.menuSource = _menuSource;
    }
  },
  mounted() {
    const hash = location.hash
      ? location.hash.substring(1, location.hash.length)
      : "";
    if (hash) {
      window.location.hash = "";
      this.switchTab(hash);
    }
  },
  created() {
    this.initPermission();
    const that = this;
    global.onhashchange = () => {
      const hash = location.hash.substring(1, location.hash.length);
      const menuItem = that.tabsList.find(i => i.key === hash);
      if (menuItem) {
        const arr = clone(that.tabsList);
        arr.forEach(item => {
          item.active = item.key === menuItem.key ? true : false;
        });
        that.tabsList = arr;
      }
    };
  }
};
</script>

<style lang="less">
@import url("./assets/font.css");
#components-layout {
  height: 100%;
  .logo {
    width: 120px;
    margin: 16px 28px 16px 0;
    float: left;
    line-height: 20px;
    color: #cfcfcf;
    text-align: center;
    p {
      margin: 0;
      border-bottom: solid 1px #cfcfcf;
    }
  }
  .main-tabs {
    height: 48px;
    ul {
      float: left;
      padding: 0;

      list-style: none;
      li {
        -webkit-transition: all 0.1s ease-out;
        position: relative;
        float: left;
        min-width: 120px;
        padding: 0 30px;
        height: 40px;
        margin: 5px 5px auto 0;
        border: solid 1px #f0f0f0;
        text-align: center;
        line-height: 40px;
        cursor: default;
        color: #999;
        &:hover {
          background: #fff;
          color: #333;
          i {
            //display: block;
            opacity: 1;
          }
        }
        &.active {
          height: 43px;
          background: #fff;
          border: solid 1px #eee;
          border-bottom: 0;
          color: #333;
          &:hover {
            background: #fff;
          }
        }
        i {
          position: absolute;
          //display: none;
          opacity: 0.2;
          right: 5px;
          top: 11px;
          -webkit-transition: all 0.3s ease-out;
          padding: 2px;
          &:hover {
            background: #eee;
            border-radius: 100%;
            //-webkit-transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>
