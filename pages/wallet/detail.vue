<template>
	<view class=" h100 bgf1">
		<view class="status_bar bgf1"><view class="top-view bgf1"></view></view>
		<view class="tops bgf1">
			<Back :txt="name"></Back>
			<view class="bannder ml30 mr30 cfff">
				<view class="f36 ">
					{{name}}
				</view>
				<view class="mt20 disFlex">
					<view class="disFlex flexdcolumn flex1">
						<text class="f26 opacity5">可用</text>
						<text class="f36 fwbold mt20">{{money || 0}}</text>
					</view>
					<view class="disFlex flexdcolumn flex1" v-if="type == 2">
						<text class="f26 opacity5">锁仓</text>
						<text class="f36 fwbold mt20">{{locked || 0}}</text>
					</view>
				</view>
			</view>
			<view class="f32 ml30 mt40 mb20">
				资产明细
			</view>
		</view>
		<view class="list bgcfff br20 ml30 mr30 mb20">
			<view class="list-item disJcsbAc bdbfff1" v-for="(item,i) in list" :key='i'>
				<view class="disFlex flexdcolumn">
					<text class="f28">{{item.type}}</text>
					<text class="f22 opacity5 mt20">{{item.add_time}}</text>	
				</view>
				<text class="f28" v-if="item.status == 0">-{{item.money}}</text>	
				<text class="f28" v-else>+{{item.money}}</text>
			</view>
			<view class="flex f28 mt20" v-if="finish">
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
			name:'',
			page:1,
			list:[],
			finish:false,
			type:'',
			money:'',
			locked:''
		};
	},
	onLoad(e) {
		this.name = JSON.parse(e.data).name
		this.type = JSON.parse(e.data).type
	},
	onShow() {
		this.clearData()
		this.getList()
	},
	onReachBottom() {
		this.getList()
	},
	components: {
		Back
	},
	onReachBottom() {},
	methods: {
		getList() {
			let data = {
				page:this.page,
				type:this.type
			}
			if (this.finish) return
			this.$http.questToken(this.$API.assets.moneyList,'post',data).then(res=>{
				if(res.code == 200) {
					if(this.type == 1) {
						this.money = res.data.usdtYe
					}
					if(this.type == 2) {
						this.money = res.data.kbYe
						this.locked = res.data.suocangYuE
					}
					if(this.type == 3) {
						this.money = res.data.ekbYe
					}
					if(this.type == 4) {
						this.money = res.data.gwjfYe
					}
					this.finish = res.data.list.length < 10 
					!this.finish && (this.page += 1)
					this.list = this.list.concat(res.data.list)
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
	.bannder {
		padding: 35rpx 0 32rpx 30rpx;
		background: url(../../static/zoology/wallet_usdt_bg.png) no-repeat;
		background-size: 100% 100%;
		height: 230rpx;
	}
	.list {
		padding: 430rpx 23rpx 34rpx 23rpx;
		.list-item {
			padding: 23rpx 0;
		}
	}
}
</style>
