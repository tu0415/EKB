<template>
	<view class=" h100 ">
		<view class="status_bar "><view class="top-view "></view></view>
		<view class="tops ">
			<Back :txt="'我的KB'"></Back>
			<view class="tab mb20">
				<view class="flex">
					<view class="flex1 flex item pr f30" @click="tab(1)" :class="{ active: tabIndex == 1 }">
						消费回馈
						<text class="line pb"></text>
					</view>
					<view class="flex1 flex item pr f30" @click="tab(2)" :class="{ active: tabIndex == 2 }">
						分享回馈
						<text class="line pb"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="list  br20 ml30 mr30">
			<view class="list-item disJcsbAc bdbfff1" v-for="(item,i) in list" :key='i'>
				<view class="disFlex flexdcolumn">
					<text class="f28">{{item.type}}</text>
					<text class="f22 opacity5 mt20">{{item.add_time}}</text>	
				</view>
				<text class="f28">{{item.jtsy}}</text>	
			</view>
			
			<view class="f28 flex mt20" v-if="finish">
				没有更多
			</view>
		</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			tabIndex: 1,
			page: 1,
			list: [],
			finish: false,
			status:1
		};
	},
	onLoad(e) {},
	onShow() {
		this.clearData()
		this.getList()
	},
	components: {
		Back
	},
	onReachBottom() {
		this.getList()
	},
	methods: {
		tab(index) {
			this.tabIndex = index;
			this.status = index;
			this.num = '';
			this.clearData()
			this.getList()
		},
		getList() {
			let data = {
				page:this.page,
				status:this.status
			}
			if (this.finish) return
			this.$http.questToken(this.$API.user.earnings,'post',data).then(res=>{
				if(res.code == 200) {
					this.finish = res.data.length < 10 
					!this.finish && (this.page += 1)
					this.list = this.list.concat(res.data)
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
	.tab {
		.item {
			height: 80rpx;
			opacity: 0.5;
			text {
				width: 50rpx;
				height: 6rpx;
				background: #f1f1f1;
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
				background: #FE701A;
			}
		}
	}
	.list {
		padding: 210rpx 23rpx 34rpx 23rpx;
		.list-item {
			padding: 23rpx 0;
		}
	}
}
</style>
