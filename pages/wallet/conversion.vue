<template>
	<view class="conversion">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'兑换'"></Back>
		<view class="cont">
			<view class="disJcsbAc mt30">
				<view class="br20 bgcfff flex fwbold f40 box">
					KB
				</view>
				<image class="wh60" src="/static/index/dh.png" mode=""></image>
				<view class="br20 bgcfff flex fwbold f40 box">
					USDT
				</view>
			</view>
			<view class="mt20 mb20">
				<text class="f26">兑换率: 1KB = {{proportion}}USDT</text>
			</view>
			<view class="f28 bgcfff br10 item flexAI mt20">
				<text class="flexAI">兑换数量</text>
				<input type="number" class="flex1 f28" v-model.trim="account" placeholder="请输入需兑换的数量" />
			</view>
			<view class="f28 bgcfff br10 item flexJC mt20" style="padding-right: 0;" >
				<view class="flexAI">
					<text class="flexAI">兑换得到</text>
					<input class="f28" type="number" v-model.trim="acquisition" placeholder="输入数量自动换算" />
				</view>
				<text class="flex" >USDT</text>
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
			<view class="btn-box" @click="getTransform">
				<view class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60 cfff">
					确定
				</view>
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
				dhBili:0
				// countData:0
				
			}
		},
		components: {
			Back
		},
		onLoad(e) {
			this.proportion = JSON.parse(e.data).proportion
			this.dhBili = JSON.parse(e.data).dhBili
		},
		computed:{
		    ...mapState(["address"]),
			acquisition:{
				get() {
					return this.proportion * this.account
				},
				set(v) {
				    this.countData = v
				}
				
			},
			getNum() {
				return Number(this.account * this.dhBili / 100)
			}
		 },
		onShow() {
			this.walletAddress = this.address
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
				})
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
		.conversion {
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

