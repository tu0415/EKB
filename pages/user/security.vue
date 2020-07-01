<template>
	<view class="security">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'安全设置'"></Back>
		<view class="list">
				<view class="item bgcfff br10 disJcsbAc mb20" @click="pushPage('/pages/login/changePassword',1)">
					<text class="f30">修改登录密码</text>
					<image class="wh60" src="/static/index/in.png" mode=""></image>
				</view>
				<view class="item bgcfff br10 disJcsbAc mb20" @click="pushPage('/pages/login/changePaypassword',1)">
					<text class="f30">修改支付密码</text>
					<image class="wh60" src="/static/index/in.png" mode=""></image>
				</view>
		</view>
	</view>
</template>

<script>
	import Back from "@/components/back.vue"
	export default {
		components:{
			Back
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="less">
	.security {
		.list {
			margin: 30rpx;
			.list-box {
				height: 1100rpx;
			}
			.item {
				padding: 18rpx 5px 18rpx 20rpx;
				.item-left {
					text {
						width: 600rpx;
					}
				}
			}
		}
	}
</style>

