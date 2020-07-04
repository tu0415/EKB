<template>
	<view class="register">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'修改支付密码'"></Back>
		<view class="cont ml30 mr30">
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">手机号</text>
				<input type="number" class="f28" v-model.trim="phone"  placeholder="请输入手机号" />
			</view>
			<view class="f28 bgcfff br10 item disJcsbAc mt20 pr" style="padding-right: 10rpx;" >
				<view class="flexAI" style="height: 100%;">
					<text class="flexAI">选择账号</text>
					<input class="f28" type="text" v-model.trim="account" placeholder="请输入验证码" />
				</view>
				<image class="wh60 ml20" src="/static/login/down.png" @click="getAccount" mode=""></image>
				<view class="select pb" v-if="select" style="background-color: #E5E5E5;">
					<view v-for="(item,index) in list" :key="index" @click="dropDown(item)">{{item.user_name}}</view>
				</view>
			</view>
			<view class="f28 bgcfff br10 item disJcsbAc mt20 " style="padding-right: 10rpx;" >
				<view class="flexAI" style="height: 100%;">
					<text class="flexAI">验证码</text>
					<input class="f28" type="number" v-model.trim="code" placeholder="请输入验证码" />
				</view>
				<text class="flex c00FFBA" v-if="!sendTime" @click="getCode">发送验证码</text>
				<text class="flex" v-else >{{time}}s重新获取</text>
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">新密码</text>
				<input class="f28" type="password" @input="onKeyInput($event, 1)"  v-model.trim="password" maxlength="6" placeholder="请设置支付密码" />
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">新密码</text>
				<input class="f28" type="password" @input="onKeyInput($event, 2)"  v-model.trim="newpasssword" maxlength="6" placeholder="请确认支付密码" />
			</view>
			<view class="btn-box" @click="changpasswordEvt">
				<view class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60 cfff">
					修改密码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from '@/components/back.vue'
	export default {
		name:'register',
		data() {
			return {
				phone:"",
				code:'',
				password:'',
				newpasssword:'',
				time: 60, // 倒计时
				sendTime: false, // 定时器,
				select:false,
				list:[],
				account:''
			}
		},
		
		components:{
			Back
		},
		methods:{
			dropDown(item) {
				this.account = item.user_name
				this.select = false
				// this.info = item
			},
			// 验证码倒计时
			send() {
				this.sendTime = true;
				let interval = setInterval(() => {
					if (this.time-- <= 0) {
						this.time = 60;
						this.sendTime = false;
						clearInterval(interval);
					}
				}, 1000);
			},
			getCode() {
				let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
				if (!reg.test(this.phone)) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					});
					return false;
				}
				this.send()
				this.$http.quest(this.$API.login.code, "post", {tel: this.phone,type:2}).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '验证码发送成功',
							icon: 'none'
						});
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
			
			changpasswordEvt() {
				let pwdReg = /^\d{6}$/;
				if (!this.code) {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.password.trim() || !pwdReg.test(this.password)) {
					uni.showToast({
						title: '密码6纯数字组成',
						icon: 'none'
					});
					return false;
				}
				
				if (this.password != this.newpasssword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return false;
				}
				
				this.$http.quest(this.$API.login.resetPassword, "post", {
					tel: this.phone,
					payPwd: this.password,
					payPwdQr: this.newpasssword,
					card: this.code,
					userName:this.account
				}).then(res => {
					if(res.code == 200) {
						uni.switchTab({url:'/pages/user/index'})
						uni.showToast({title: res.msg,icon:'none'})
					} else {
						uni.showToast({title:res.msg,icon:'none'})
					}
				}, error => {
					console.log(error);
				})
				
			},
			onKeyInput(event, index) {
				let i = event.target.value;
				let num = i.charAt(i.length - 1);
				console.log(num)
				var reg = new RegExp('^[0-9]*$');
				if (!reg.test(num)) {
					if (index == 1) {
						this.password = '';
					} else {
						this.newpasssword = '';
					}
				} else {
					if (index == 1) {
						this.password = i;
					} else {
						this.newpasssword = i;
					}
				}
			}
		}
	}
</script>

<style scoped lang="less">
	page{
		.register {
			.cont {
				// padding: 0 30rpx;
				.item {
					padding: 0 40rpx;
					height: 90rpx;
					text {
						width: 160rpx;
						height: 100%;
					}
					input {
						opacity: .5;
						height: 100%;
					}
					.select {
						right: 0;
						top: 100rpx;
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
				.btn-box {
					padding: 0 20rpx;
				}
			}
		}
	}
</style>
