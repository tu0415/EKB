<template>
	<view class=" h100 bgcfff" style="height: 100%;">
		<view class="status_bar bg041D25"><view class="top-view bg041D25"></view></view>
		<view class="tops bgf1">
			<Back :txt="name"></Back>
		</view>
		<view class="list br20 disJcsb flexWrap bgcfff">
			<view class="list-item shadow disJcsb flexdcolumn br20 mb20" @click="pushPage('/pages/zoology/manageBuy?data=',{id:item.id,manageId:id},1)"  v-for="(item,i) in list" :key='i'>
				<image class="shop-img" :src="item.pic" mode=""></image>
				<text class="f30 ml20  mt20 mb20">{{item.name}}</text>
				<text class="f26 cFF4444 ml20 mb20">${{item.money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			list:[],
			id:'',
			name:'',
			page:1
		};
	},
	onLoad(e) {
		this.id = JSON.parse(e.data).id
		this.name = JSON.parse(e.data).name
		console.log(this.id)
	},
	onShow() {
		this.clearData()
		this.getData()
	},
	components: {
		Back
	},

	onReachBottom() {
		this.getData()
	},
	methods: {
		getData() {
			let data = {
				page:this.page,
				liciaId:this.id
			}
			this.$http.questToken(this.$API.index.getByLicaiId,'post', data).then(res=>{
				if(res.code == 200) {
					this.list = res.data
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
		height: 320rpx;
	}
	.box {
		padding: 30rpx 0 30rpx;
	}
	.list {
		padding: 110rpx 30rpx 34rpx 30rpx;
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
