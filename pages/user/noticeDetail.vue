<template>
	<view class="noticeDetail bgcfff">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'公告详情'"></Back>
		<view class="count">
			<view class="f34 mb10">{{cont.title}}</view>
			<view class="f24 cfff3 mb30">{{cont.time}}</view>
			<text class="f28" v-html="cont.desc"></text>
		</view>
	</view>
</template>

<script>
	import Back from "@/components/back.vue"
	export default {
		data() {
			return {
				cont: {},
				
			}
		},
		components:{
			Back
		},
		onLoad(e) {
			this.getListInfo(JSON.parse(e.data).id)
		},
		methods:{
			getListInfo(id) {
				this.$http.questToken(this.$API.user.getGgxq,'post',{id:id}).then(res=>{
					if(res.code == 200) {
						this.cont = res.data
					} else {
						uni.showToast({
							title:res.resule,
							icon: 'none'
						})
					}
				})
			}
			
		}
	}
</script>

<style scoped lang="less">
	page {
		height: 100%;
	}
	.noticeDetail {
		height: 100%;
		.count {
			padding: 20rpx 20rpx 20rpx 30rpx;
		}
	}
</style>

