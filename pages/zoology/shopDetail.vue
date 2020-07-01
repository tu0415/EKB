<template>
	<view class=" h100 " style="height: 100%;">
		<view class="status_bar bg041D25"><view class="top-view bg041D25"></view></view>
		<view class="tops bgf1">
			<Back :txt="'更多'"></Back>
		</view>
		<view class="list br20 disJcsb flexWrap bgcfff">
			<view class="list-item shadow  disJcsb flexdcolumn br20 mb20" @click="pushPage('/pages/zoology/buy?data=',{id:item.id},1)"  v-for="(item,i) in list" :key='i'>
				<image class="shop-img" :src="item.pic" mode=""></image>
				<text class="f30 ml20  mt20 mb20">{{item.name}}</text>
				<text class="f26 cFF4444 ml20 mb20">${{item.money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			list:[]
		};
	},
	onLoad(e) {},
	onShow() {
		this.getData()
	},
	components: {
		Back
	},
	onReachBottom() {},
	methods: {
		getData() {
			this.$http.questToken(this.$API.shop.hotList,'post').then(res=>{
				if(res.code == 200) {
					this.list = res.data
				} else {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			})
		},
	}
};
</script>

<style lang="less" scoped>
page {
	height: 100%;
	background-color: #fff;
	.tops {
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		width: 100%;
		z-index: 10;
	}
	.bannder {
		height: 320rpx;
	}
	.box {
		padding: 30rpx 0 30rpx;
	}
	.list {
		
		padding: 110rpx 30rpx 34rpx 30rpx;
		.list-item {
			background:#fff;
			width: 336rpx;
			.shop-img {
				border-radius:20rpx 20rpx 0px 0px;
				width: 336rpx;
				height: 336rpx;
				
			}
		}
	}
}
</style>
