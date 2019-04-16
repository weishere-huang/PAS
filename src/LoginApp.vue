<template>
  <a-layout id="login-layout">
    <div class="login-wrap">
      <a-card title="生产排程系统-登录" :bordered="false">
        <p>
          <a-input placeholder="请输入您的登录账号/手机号/指定账号" v-model="user.userName" ref="userNameInput" class=''>
            <a-icon slot="prefix" type="user"/>
            <a-icon v-if="user.userName" slot="suffix" type="close-circle" />
          </a-input>
        </p>
        <p>
          <a-input type='password' placeholder="请输入密码" v-model="user.userPwd" ref="userNameInput">
            <a-icon slot="prefix" type="lock"/>
            <a-icon v-if="user.userPwd" slot="suffix" type="close-circle" />
          </a-input>
        </p>
        <p><a-button type="primary" block>登录</a-button></p>
      </a-card>
    </div>
  </a-layout>
</template>
<script>
import Vue from "vue";
import router from "./router";
import { Layout, Spin, Col, Row, Card,Input,Icon,Button } from "ant-design-vue";
Vue.component(Layout.name, Layout);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Spin.name, Spin);
Vue.component(Col.name, Col);
Vue.component(Row.name, Row);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);

export default {
  data() {
    return {
      user: {
        userName:'',
        userPwd:''
      }
    };
  },
  methods: {}
};
</script>
<style lang="less">
@import url("./assets/login.less");
</style>
