<template>
	<view class=" h100 " style="height: 100%;">
		<view class="status_bar bg041D25"><view class="top-view bg041D25"></view></view>
		<view class="tops bgf1">
			<Back :txt="name"></Back>
		</view>
		<view class="list br20  ">
			<view class="disJcsb flexWrap">
				<view class="list-item shadow disJcsb flexdcolumn br20 mb20" @click="pushPage('/pages/zoology/manageBuy?data=',{id:item.id,manageId:id},1)"  v-for="(item,i) in list" :key='i'>
					<image class="shop-img" :src="item.pic" mode=""></image>
					<text class="f30 ml20  mt20 mb20">{{item.name}}</text>
					<text class="f26 cFF4444 ml20 mb20">${{item.money}}</text>
				</view>
			</view>
			<view class="f28 flex mt10"  v-if="finish">
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
			list:[],
			id:'',
			name:'',
			page:1,
			finish:false
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
			if (this.finish) return
			this.$http.questToken(this.$API.index.getByLicaiId,'post', data).then(res=>{
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
	.bannder {
		height: 320rpx;
	}
	.box {
		padding: 30rpx 0 30rpx;
	}
	.list {
		padding: 110rpx 30rpx 10rpx 30rpx;
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
