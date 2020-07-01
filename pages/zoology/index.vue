<template>
	<view class="index  h100 bgcfff">
		<view class="index-box">
			<view class="banner">
				<image class="wh100" src="/static/zoology/st_bg.png" mode=""></image>
			</view>
			<view class="list disFlex flexWrap  br60 pr bgcfff pt20">
				<!-- <navigator class="flex  br10 item flexdcolumn" v-for="(itme,i) in list" :key='i' url="/pages/zoology/shop">
					<image class="wh48 mb20" :src="item.img" mode=""></image>
					<text class="f28">{{item.name}}</text>
				</navigator> -->
				<view class="flex  br10 item flexdcolumn"  @click="pushPage('/pages/zoology/shop',1)">
					<image class="wh48 mb20" src="/static/zoology/shangchang@2x.png" mode=""></image>
					<text class="f28">商城</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/lianmei@2x.png" mode=""></image>
					<text class="f28">直播</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/jiedai@2x.png" mode=""></image>
					<text class="f28">OTC</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/sj@2x.png" mode=""></image>
					<text class="f28">社交</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/shh@2x.png"></image>
					<text class="f28">生活</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/bocai@2x.png" mode=""></image>
					<text class="f28">博彩</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/youxi@2x.png" mode=""></image>
					<text class="f28">游戏</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/jiedai@2x.png" mode=""></image>
					<text class="f28">借贷</text>
				</view>
				<view class="flex  br10 item flexdcolumn">
					<image class="wh48 mb20" src="/static/zoology/jiaoyu@2x.png" mode=""></image>
					<text class="f28">教育</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods:{
			async getData() {
				const res = await this.$http.quest(this.$API.shop.shengtai,'post')
				this.list = res.data
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		height: 100%;
		.index {
			height: 100%;
			.index-box {
				.banner {
					height: 550rpx;
				}
			}
			.list {
				margin: -160rpx 0 0 0rpx;
				z-index: 11;
				.item {
					width: 33.33%;
					height: 226rpx;
					margin-bottom: 5rpx;
				}
				.item:nht-child(3) {
					margin-right: 0;
				}
			}
		}
	}
</style>
