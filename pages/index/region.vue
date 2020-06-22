<template>
	<view class="region">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<view class="title-fixed bg041D25" style="height: 100rpx;">
			<Back :txt="'增值消费区'">
				<view class="f30" slot="right"  @click="pushPage('/pages/index/staticEarnings',2)">
					记录
				</view>
			</Back>
		</view>
		<view class="list mr30 ml30">
			<!-- <view class="list-item br20 bg-linear mb30"  v-for="(item,i) in list" :key='i' @click="pushPage('/pages/index/regionDetail?data=',{id:item.id,usdt:usdt,jkc:jkc,usdtBILI:usdtBILI,beis:item.beishu,name:item.name,jkcBILI:jkcBILI},1)" > -->
			<view class="list-item br20 bg-linear mb30"  v-for="(item,i) in list" :key='i' @click="pushPage('/pages/zoology/shopList?data=',{id:item.id,usdt:usdt,jkc:jkc,usdtBILI:usdtBILI,beis:item.beishu,name:item.name,jkcBILI:jkcBILI},1)" >	
				<view class="title flex bdbfff1 mb30">
					{{item.name}}
				</view>	
				<view class="flex">
					<view class="flexAI flexdcolumn flex1">
						<text class="f32 c00FFBA">{{item.minNum}}-{{item.maxNum}}</text>
						<text class="f26 opacity5 mt30">投资(USDT)</text>
					</view>
					<view class="flexAI flexdcolumn flex1">
						<text class="f32 cFFEB0C">{{item.beishu}}倍</text>
						<text class="f26 opacity5 mt30">收益倍数</text>
					</view>
					<view class="flexAI flexdcolumn flex1">
						<text class="f32 ">{{item.riBili}}</text>
						<text class="f26 opacity5 mt30">日收益率</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from '@/components/back.vue'
	export default {
		data() {
			return {
				list:[],
				usdt:'',
				jkc:'',
				usdtBILI:'',
				jkcBILI:'',
			}
		},
		onShow() {
			this.getData()
		},
		components:{
			Back
		},
		methods: {
			getData() {
				this.$http.questToken(this.$API.index.consumption,'post').then(res=>{
					if(res.code == 200) {
						this.list = res.data.list
						this.usdt = res.data.money.usdt
						this.jkc = res.data.money.jkc
						this.usdtBILI = res.data.bilis.usdtBILI
						this.jkcBILI = res.data.bilis.jkcBILI
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
.list {
	padding-top: 100rpx;
	.list-item {
		padding: 20rpx 53rpx 40rpx;
		.title {
			padding-bottom:30rpx ;
		}
	}
}
</style>
