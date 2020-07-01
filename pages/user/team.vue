<template>
	<view class="transfer">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'我的团队'"></Back>
		<view class="count bg-linear br10 flex  f26 flexdcolumn">
			<view class="flex mb20 cfff" style="width: 100%;">
				<!-- <view class="flex1 flex">
					<image class="vip wh60  flex" :src="'/static/user/v' + ulever + '.png'" mode=""></image>
				</view> -->
				<text class=" flex1 flex fwbold f40">{{performance}}</text>
				<text class=" flex1 flex fwbold f40">{{teamNum}}</text>
			</view>
			<view class="flex" style="width: 100%;">
				<!-- <text class="f30 flex1 flex f26">我的等级</text> -->
				<text class=" flex1 flex f26 cfff">团队业绩</text>
				<text class=" flex1 flex f26 cfff">推荐用户</text>
			</view>
			
		</view>
		<view class="list">
			<view class="title f28 flex">
				<text class="flex1 flex">会员ID</text>
				<text class="flex1 flex">级别</text>
				<text class="flex1 flex">团队业绩</text>
			</view>
			<view class="box">
				<scroll-view scroll-y="true" class="scroll-box">
				<view class="list-item f28 flex" v-for="(item,index) in list" :key="index" >
					<text class="flex1 flex">{{item.codeId}}</text>
					<view class="flex1 flex">
						<image class="wh60 " :src="'/static/user/v' +item.vip+ '@2x.png'" mode=""></image>
					</view>
					<text class="flex1 flex">{{item.gongxian || 0}}</text>
				</view>
				<view  class="flex f26 lh40">没有更多</view>
			</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from '@/components/back.vue'
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				performance:'',
				teamNum:'',
				page:1,
				list:[],
				finish:false
			}
		},
		onShow() {
			this.clearData()
			this.getTeamEvt()
		},
		onReachBottom() {
			this.getTeamEvt()
		},
		computed:{
			
		},
		components: {
			Back
		},
		methods: {
			 getTeamEvt() {
				 if (this.finish) return
				this.$http.questToken(this.$API.user.team,'post',{page:this.page}).then(res=>{
					if(res.code == 200) {
						this.performance = res.gongxian
						this.teamNum = res.count
						this.finish = res.ulist.length < 10
						!this.finish && (this.page += 1)
						this.list = this.list.concat(res.ulist)
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			clearData(){
				this.page = 1
				this.finish = false
				this.list = []
			},
		}
	}
</script>

<style scoped lang="less">
	.transfer {
		.count {
			margin: 30rpx;
			padding: 40rpx 0;
		}
		.scroll-box {
			height: 900rpx;
		}
		.list-item {
			height: 80rpx;
			
		}
	}
</style>
