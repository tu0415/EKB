<template>
	<view class="wallet-index bgcfff">
		<view class="top flexAI flexdcolumn">
			<text class="f30 mt100 cfff">总资产</text>
			<text class="f50 fwbold mt30 mb20 cfff">{{ info.zzcMoney }}</text>
			<!-- <text class="f30 opacity6">≈$456131.0213</text> -->
		</view>
		<view class="wallet-box flex " style="margin-top: -50rpx;">
			<view url="/pages/wallet/shift" class=" flex flexdcolumn flex1" @click="goShift">
				<image class="wh84" src="/static/wallet/cz.png" mode=""></image>
				<text class="f30 mt10">充值</text>
			</view>
			<view url="/pages/wallet/shift" class=" flex flexdcolumn flex1" @click="goRoll">
				<image class="wh84" src="/static/wallet/tb.png" mode=""></image>
				<text class="f30 mt10">提币</text>
			</view>
			<view url="/pages/wallet/shift" class=" flex flexdcolumn flex1" @click="goTransfer">
				<image class="wh84" src="/static/wallet/zz.png" mode=""></image>
				<text class="f30 mt10">转账</text>
			</view>
			<view url="/pages/wallet/shift" class=" flex flexdcolumn flex1" @click="goConversion">
				<image class="wh84" src="/static/wallet/zz.png" mode=""></image>
				<text class="f30 mt10">兑换</text>
			</view>
		</view>
		<view class="list mt40">
			<view class="disJcsbAc bdbfff1 item shadow mb30 br20" @click="pushPage('/pages/wallet/detail?data=', { name: 'USDT', type: 1 }, 1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/zoology/usdt@2x.png" mode=""></image>
					<text class="f30 fwbold">USDT</text>
				</view>
				<text class="fwbold f36">{{ info.usdtMoney }}</text>
			</view>
			<view class="disJcsbAc bdbfff1 item shadow mb30 br20" @click="pushPage('/pages/wallet/detail?data=', { name: 'JKF', type: 2 }, 1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/wallet/kb.png" mode=""></image>
					<text class="f30 fwbold">KB</text>
				</view>
				<text class="fwbold f36">{{ info.kb_num }}</text>
			</view>
			<view class="disJcsbAc bdbfff1 item shadow mb30 br20" @click="pushPage('/pages/wallet/detail?data=', { name: 'JKC', type: 3 }, 1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/wallet/ekb.png" mode=""></image>
					<text class="f30 fwbold">EKB</text>
				</view>
				<text class="fwbold f36">{{ info.ekb_num }}</text>
			</view>
			<view class="disJcsbAc bdbfff1 item shadow mb30 br20" @click="pushPage('/pages/wallet/detail?data=', { name: '购物积分', type: 4 }, 1)">
				<view class="flexAI">
					<image class="wh80 mr20" src="/static/zoology/gwjf@2x.png" mode=""></image>
					<text class="f30 fwbold">购物积分</text>
				</view>
				<text class="fwbold f36">{{ info.gouwujifen_num }}</text>
			</view>
		</view>
		<unipopup ref="shifts" type="center">
			<view class="shade_box br10 flexdcolumn flexAI pr" style="width: 400rpx">
				<!-- <image @click="closes" class="wh32 close pb" src="/static/user/Popup_close.png"></image> -->
				<text class="f36">请选择币种</text>
				<view class="">
					<view class="flex mt40 mb30" v-for="(item, i) in currencyList" :key="i" @click="goShits(item.id)">{{ item.bz_name }}</view>
				</view>
			</view>
		</unipopup>
		<unipopup ref='roll' type="center">
			<view class="shade_box br10 flexdcolumn flexAI pr" style="width: 400rpx">
				<!-- <image  @click="closes" class="wh32 close pb" src="/static/user/Popup_close.png"></image> -->
				<text class="f36">请选择币种</text>
				<view class="" >
					<view class="flex mt40 mb30" v-for="(item,i) in currencyList" :key='i' @click="goRolls(item.id)">
						{{item.bz_name}}
					</view>
				</view>
			</view>
		</unipopup>
		<unipopup ref='transfer' type="center">
			<view class="shade_box br10 flexdcolumn flexAI pr" style="width: 400rpx">
				<image  @click="close" class="wh32 close pb" src="/static/user/close.png"></image>
				<text class="f36">请选择币种</text>
				<view class="" >
					<view class="flex mt40 mb30" v-for="(item,i) in currencyList" :key='i'  @click="goTransfers(item.id)">
						{{item.bz_name}}
					</view>
				</view>
			</view>
		</unipopup>
	</view>
</template>

<script>
import unipopup from '@/components/uni-popup/uni-popup.vue';
export default {
	data() {
		return {
			info: {},
			isChong: '',
			isTi:'',
			isZhuan:'',
			isDuihuan:'',
			chongzhiBZ: [],
			// zhuanzhangBZ:[],
			tibiBZ:[],
			currencyList: [],
			proportion:'',
			usdtSXF:'',
			ekbSXF:'',
			isZhuanJkc:''
		};
	},
	components: {
		unipopup
	},
	onShow() {
		this.getData();
	},
	onReachBottom() {},
	methods: {
		
		goShits(id) {
			this.$refs.shifts.close()
			this.pushPage('/pages/wallet/shift?data=',{id:id},1)
		},
		goShift() {if(this.isChong == 1) {
				this.currencyList = this.chongzhiBZ
				this.$refs.shifts.open()
			} else {uni.showToast({title:'暂未开放',icon:none})}
		},
		goRolls(id) {
			this.$refs.roll.close()
			let service;
			if(id == 1) {
				service = this.usdtSXF
			} else {
				service = this.ekbSXF
			}
			this.pushPage('/pages/wallet/roll?data=',{id:id,service:service},1)
		},
		goRoll() {if(this.isTi == 1) {
				this.currencyList = this.tibiBZ
				this.$refs.roll.open()
			} else {uni.showToast({title:'暂未开放',icon:none})}
		},
		goTransfers(id) {
			this.$refs.transfer.close()
				if(this.isZhuan == 1) {
					this.pushPage('/pages/wallet/transfer?data=',{id:id},1)
				} else {
					uni.showToast({
						title:'暂未开放',
						icon:'none'
					})
				}
			
		},
		goTransfer() {if(this.isZhuan == 1) {
			this.currencyList = this.zhuanzhangBZ
			this.$refs.transfer.open()
			} else {uni.showToast({title:'暂未开放',icon:none})}
		},
		goConversion() {if(this.isDuihuan == 1) {
				this.pushPage('/pages/wallet/conversion?data=',{proportion:this.proportion},1)
			} else {uni.showToast({title:'暂未开放',icon:none})}
		},
		getData() {
			this.$http.questToken(this.$API.assets.index, 'post').then(res => {
				if (res.code == 200) {
					this.info = res.data.zichan;
					this.chongzhiBZ = res.data.chongzhiBZ;
					this.tibiBZ = res.data.tibiBZ;
					this.zhuanzhangBZ = res.data.zhuanzhangBZ;
					this.isChong = res.data.isTrue.isChong;
					this.isTi = res.data.isTrue.isTi;
					this.isZhuan = res.data.isTrue.isZhuan;
					this.isDuihuan = res.data.isTrue.isDuihuan;
					this.usdtSXF = res.data.usdtSXF
					this.ekbSXF = res.data.ekbSXF
					this.proportion = res.data.duihuanbili
					
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		}
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
			var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var sdate = ('0' + date.getDate()).slice(-2);
			var hour = ('0' + date.getHours()).slice(-2);
			var minute = ('0' + date.getMinutes()).slice(-2);
			var second = ('0' + date.getSeconds()).slice(-2);
			// 拼接
			var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second;
			// 返回
			return result;
		}
	}
};
</script>

<style scoped lang="less">
page {
	height: 100%;
}
.wallet-index {
	height: 100%;
	.top {
		background: url(../../static/zoology/qb_bg.png) no-repeat;
		background-size: 100% 100%;
		height: 430rpx;
	}
	.list {
		padding: 0 30rpx;
		.item {
			padding: 45rpx 30rpx;
		}
	}
	.shade_box {
		padding: 50rpx 38rpx 40rpx;
		.close {
			right: 20rpx;
			top: 20rpx;
		}
	}
}
</style>
