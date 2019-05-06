<template>
	<a-layout id="login-layout">
		<div class="login-wrap">
			<a-card title="生产排程系统-登录" :bordered="false">
				<p>
					<a-input placeholder="请输入您的登录账号/手机号/指定账号" v-model="user.userName" ref="userNameInput" class>
						<a-icon slot="prefix" type="user"/>
						<a-icon v-if="user.userName" slot="suffix" type="close-circle"/>
					</a-input>
				</p>
				<p>
					<a-input type="password" placeholder="请输入密码" v-model="user.userPwd" ref="userNameInput">
						<a-icon slot="prefix" type="lock"/>
						<a-icon v-if="user.userPwd" slot="suffix" type="close-circle"/>
					</a-input>
				</p>
				<p>
					<a-button type="primary" block @click="login">登录</a-button>
				</p>
			</a-card>
		</div>
	</a-layout>
</template>
<script>
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
import Vue from "vue";
import router from "./router";
import {
	Layout,
	Spin,
	Col,
	Row,
	Card,
	Input,
	Icon,
	Button
} from "ant-design-vue";
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
				userName: "",
				userPwd: ""
			}
		};
	},
	methods: {
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		login() {
			// this.submitForm('loginList')
			let pass = this.user.userPwd;
			pass = md5(pass);
			let key = "*chang_hong_device_cloud";
			let a = pass;
			pass = this.encryptByDES(a, key);
			// console.log(this.password);
			let qs = require("qs");
			let data = qs.stringify({
				params: this.user.userName,
				password: pass
			});
			this.Axios(
				{
					url: "/api-sso/user/login",
					params: data,
					type: "post",
					option: { enableMsg: false }
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						console.log(result);
            // this.$router.replace("/Dashboard");
            window.location.href = "/Dashboard";
					}
				},
				({ type, info }) => {
					if (info.code === 408) {
						this.$message.error("验证码错误");
					}
					if (info.code === 402) {
						this.$message.error("账号或密码错误");
					}
					if (info.code === 0) {
						this.$message.error("对不起，您的账户已被禁用");
					}
				}
			);
		}
	}
};
</script>
<style lang="less">
@import url("./assets/login.less");
</style>
