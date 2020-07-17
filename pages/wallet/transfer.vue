<template>
	<view class="transfer">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'转账'"></Back>
		<view class="cont">
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">转账会员</text>
				<input type="text " class="flex1 f28" v-model.trim="walletAddress" placeholder="请输入转账会员账号" />
			</view>
			<!-- <view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">手续费</text>
				<input type="text " class="flex1 f28" v-model.trim="service"  disabled/>
			</view> -->
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">转账数量</text>
				<input class="f28" type="number" v-model.trim="account" placeholder="请输入转账数量" />
			</view>
			<view class="f28 bgcfff br10 item disJcsbAc mt20" style="padding-right:20rpx;">
				<view class="flexAI">
					<text class="flexAI" style="width: 170rpx;">需消耗</text>
					<input class="f28 " type="number" disabled v-model.trim="getNum" placeholder="" />
				</view>
				<view class="flexAI opacity5" style="justify-content: flex-end;">EKB</view>
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">支付密码</text>
				<input class="f28" type="password" maxlength="6" password @input="onKeyInput($event)" v-model.trim="password" placeholder="请输入支付密码" />
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20" style="padding-right: 0;" >
				<view class="flexAI">
					<text class="flexAI">短信验证</text>
					<input class="f28" type="number" v-model.trim="smsCode" placeholder="请输入验证码" />
				</view>
				<text class="flex c00FFBA" v-if="!sendTime" @click="getCode">发送验证码</text>
				<text class="flex c00FFBA" v-else >{{time}}s重新获取</text>
			</view>
			<view class="btn-box">
				<button :disabled="disabled" class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60 cfff"  @click="getTransform">
					确定
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from '@/components/back.vue'
	import {mapState} from "vuex"
	export default {
		name:'register',
		data() {
			return {
				account: '',
				password: '',
				smsCode: '',
				walletAddress: '',
				time: 60, // 倒计时
				sendTime: false, // 定时器,
				service:"",
				id:'',
				zzBili:'',
				disabled:false
			}
		},
		components: {
			Back
		},
		onLoad(e) {
			this.id = JSON.parse(e.data).id
			this.zzBili = JSON.parse(e.data).zzBili
		},
		computed:{
		   getNum() {
			   return Number(this.account * this.zzBili / 100)
		   }
		 },
		onShow() {
			// this.getAsset()
			// this.walletAddress = this.address
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
				if (!this.walletAddress) {
					uni.showToast({
						title: '请输入钱包地址',
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
				this.disabled = true
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
					this.disabled = false
							
				}, error => {
					console.log(error);
				})
			},
			
			getTransform() {
				let parameter = {
					num: this.account, // 金额
					userName: this.walletAddress, 
					payPwd: this.password, // 支付密码
					card: this.smsCode,
					bzId:this.id
				}
				if(this.id != 4) {
					this.$http.questToken(this.$API.wellet.transfer, 'post', parameter).then(res => {
						if (res.code == 200) {
							uni.showToast({title: res.msg,icon: 'none'});
							setTimeout(()=>{uni.switchTab({
								url:'/pages/index/index'
							})},1000)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					})
				} else {
					this.$http.questToken(this.$API.wellet.zzJkfScMethod, 'post', parameter).then(res => {
						if (res.code == 200) {
							uni.showToast({title: res.msg,icon: 'none'});
							setTimeout(()=>{uni.switchTab({
								url:'/pages/index/index'
							})},1000)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					})
				}
				
			},
			
			// getAsset() {
			// 	let data = {
			// 		token:uni.getStorageSync('token'),
			// 		page:1
			// 	}
			// 	this.$http.quest(this.$API.wellet.wallet_info,'post',data).then(res=>{
			// 		if(res.code == 1) {
			// 			this.service = res.transfer_fee
			// 		}
			// 	})
			// },
			onKeyInput(event) {
				let i = event.target.value;
				let num = i.charAt(i.length - 1);
				var reg = new RegExp('^[0-9]*$');
				if (!reg.test(num)) {
					this.password =  '';
				} else {
					this.password = i;
				}
				
			}
		}
			
	}
</script>

<style scoped lang="less">
	page{
		.transfer {
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

