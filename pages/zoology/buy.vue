<template>
	<view class=" h100 ">
		<view class="status_bar "><view class="top-view "></view></view>
		<view class="tops " style="background-color: #F1F1F1;">
			<Back :txt="'商品详情'"></Back>
		</view>
		<view class="count">
			<!-- <view class="" >
				<image class="wh100" :src="imgs" mode=""></image>
			</view> -->
			<view class="uni-padding-wrap swiper-box">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true" :interval="interval"
						 :duration="duration" style="height: 700rpx;">
							<swiper-item class="swiper-box" v-for="(item,index) in imgs" :key="index">
								<image class="wh100" :src="item" mode=""></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="ml30 mr30">
				<view class="cFF3C3C mt20">
					${{info.price}}
				</view>
				<view class="mt10 mb20 f32 disJcsbAc mr20">
					<text>{{info.name}}</text>
					<text class="f26">销量:{{info.num}}</text>
				</view>
				<view class="flex">
					商品详情
				</view>
				<view class="f28 mt20 info-cont" >
					<!-- {{info.desc}} -->
					<uParse :content="info.desc"  noData=" " class="" style='padding-bottom: 120rpx;'  />
				</view>
			</view>
		</view>
		<view class="bgf1 flex" style="width: 100%;position: fixed;height: 120rpx;bottom: 0;left: 0;" >
			<view class="buy-box flex br45 h90 bgFF3C3C f32 cfff" @click="buy">
				立即购买
			</view>
		</view>
			
		<unipopup ref='shade' type="bottom">
			<view class="shade-count" >
				<view class="info disJcsb bdde5">
					<image  class=" info-img" :src="imgs[0]" mode=""></image>
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
					<view  @click="goPlace"  class="flex br45 h90 bgFF3C3C f32 flex1 cfff">
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
import uParse from '@/components/parse/parse.vue';
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			id:'',
			imgs:[],
			info:{},
			number:1,
			guige:{}
		};
	},
	onLoad(e) {
		this.id = JSON.parse(e.data).id
		this.getData()
	},
	onShow() {
		
	},
	components: {
		Back,
		unipopup,
		uParse
	},
	computed:{
		total() {
			return this.number * this.guige.price
		}
	},
	methods: {
		buy() {
			this.number = 1
			this.specificationEvt()
			
		},
		
		goPlace() {
			this.pushPage('/pages/zoology/place?data=',{id:this.guige.id,number:this.number},1)
			this.$refs.shade.close()
		},
		
		getData() {
			this.$http.questToken(this.$API.shop.findByGoodId,'post',{goodId:this.id}).then(res=>{
				if(res.code == 200) {
					// this.imgs = res.data.banners.pic1
					
					for (let i in res.data.banners) {
					    this.imgs.push(res.data.banners[i]); //属性
					}
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
