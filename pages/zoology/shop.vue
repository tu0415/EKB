<template>
	<view class=" h100 ">
		<view class="status_bar "><view class="top-view "></view></view>
		<view class="tops " style="background-color: #F1F1F1;">
			<Back :txt="'商城'"></Back>
		</view>
		<view class="" style="padding-top: 100rpx;">
			<view class="bannder ml30 mr30 ">
				<view class="uni-padding-wrap swiper-box">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true" :interval="interval"
							 :duration="duration">
								<swiper-item class="swiper-box" v-for="(item,index) in banners" :key="index">
									<image class="wh100" :src="item.img" mode=""></image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="flex  br20 ml30 mr30 mt20 mb10 box">
				<view class="flex flexdcolumn flex1" v-for="(item,i) in goodTypes" :key='i' @click="pushPage('/pages/zoology/shopType?data=',{id:item.id,name:item.name},1)"  >
					<image class="wh80" :src="item.img" mode=""></image>
					<text class="mt10 f28">{{item.name}}</text>
				</view>
			</view>
			<view class="disJcsb ml30 mr30 mt20 mb20">
				<view class="f34 fwbold">
					热门推荐 
				</view>
				<view class="flexAI"  @click="pushPage('/pages/zoology/shopDetail',1)">
					<text class="f28 opacity5">更多</text>
					<image class="wh40 ml10" src="/static/index/in.png" mode=""></image>
				</view>
			</view>
			<view class="list br20 disJcsb flexWrap">
			<view class="list-item shadow disJcsb flexdcolumn br20 mb20" v-for="(item,i) in hots" :key='i'  @click="pushPage('/pages/zoology/buy?data=',{id:item.id},1)">
				<image class="shop-img" :src="item.pic" mode=""></image>
				<text class="f30 ml20  mt20 mb20">{{item.name}}</text>
				<text class="f26 cFF4444 ml20 mb20">${{item.money}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			banners:[],
			goodTypes:[],
			hots:[],
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
			this.$http.questToken(this.$API.shop.shopIndex,'post').then(res=>{
				if(res.code == 200) {
					this.banners = res.data.banners
					this.goodTypes = res.data.goodTypes
					this.hots = res.data.hots
					
				} else {
					uni.showToast({
						title:res.resule,
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
		padding: 10rpx 30rpx 34rpx 30rpx;
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
