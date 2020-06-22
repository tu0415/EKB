<template>
	<view class="index">
		<view class="top flexAI flexdcolumn">
			<text class="f30 mt100">总资产</text>
			<text class="f50 fwbold mt30 mb20">{{info.zzcMoney}}</text>
			<!-- <text class="f30 opacity6">≈$456131.0213</text> -->
		</view>
		<view class="list bg041D25">
			<view class="disJcsbAc bdbfff1 item" @click="pushPage('/pages/wallet/detail?data=',{name:'USDT',type:1},1)" >
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/zoology/usdt@2x.png" mode=""></image>
					<text class="f30 fwbold">USDT</text>
				</view>
				<text class="fwbold f36">{{info.usdtMoney}}</text>
			</view>
			<view class="disJcsbAc bdbfff1 item" @click="pushPage('/pages/wallet/detail?data=',{name:'JKF',type:2},1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/zoology/jkf@2x.png" mode=""></image>
					<text class="f30 fwbold">JKF</text>
				</view>
				<text class="fwbold f36">{{info.jkf_num}}</text>
			</view>
			<view class="disJcsbAc bdbfff1 item" @click="pushPage('/pages/wallet/detail?data=',{name:'JKC',type:3},1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/zoology/jkc_qb@2x.png" mode=""></image>
					<text class="f30 fwbold">JKC</text>
				</view>
				<text class="fwbold f36">{{info.jkc_num}}</text>
			</view>
			<view class="disJcsbAc bdbfff1 item" @click="pushPage('/pages/wallet/detail?data=',{name:'购物积分',type:4},1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/zoology/gwjf@2x.png" mode=""></image>
					<text class="f30 fwbold">购物积分</text>
				</view>
				<text class="fwbold f36">{{info.gouwujifen_num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				info:{}
			}
		},
		onShow() {
			this.getData()
		},
		onReachBottom() {
		},
		methods:{
			getData() {
				this.$http.questToken(this.$API.assets.index,'post').then(res=>{
					if(res.code == 200) {
						this.info = res.data.zichan
						
					} else {
						uni.showToast({
							title:res.resule,
							icon:'none'
						})
					}
				})
			},
		},
		filters: {
					// timeStamp: function(value) {
					// 	if (!value) return '';
					// 	value = value * 1000
					// 	var now = new Date(value);
					// 	console.log("time:" + JSON.stringify(now));
					// 	var year = now.getFullYear();
					// 	var month = now.getMonth() + 1;
					// 	if (month < 10) {
					// 		month = '0' + month
					// 	}
					// 	var date = now.getDate();
					// 	if (date < 10) {
					// 		date = '0' + date
					// 	}
					// 	return year + "-" + month + "-" + date
					// },
					timeStamp: function(value) {
						var date = new Date(value*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
						var year = date.getFullYear();
						var month = ("0" + (date.getMonth() + 1)).slice(-2);
						var sdate = ("0" + date.getDate()).slice(-2);
						var hour = ("0" + date.getHours()).slice(-2);
						var minute = ("0" + date.getMinutes()).slice(-2);
						var second = ("0" + date.getSeconds()).slice(-2);
						// 拼接
						var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
						// 返回
						return result;
					}
				},
		
		
	}

</script>

<style scoped lang="less">
	page{
		.top {
			background:url(../../static/zoology/qb_bg@2x.png) no-repeat;
			background-size: 100% 100%;
			height: 500rpx;
		}
		.list {
			margin-top: -50rpx;
			padding: 0 60rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			.item {
				padding: 45rpx 0;
			}
		}
	}
</style>
