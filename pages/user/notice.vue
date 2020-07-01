<template>
	<view class="notice ">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<view class="top-title ">
			<Back :txt="'系统公告'"></Back>
		</view>
		<view class="list">
			<view class="list-box">
				<view class="item bgcfff br10 disJcsbAc mb20" v-for="(item,index) in list" :key='index'  @click="pushPage('/pages/user/noticeDetail?data=',{id:item.article_id},1)" >
					<view class="item-left disFlex flexdcolumn">
						<text class="f30 text ellipsis mb10">{{item.title}}</text>
						<text class="f24 cfff5">{{item.add_time}}</text>
					</view>
					<image class="wh40" src="/static/index/in.png" mode=""></image>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	import Back from "@/components/back.vue"
	export default {
		data() {
			return {
				page:1,
				list:[],
				finish:false
			}
		},
		
		onShow() {
			this.clearData()
			this.getList()
		},
		components:{
			Back
		},
		onReachBottom() {
			this.getList()
		},
		methods:{
			getList() {
				let data = {
					page:this.page,
				}
				if (this.finish) return
				this.$http.quest(this.$API.user.gongG,'post',data).then(res=>{
					if(res.code == 200) {
						this.finish = res.data.length < 10 
						!this.finish && (this.page += 1)
						this.list = this.list.concat(res.data)
					} else {
						uni.showToast({
							title:res.resule,
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
			
			goDetail(id) {
				uni.navigateTo({url:'/pages/user/noticeDetail?id='+ id})
			},
		}
	}
</script>

<style scoped lang="less">
	.notice {
		.top-title {
			position: fixed;
			top: var(--status-bar-height);
			left: 0;
			width: 100%;
			height: 96rpx;
			// background-color: #041D25;
			z-index: 10;
		}
		.list {
			padding-top: 110rpx;
			margin: 0 30rpx 30rpx;
			// .list-box {
			// 	height:1200rpx;
			// 	overflow-y: auto;
			// }
			.item {
				padding: 20rpx 20rpx 30rpx 20rpx;
				.item-left {
					text {
						width: 600rpx;
					}
				}
			}
		}
	}
</style>
