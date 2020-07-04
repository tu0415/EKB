<template>
	<view class="ktvdetail h100 ">
		<view class="status_bar "><view class="top-view "></view></view>
		<view class="tops bgf1">
			<Back :txt="'我的订单'"></Back>
			<view class="tab">
				<view class="flex">
					<view class="flex1 flex item pr f30" @click="tab(0)" :class="{ active: tabIndex == 0 }">
						全部
						<text class="line pb"></text>
					</view>
					<view class="flex1 flex item pr f30" @click="tab(1)" :class="{ active: tabIndex == 1 }">
						待发货
						<text class="line pb"></text>
					</view>
					<view class="flex1 flex item pr f30" @click="tab(2)" :class="{ active: tabIndex == 2 }">
						待收货
						<text class="line pb"></text>
					</view>
					<view class="flex1 flex item pr f30" @click="tab(3)" :class="{ active: tabIndex == 3 }">
						已完成
						<text class="line pb"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="list-cont ">
			<view class="br20 bgcfff list-itme mb20" v-for="(item,i) in list" :key='i'>
				<view class="disJcsbAc bdbfff1 pb30">
					<view class="f26 disFlex flexdcolumn">
						<text>订单号：{{item.orderSn}}</text>
						<text class="mt10">物流单号：{{item.kuaiSn}}</text>
					</view>
					<text class="f26 c00FFBA">{{item.status}}</text>
				</view>
				<view class="disJcsb bdbfff1">
					<view class="info pt40 pb40 disFlex">
						<image class="wh120 mr30" :src="item.pic" mode=""></image>
						<view class="disFlex flexdcolumn ">
							<text class="f28">{{item.name}}</text>
							<!-- <view class="beam f22 flex br3 bgFFECE5 cFF3C3C num m120 mb10 mt10">赠 69.00</view> -->
							<text class="f28 cFF3C3C">￥{{item.price}}</text>
						</view>
					</view>
					<text class="flex pb40" style="align-items: flex-end;">X{{item.buyNum}}</text>
				</view>
				<view class="disJcsbAc flexAI mt20 f26">
					<view class="">
						<view v-if="status ==2" @click="goqRorderByIdEvt(item.orderId)" class="btn " style="border: 1px solid #FE701A;padding: 10rpx 20rpx;border-radius: 30rpx;color:#FE701A ;">
							确认收货
						</view>
					</view>
					<view class="flexAI">
						<text>共 {{item.buyNum}} 件</text>
						<view class="ml20">
							合计:<text class="cFF4444 ml20 ">￥{{item.sumMoney}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="f28 tc mt20 mb20" v-if="finish">没有更多</view>
		</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			tabIndex: 0,
			page: 1,
			list: [],
			finish: false,
			status: 0
		};
	},
	onShow() {
		this.clearData();
		this.getList();
	},
	components: {
		Back
	},
	onReachBottom() {
		this.getList();
	},

	methods: {
		goOrderDetail(id) {
			uni.navigateTo({
				url: '/pages/user/orderDetail?id=' + id
			});
		},
		tab(index) {
			this.tabIndex = index;
			this.status = index;
			this.clearData();
			this.getList();
		},

		getList() {
			let data = {
				page: this.page,
				status: this.status
			};
			if (this.finish) return;
			this.$http.questToken(this.$API.user.orderForm, 'post', data).then(res => {
				if (res.code == 200) {
					this.finish = res.data.length < 10;
					!this.finish && (this.page += 1);
					this.list = this.list.concat(res.data);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		clearData() {
			this.page = 1;
			this.finish = false;
			this.list = [];
		},
		goqRorderByIdEvt(id) {
			this.$http.questToken(this.$API.user.qRorderById, 'post', {order_id:id}).then(res => {
				if (res.code == 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					this.list = this.list.filter(item => item.orderId != id )
					
					
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
page {
	.tops {
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		width: 100%;
		z-index: 10;
	}
	.ktvdetail {
		.tab {
			.item {
				height: 100rpx;
				opacity: 0.5;
				text {
					width: 50rpx;
					height: 6rpx;

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
					background-color: #FE701A;
				}
			}
		}
		.list-cont {
			padding: 220rpx 30rpx 0 30rpx;
			.list-itme {
				padding: 30rpx;
			}
			.num {
				width: 150rpx;
				height: 32rpx;
			}
		}
	}
}
</style>
