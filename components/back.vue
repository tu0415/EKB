<template>
	<view class="back">
		<view class="header">
			<image src="/static/login/back.png" alt="" @click="back">
				<text class="flex text">{{txt}}</text>
				<view class="right f14 black">
					<slot name="right"></slot>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'titles',
		props: {
			txt: {
				type: String
			},
			rightCont: {
				type: String
			}
		},
		methods: {
			back() {
				uni.navigateBack(1)
			}
		},
	}
</script>

<style scoped lang='less'>
	page {
		.header {
			height: 96rpx;
			position: relative;
			image{
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				top: 24rpx;
				left: 24rpx;
			}

			.text {
				font-size: 36rpx;
				color: #fff;
				height: 100%;
			}

			.right {
				position: absolute;
				right: 32rpx;
				top: 32rpx;
			}
		}
	}
</style>
