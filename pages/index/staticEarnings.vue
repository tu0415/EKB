<template>
	<view class="staticEarnings">
		<view class="status_bar"><view class="top-view"></view></view>
		<Back :txt="'消费记录'"></Back>
		<view class="index-cont">
			<view class="currency-list ">
				<view class="list-box mb20 bgcfff br10" v-for="(item,i) in list" :key='i' >
					<view class="f26 flexAI">
						<text class="opacity5" style="width: 150rpx;">投资数量</text>
						<text>{{item.shiji_money}}</text>
					</view>
					<view class="f26 flexAI mt20">
						<text class="opacity5" style="width: 150rpx;">区域</text>
						<text>{{item.name}}</text>
					</view>
					<view class="f26 flexAI mt20">
						<text class="opacity5" style="width: 150rpx;">投资日期</text>
						<text>{{item.add_time}}</text>
					</view>
				</view>
				
				<view class="flex f26 mt20 mb20" v-if="finish">没有更多</view>
			</view>
		</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			page: 1,
			list: [],
			finish: false
		};
	},
	name: 'earnings',
	components: {
		Back
	},
	onShow() {
		this.clearData()
		this.getList()
	},
	onReachBottom() {
		this.getList();
	},
	methods: {
		getList() {
			let data = {
				page: this.page,
			};
			if (this.finish) return;
			this.$http.questToken(this.$API.index.licaiList, 'post', data).then(res => {
				if (res.code == 200) {
					this.finish = res.data.length < 10;
					!this.finish && (this.page += 1);
					this.list = this.list.concat(res.data)
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
		}
	}
};
</script>

<style scoped lang="less">
page {
	.staticEarnings {
		.index-cont {
			padding: 30rpx;
			.card {
				.top {
					// padding-bottom: 24rpx;
					padding: 24rpx 35rpx;
					height: 300rpx;
					background: linear-gradient(245deg, rgba(8, 172, 196, 1), rgba(4, 87, 115, 1));
					border-radius: 8px;
					.top-box {
						padding-bottom: 24rpx;
						.btn {
							view {
								padding: 15rpx 22rpx;
								margin-left: 10rpx;
							}
						}
					}
				}
			}
			.detai-text {
				height: 100rpx;
			}
			.currency-list {
				// padding: 0rpx 23rpx 0rpx;

				overflow: scroll;
				.list-box {
					padding: 30rpx 20rpx;
				}
				.item {
					// padding: 0 34rpx;
					padding-top: 20rpx;
					margin: 0 20rpx;
				}
				.item:last-child {
					border: none;
				}
			}
		}
	}
}
</style>
