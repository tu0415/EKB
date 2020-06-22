<template>
	<view class="register">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'注册'"></Back>
		<view class="cont">
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">手机号</text>
				<input type="number" class="f28" value="" v-model.trim="phone" placeholder="请输入手机号" />
			</view>
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">帐号</text>
				<input class="f28 " type="text" v-model.trim="account" placeholder="请设置帐号" />
			</view>
			<view class="f28 bg062B37 br10 item disJcsb mt20" style="padding-right: 10rpx;" >
				<view class="flexAI">
					<text class="flexAI">验证码</text>
					<input class="f28" type="number" v-model.trim="code" placeholder="请输入验证码" />
				</view>
				
				<text class="flex c00FFBA" v-if="!sendTime" @click="getCode">发送验证码</text>
				<text class="flex c00FFBA" v-else >{{time}}s重新获取</text>
			</view>
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">登录密码</text>
				<input class="f28" type="password" maxlength="16" v-model.trim="password" placeholder="请设置登录密码" />
			</view>
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">确认密码</text>
				<input class="f28" type="password" maxlength="16" v-model.trim="passwords" placeholder="请重新输入登录密码" />
			</view>
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">支付密码</text>
				<input class="f28" type="password" maxlength="6" @input="onKeyInput($event,1)" password v-model.trim="paycode" placeholder="请设置支付密码" />
			</view>
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">确认密码</text>
				<input class="f28" type="password" maxlength="6" @input="onKeyInput($event,2)" password v-model.trim="paycodes" placeholder="请重新输入支付密码" />
			</view>
			<view class="f28 bg062B37 br10 item flexAI mt20">
				<text class="flexAI">推荐人</text>
				<input class="f28" type="text" v-model.trim="referrer" placeholder="请输入推荐人号码" />
			</view>
			<view class="btn-box" @click="getRegister">
				<view class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60">
					注册
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from '@/components/back.vue'
	export default {
		name: 'register',
		data() {
			return {
				phone: '', // 电话号码
				account: '', // 账号
				code: '', // 短信验证码
				password: '', // 密码
				passwords: '', // 确认密码
				paycode: '', // 支付密码
				paycodes: '', // 确认支付密码
				referrer: '', // 推荐人
				time: 60, // 倒计时
				sendTime: false, // 定时器,
			}
		},
		components: {
			Back
		},
		onLoad(e) {
			 
		},
		methods: {
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

			// 发送短信验证码
			getCode() {
				let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
				if (!reg.test(this.phone)) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					});
					return false;
				}
				this.$http.quest(this.$API.login.code, "post", {tel: this.phone,type:2}).then(res => {
					this.send()
					if(res.code == 200) {
						uni.showToast({
							title: res.msg,
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
			
			// 注册
			getRegister() {
				let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				let payReg = /^\d{6}$/;
				if (!this.account) {
					uni.showToast({
						title: '账号不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.code) {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none'
					});
					return false;
				}
				if (!this.password.trim() || !pwdReg.test(this.password)) {
					uni.showToast({
						title: '密码必须由 6-16位字母、数字组成',
						icon: 'none'
					});
					return false;
				}
				
				if (!this.paycode.trim() || !payReg.test(this.paycodes)) {
					uni.showToast({
						title: '密码必须由 6位数字组成',
						icon: 'none'
					});
					return false;
				}
				if (this.password != this.passwords) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					});
					return false;
				}
				
				if (!this.referrer) {
					uni.showToast({
						title: '请输入推荐码',
						icon: 'none'
					});
					return false;
				}
				this.$http.quest(this.$API.login.register, "post", {
					userName: this.account,
					tel: this.phone,
					pwd: this.password,
					pwdQr: this.passwords,
					payPwd: this.paycode,
					payPwdQr: this.paycodes,
					tuijianma: this.referrer, // 推荐人
					card: this.code,
				}).then(res => {
					console.log(res)
					if(res.code == 200) {
						uni.showToast({title: res.msg,icon: 'none'});
						setTimeout(()=>{uni.navigateTo({url:"/pages/login/login"})},1000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
					console.log(res);
					//打印请求返回的数据
				
				}, error => {
					console.log(error);
				})
				
			},
			onKeyInput(event,index) {
				let i = event.target.value;
				let num = i.charAt(i.length - 1);
				var reg = new RegExp('^[0-9]*$');
				if (!reg.test(num)) {
					if(index == 1) {
						this.paycode =  '';
					} else {
						this.paycodes =  '';
					}
					
				} else {
					if(index == 1) {
						this.paycode = i;
					} else {
						this.paycodes = i;
					}
					
				}
				
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		.register {
			.cont {
				padding: 0 30rpx;

				.item {
					padding: 0 40rpx;
					height: 90rpx;

					text {
						width: 170rpx;
						height: 100%;
					}

					input {
						opacity: .5;
						height: 100%;
					}

				}

				.btn-box {
					padding: 0 20rpx;
				}
			}
		}
	}
</style>
