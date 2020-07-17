<template>
	<view class="conversion">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'兑换'"></Back>
		<view class="tab mb20" >
			<view class="flex">
				<view class="flex1 flex item pr f30" @click="tab(1)" :class="{ active: tabIndex == 1 }">
					KB兑换USDT
					<text class="line pb"></text>
				</view>
				<view class="flex1 flex item pr f30" @click="tab(2)" :class="{ active: tabIndex == 2 }">
					KB兑换EKB
					<text class="line pb"></text>
				</view>
			</view>
		</view>
		<view class="cont">
			<view class="disJcsbAc mt30">
				<view class="br20 bgcfff flex fwbold f40 box">
					KB
				</view>
				<image class="wh60" src="/static/index/dh.png" mode=""></image>
				<view class="br20 bgcfff flex fwbold f40 box" v-if="tabIndex == 1">
					USDT
				</view>
				<view class="br20 bgcfff flex fwbold f40 box" v-if="tabIndex == 2">
					EKB
				</view>
			</view>
			<view class="mt20 mb20">
				<text class="f26" v-if="tabIndex == 1">兑换率: 1KB = {{proportion}}USDT</text>
				<text class="f26" v-if="tabIndex == 2">兑换率: 1KB = {{ratio}}EKB</text>
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">兑换数量</text>
				<input type="number" maxlength="9" class="flex1 f28" v-model.trim="account" placeholder="请输入需兑换的数量" />
			</view>
			<view class="f28 bgcfff br10 item flexJC mt20" style="padding-right: 0;" >
				<view class="flexAI">
					<text class="flexAI">兑换得到</text>
					<input class="f28" type="number" v-model.trim="acquisition" placeholder="输入数量自动换算" />
				</view>
				<text class="flex" v-if="tabIndex == 1" >USDT</text>
				<text class="flex" v-if="tabIndex == 2" >EKB</text>
			</view>
			<view class="f28 bgcfff br10 item flexJC mt20" style="padding-right: 0;" >
				<view class="flexAI">
					<text class="flexAI">需消耗</text>
					<input class="f28" type="number" disabled v-model.trim="getNum" placeholder="输入数量自动换算" />
				</view>
				<text class="flex" >EKB</text>
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">支付密码</text>
				<input class="f28" type="password" maxlength="6" password @input="onKeyInput($event)" v-model.trim="password" placeholder="请输入支付密码" />
			</view>
			<view class="f28 bgcfff br10 item flexJC mt20" style="padding-right: 0;" >
				<view class="flexAI">
					<text class="flexAI">短信验证</text>
					<input class="f28" type="number" v-model.trim="smsCode" placeholder="请输入验证码" />
				</view>
				<text class="flex c00FFBA" v-if="!sendTime" @click="getCode">发送验证码</text>
				<text class="flex c00FFBA" v-else >{{time}}s重新获取</text>
			</view>
			<view class="btn-box" >
				<button :disabled="disabled"  class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60 cfff" @click="getTransform">
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
				walletAddress: this.address,
				time: 60, // 倒计时
				sendTime: false, // 定时器,
				service:"",
				proportion:0,
				dhBili:0,
				tabIndex:1,
				ratio:0,
				expend:0,
				disabled:false,
				// countData:0
				
			}
		},
		components: {
			Back
		},
		onLoad(e) {
			this.proportion = JSON.parse(e.data).proportion
			this.dhBili = JSON.parse(e.data).dhBili
			this.ratio = JSON.parse(e.data).ratio
			this.expend = JSON.parse(e.data).expend
			
		},
		computed:{
		    ...mapState(["address"]),
			acquisition(){
				if(this.tabIndex == 1) {
					return this.proportion * this.account
				} else if(this.tabIndex == 2) {
					return this.ratio * this.account
				}
				
				
			},
			
			getNum() {
				if(this.tabIndex == 1) {
					return Number(this.account * this.dhBili / 100)
				} else  if(this.tabIndex == 2) {
					console.log(11)
					return Number(this.account * this.expend / 100)
				}
			},
			
			
		 },
		onShow() {
			this.walletAddress = this.address
		},
		
		methods: {
			tab(index) {
				this.tabIndex = index;
				this.account = ''
				this.smsCode= ''
				this.password = ''
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
			// 发送短信验证码
			getCode() {
				
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
				let parameter = {
					dhNum: this.account, // 金额
					payPwd: this.password, // 支付密码
					card: this.smsCode,
				}
				this.disabled= true
				if(this.tabIndex == 1) {
					this.$http.questToken(this.$API.wellet.exchange, 'post', parameter).then(res => {
						if (res.code == 200) {
							uni.showToast({title: res.msg,icon: 'none'});
							setTimeout(()=>{uni.switchTab({
								url:'/pages/index/index'
							})},1000)
							this.password= ''
							this.smsCode= ''
							this.account= ''
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
						this.disabled= false
					})
					
				} else if(this.tabIndex == 2) {
					this.$http.questToken(this.$API.wellet.moneyDuiHuan, 'post', parameter).then(res => {
						if (res.code == 200) {
							uni.showToast({title: res.msg,icon: 'none'});
							setTimeout(()=>{uni.switchTab({
								url:'/pages/index/index'
							})},1000)
							this.password= ''
							this.smsCode= ''
							this.account= ''
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
						this.disabled= false
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
				// let num = i.charAt(i.length - 1);
				var reg = new RegExp('^[0-9]*$');
				if (!reg.test(i)) {
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
		.conversion {
			.tab {
				.item {
					height: 80rpx;
					opacity: 0.5;
					text {
						width: 50rpx;
						height: 6rpx;
						background: #f1f1f1;
						border-radius: 3rpx;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				.item.active {
					color: #333333;
					opacity: 1;
					text {
						background: #FE701A;
					}
				}
			}
			.cont {
				padding: 0 30rpx;
				.box {
					width:270rpx;
					height:110rpx;
				}
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

