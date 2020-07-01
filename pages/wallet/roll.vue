<template>
	<view class="roll">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'提币'"></Back>
		<view class="cont">
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">提币地址</text>
				<input type="text" class="flex1 f28" v-model.trim="walletAddress" placeholder="请输入提币地址" />
			</view>
			<!-- <view class="f28 bg1E3 br10 item flexAI mt20 pr" >
				<text class="flexAI">提币类型</text>
				<input class="f28 flex1" type="text" v-model.trim="type" placeholder="请输入提币数量" disabled/>
				<image class="wh60 ml20" src="/static/login/down.png" @click="getAccount" mode=""></image>
				<view class="select pb " v-if="select" >
					<view class="item" v-for="(item,index) in list" :key="index" @click="dropDown(item)">{{item.name}}</view>
				</view>
			</view> -->
			<view class="f28 bgcfff br10 item flexAI mt20" >
				<text class="flexAI" style="width: 160rpx;">提币数量</text>
				<input class="f28" type="number" v-model.trim="account" placeholder="请输入提币数量" />
			</view>
			<view class="f28 bgcfff br10 item flexJC mt20" style="padding-right:20rpx;">
				<view class="flexAI">
					<text class="flexAI" style="width: 160rpx;">到账数量</text>
					<input class="f28 " type="number" v-model.trim="getNum" placeholder="" />
				</view>
				<text class="flexAI opacity5" style="justify-content: flex-end;">手续费{{service}}%</text>
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI" style="width: 160rpx;">支付密码</text>
				<input class="f28" type="password" v-model.trim="password" placeholder="请输入支付密码" />
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20" style="padding-right: 10rpx;">
				<text class="flexAI" style="width: 160rpx;">短信验证</text>
				<input class="f28" type="text" v-model.trim="smsCode" placeholder="请输入验证码" />
				<text class="flex c00FFBA" v-if="!sendTime" @click="getCode">发送验证码</text>
				<text class="flex c00FFBA" v-else >{{time}}s重新获取</text>
			</view>
			<view class="btn-box" >
				<button class="btn f36 c021E34 bg00FFBA cfff flex br45 h90 mt60" :disabled="disabled" @click="getTransform">
					确定提币
				</button>
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
				account: '',
				password: '',
				smsCode: '',
				walletAddress: '',
				time: 60, // 倒计时
				sendTime: false, // 定时器,
				select:false,
				type:'账户余额',
				bzId:'',
				service:'',
				disabled:false
			}
		},
		components: {
			Back
		},
		onLoad(e) {
			this.bzId = JSON.parse(e.data).id
			this.service = JSON.parse(e.data).service
		},
		computed:{
			getNum() {
				return this.account - this.account * (this.service / 100)
			}
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
			getAccount() {
				this.select = true
			},
			
			// dropDown(item) {
			// 	this.type = item.name
			// 	this.select = false
			// 	this.types = item.id
			// },
			
			reg() {
				if (!this.walletAddress) {
					uni.showToast({
						title: '请输入提币地址',
						icon: 'none'
					});
					return false;
				}
				if (!this.account) {
					uni.showToast({
						title: '请输入金额',
						icon: 'none'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					});
					return false;
				}
			},
			
			// 发送短信验证码
			getCode() {
				if (!this.walletAddress) {
					uni.showToast({
						title: '请输入提币地址',
						icon: 'none'
					});
					return false;
				}
				if (!this.account) {
					uni.showToast({
						title: '请输入金额',
						icon: 'none'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					});
					return false;
				}
				
				this.$http.quest(this.$API.login.code, "post", {tel: uni.getStorageSync('mobile'),type:2}).then(res => {
					if(res.code == 200) {
						this.send()
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
			
			getTransform() {
				
				if (!this.walletAddress) {
					uni.showToast({
						title: '请输入提币地址',
						icon: 'none'
					});
					return false;
				}
				if (!this.account) {
					uni.showToast({
						title: '请输入金额',
						icon: 'none'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入支付密码',
						icon: 'none'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return false;
				}
				
				if (!this.smsCode) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return false;
				}
				let parameter = {
					num: this.account, // 金额
					payPwd: this.password, // 支付密码
					card: this.smsCode,
					address: this.walletAddress,
					bzId:this.bzId,
				}
				this.disabled = true
				this.$http.questToken(this.$API.wellet.tibiMethod, 'post', parameter).then(res => {
					this.disabled = false
					if (res.code == 200) {
						uni.showToast({title:res.msg,icon:'none'})
						setTimeout(()=>{uni.switchTab({
							url:'/pages/index/index'
						})},1000)
						this.walletAddress = ''
						this.account = ''
						this.password = ''
						this.smsCode = ''
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				},error =>{
					
				})
			}
		}
	
	}
</script>

<style scoped lang="less">
	page {
		.roll {
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
					.select {
						right: 60rpx;
						top: 80rpx;
						width: 440rpx;
						padding: 20rpx 0;
						background-color: #041F36;
						padding-left: 20rpx;
						z-index: 100;
						.item {
							height: 80rpx;
						}
						.close {
							right: 20rpx;
							top: 20rpx;
							width: 40rpx;
							height: 40rpx;
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
