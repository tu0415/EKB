<template>
	<view class="login ">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<image class="logo-bg" src="/static/login/login_bg.png" mode=""></image>
		<view class="cont pr">
			<view class="logo-cont">
				<view class="logo m0 mt10">
					<image class="wh100" src="/static/login/logo.png" mode=""></image>
				</view>
				<view class="login-box f30 ">
					<view class="flexAI item-input bdbfff">
						<text class="flexAI">手机号</text>
						<input type="number" v-model.trim="phone" value="" />
					</view>
					<view class="disJcsbAc item-input bdbfff pr">
						<view class="flexAI" style="height: 100%;">
							<text class="flexAI">选择账号</text>
							<input type="text" v-model.trim="account" value="" disabled/>
						</view>
						<image class="wh60 ml20" src="/static/login/down.png" @click="getAccount" mode=""></image>
						<view class="select pb bg052B37" v-if="select" >
							<view v-for="(item,index) in list" :key="index" @click="dropDown(item)">{{item.user_name}}</view>
						</view>
					</view>
					<view class="disJcsbAc item-input bdbfff">
						<view class="flexAI" style="height: 100%;">
							<text class="flexAI">密码</text>
							<input type="password"  v-if="see" v-model.trim="password" />
							<input type="text" value="" v-else v-model.trim="password" />
						</view>
						<image class="wh60 ml20" @click="seeEvt" v-if="see" src="/static/login/me_see.png" mode=""></image>
						<image class="wh60 ml20" @click="seeEvt" v-else src="/static/login/see-no.png" mode=""></image>
					</view>
				</view>
				<view class="btn f36 c021E34 bg00FFBA flex br45" @click="login">
					登录
				</view>
				<view class="f28 flex" @click="goPassword">
					忘记密码 ?
				</view>
				<view class="f30 flex register">
					没有账号, 去<text class="c00FFBA ml10" @click="pushPage('/pages/login/register',2)">注册</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import * as types from "@/store/types";
	export default {
		name:'login',
		data() {
			return {
				phone:'',
				password:'',
				account:'',
				select:false,
				list:[],
				 see: true,
			}
		},
		onShow() {
			// this.getAccount()
			
		},
		computed:{
		
			
		},
		methods:{
			 seeEvt() {
			            this.see = !this.see;
			        },
			goRegister() {
				uni.navigateTo({
					url:'/pages/login/register'
				})
			},
			goPassword() {
				uni.navigateTo({
					url:'/pages/login/changePassword'
				})
			},
			
			dropDown(item) {
				this.account = item.user_name
				this.select = false
				this.info = item
			},
			// 获取账号
			getAccount() {
				let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
				if (!reg.test(this.phone)) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					});
					return false;
				}
				this.$http.quest(this.$API.login.accounts, "post", {tel: this.phone,}).then(res => {
					console.log(res)
					if(res.code == 200) {
						if(res.data.length > 0) {
							this.select = true
						} else {
							uni.showToast({title: '该用户未注册',icon: 'none'});
						}
						this.list = res.data
						console.log(this.list)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}, error => {
					console.log(error);
				})
				
				
			},
			
			
 			 login() {
				
				let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
				if (!reg.test(this.phone)) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					});
					return false;
				}
				if (!this.account) {
					uni.showToast({
						title: '账号不正确',
						icon: 'none'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none'
					});
					return false;
				}
			  this.$http.quest(this.$API.login.login, "post", {
					userName: this.account,
					tel: this.phone,
					pwd: this.password,
				}).then(res => {
					if(res.code == 200) {
						uni.showToast({title: res.msg,icon: 'none'});
						// this.$store.commit(types.USER_INFO, res.token);
						uni.setStorageSync('token', res.data.token)
						uni.setStorageSync('mobile', this.phone)
						uni.switchTab({url:'/pages/index/index'})
						
					}else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
					//打印请求返回的数据
				
				}, error => {
					console.log(error);
				})
				
			}
  		}
	}
</script>

<style scoped lang="less">
	page{
		height: 100%;
		.login {
			height: 100%;
			.cont {
				height: 100%;
				
				.logo-cont {
					width: 80%;
					margin: 0 auto;
					position: absolute;
					left: 50%;
					top: 10%;
					// #ifdef APP-PLUS
					margin-top: 100rpx;
					// #endif
					transform: translateX(-50%);
					.logo {
						width: 170rpx;
						height: 170rpx;
					}
					.login-box {
						margin-top: 100rpx;
						.item-input {
							height: 100rpx;
							text {
								height: 100%;
								width: 150rpx;
								opacity: .5;
							}
							input {
								height: 100%;
							}
						}
						.select {
							right: 0;
							top: 112rpx;
							width: 80%;
							border-radius: 10rpx;
							z-index: 10;
							view {
								padding-left: 20rpx;
								height: 80rpx;
								line-height: 80rpx;
							}
						}
					}
					.btn {
						height: 90rpx;
						margin: 90rpx 0 50rpx;
					}
					.register {
						margin-top: 200rpx;
					}
				}
				
			}
		}
		.logo-bg {
			position: fixed;
			top: 0;
			right: 0;
			width: 100%;
			min-height: calc(100vh - var(--window-top) - var(--window-bottom));
		}
	}
</style>
