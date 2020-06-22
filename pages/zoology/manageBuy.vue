<template>
	<view class=" h100 bg041D25">
		<view class="status_bar bg041D25"><view class="top-view bg041D25"></view></view>
		<view class="tops bg041D25">
			<Back :txt="'商品详情'"></Back>
		</view>
		<view class="count">
			<image class="wh100" :src="imgs" mode=""></image>
			<view class="ml30 ">
				<view class="cFF3C3C">
					${{info.price}}
				</view>
				<view class="mt10 mb20">
					{{info.name}}
				</view>
				<view class="flex">
					商品详情
				</view>
				<view class="">
					{{info.desc}}
				</view>
			</view>
		</view>
		<view class="buy-box flex br45 h90 bgFF3C3C f32" @click="buy">
			立即购买
		</view>
			
		<unipopup ref='shade' type="bottom">
			<view class="shade-count" >
				<view class="info disJcsb bdde5">
					<image  class=" info-img" :src="imgs" mode=""></image>
					<view class="cFF3C3C ml20 mr20 disJcsb  flexdcolumn mt20">
						<text>${{total}}</text>
						<text class="f28">{{guige.name}}</text>
					</view>
					<view class="add-box  disJcsb alend flexdcolumn">
						<text class="txt f30">库存{{guige.stock}}件</text>
						<view class="flex operation">
							<button class="flex bgcfccc9" @click="subtract">-</button>
							<input type="number" class="bgcfccc9" v-model="number" disabled value="" />
							<button class="flex bgcfccc9" @click="add()">+</button>
						</view>
					</view>
					<image class='wh48 ml20' src="/static/zoology/close.png"@click="close"></image>
				</view>
				<view class="flex pt10 pb10 bgfff" >
					<view @click="pushPage('/pages/zoology/shop',2)"  class="disFlex flexdcolumn" style="margin: 0 60rpx;">
						<image class="wh48" src="/static/zoology/shop.png" mode=""></image>
						<text class="f28 c999">商城</text>
					</view>
					<view  @click="goPlace"  class="flex br45 h90 bgFF3C3C f32 flex1">
						立即购买
					</view>
				</view>
			</view>
		</unipopup>
		
	</view>
</template>

<script>
import Back from '@/components/back.vue';
import unipopup from '@/components/uni-popup/uni-popup.vue';
export default {
	data() {
		return {
			id:'',
			imgs:"",
			info:{},
			number:1,
			guige:{},
			manageId:''
		};
	},
	onLoad(e) {
		this.id = JSON.parse(e.data).id
		this.manageId = JSON.parse(e.data).manageId
		
		
	},
	onShow() {
		this.getData()
	},
	components: {
		Back,
		unipopup
	},
	computed:{
		total() {
			return this.number * this.guige.price
		}
	},
	methods: {
		buy() {
			this.specificationEvt()
			
		},
		
		goPlace() {
			this.pushPage('/pages/zoology/managePay?data=',{id:this.guige.id,number:this.number,manageId:this.manageId},1)
			this.$refs.shade.close()
		},
		
		getData() {
			this.$http.questToken(this.$API.shop.findByGoodId,'post',{goodId:this.id}).then(res=>{
				if(res.code == 200) {
					this.imgs = res.data.banners.pic1
					this.info = res.data.good
				} else {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			})
		},
		add() {
			if(this.number < this.guige.stock) {
				this.number++
			}
			
		},
		close() {
			this.$refs.shade.close()
			this.number = 1
		},
		subtract() {
			if(this.number > 1) {
				this.number--
			}
		},
		specificationEvt() {
			this.$http.questToken(this.$API.shop.specification,'post',{goodId:this.id}).then(res=>{
				if(res.code == 200) {
					if(res.data.guige && res.data.guige.length == 0) {
						uni.showToast({
							title:'该商品没有规格选择,暂时不能购买哟',
							icon:'none'
						})
					} else {
						this.guige = res.data.guige[0]
						this.$refs.shade.open()
					}
				} else {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			})
		}
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
	.count {
		height: 500rpx;
		padding-top: 110rpx;
	}
	.buy-box {
		padding: 20rpx;
		position: fixed;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
	}
	.shade-count {
		.info {
			background-color: #FFFFFF;
			padding: 20rpx;
			.info-img {
				width: 200rpx;
				height: 200rpx;
			}
			.add-box {
				color: #000;
			}
			.operation {
				height: 64rpx;
				button {
					width: 60rpx;
					height: 100%;
					border-radius: 0;
				}
				input {
					width: 120rpx;
					height: 100%;
					margin: 0 10rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
