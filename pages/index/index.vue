<template>
	<view class="index bgcfff">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<view class="uni-padding-wrap swiper-box">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" style="height: 400rpx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true" :interval="interval"
					 :duration="duration">
						<swiper-item class="swiper-box" v-for="(item,index) in limg" :key="index">
							<image class="wh100" :src="item.img" mode=""></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="index-count bgcfff">
			<view class="example-body flexAI mt10 mb10" >
				<image class="wh40" src="/static/login/gg.png" mode=""></image>
				<view class="uni-padding-wrap swiper-box f26" style="width: 100%;height: 60rpx;margin-left: 10rpx;">
					<view class="page-section swiper " style="line-height: 60rpx;">
						<view class="page-section-spacing">
							<swiper class="swiper"style="width: 100%;height: 60rpx;" :indicator-dots="false" :autoplay="autoplay" duration='1000' :circular="true" :interval="5000"
							 :duration="duration" vertical="true">
								<swiper-item class="swiper-txt" style="width:100%;" @click="pushPage('/pages/user/noticeDetail?data=',{id:item.article_id},1)" v-for="(item,index) in notice_list" :key="index">
									<text>{{item.title}}</text>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="wallet-box flex mt60 mb50 " >
				<view @click="pushPage('/pages/zoology/shopList?data=',{id:item.id,name:item.name},1)" v-for="(item,i) in goodTypes" :key='item.id'  class=" flex flexdcolumn flex1">
					<image class="wh84" :src="item.img" mode=""></image>
					<text class="f30 mt30">{{item.name}}</text>
				</view>
			</view>
			<view class="area-box disJcsb">
				<view class="area pr"  @click="pushPage('/pages/index/region',2)">
					<image class="br10 wh100 pb top left" src="/static/index/ffl.png" mode=""></image>
				</view>
			</view>
			<view class="disJcsbAc mt20 mb20">
				<text class="f34 c333">热门好货</text>
				<view class="opacity5 flexAI">
					<text class="f28">更多</text>
					<image class="wh60 " src="/static/index/in.png" mode=""></image>
				</view>
			</view>
			<view class="hot-list br20 disJcsb flexWrap">
				<view class="list-item  disJcsb flexdcolumn br20 mb20 shadow" style="width: 336rpx;" @click="pushPage('/pages/zoology/manageBuy?data=',{id:item.id},1)"  v-for="(item,i) in hots" :key='i'>
					<image class="shop-img" :src="item.pic" mode=""></image>
					<text class="f30 ml20  mt20 mb20 c333">{{item.name}}</text>
					<text class="f26 cFF4444 ml20 mb20">${{item.money}}</text>
				</view>
			</view>
		</view>
		
	</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import unipopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				limg:[],
				notice_list:[],
				quotation:[],
				goodTypes:[],
				hots:[]
				// isChong:'',
				// isTi:'',
				// isZhuan:'',
				// isDuihuan:'',
				// chongzhiBZ:[],
				// zhuanzhangBZ:[],
				// tibiBZ:[],
				// currencyList:[],
				// proportion:'',
				// usdtSXF:'',
				// jkcSXF:'',
				// isZhuanJkc:''
			}
		},
		
		components:{
			uniNoticeBar,
			unipopup
		},
		onShow() {
			this.getData()
		},
		
		methods: {
			goShits(id) {
				this.$refs.shifts.close()
				this.pushPage('/pages/wallet/shift?data=',{id:id},1)
			},
			
			goShift() {if(this.isChong == 1) {
					this.currencyList = this.chongzhiBZ
					this.$refs.shifts.open()
				} else {uni.showToast({title:'暂未开放',icon:none})}
			},
			goRolls(id) {
				this.$refs.roll.close()
				let service;
				if(id == 1) {
					service = this.usdtSXF
				} else {
					service = this.jkcSXF
				}
				this.pushPage('/pages/wallet/roll?data=',{id:id,service:service},1)
			},
			goRoll() {if(this.isTi == 1) {
					this.currencyList = this.tibiBZ
					this.$refs.roll.open()
				} else {uni.showToast({title:'暂未开放',icon:none})}
			},
			goTransfers(id) {
				this.$refs.transfer.close()
				if(id == 3) {
					if(this.isZhuanJkc == 1) {
						this.pushPage('/pages/wallet/transfer?data=',{id:id},1)
					} else {
						uni.showToast({
							title:'暂未开放',
							icon:'none'
						})
					}
				} else {
					this.pushPage('/pages/wallet/transfer?data=',{id:id},1)
				}
			},
			goTransfer() {if(this.isZhuan == 1) {
				this.currencyList = this.zhuanzhangBZ
				this.$refs.transfer.open()
				} else {uni.showToast({title:'暂未开放',icon:none})}
			},
			goConversion() {if(this.isDuihuan == 1) {
					this.pushPage('/pages/wallet/conversion?data=',{proportion:this.proportion},1)
				} else {uni.showToast({title:'暂未开放',icon:none})}
			},
			
			
			
			goManage() {
				uni.navigateTo({
					url:'/pages/index/manage'
				})
			},
			goEarnings() {
				uni.navigateTo({
					url:'/pages/index/earnings'
				})
			},
		    async getData() {
				await this.$http.questToken(this.$API.index.index,'post').then(res=>{
					if(res.code == 200) {
						this.limg = res.data.banners
						this.notice_list = res.data.gongaos
						this.quotation = res.data.hangQs
						this.goodTypes = res.data.goodTypes
						this.hots = res.data.hots
						
						// this.isChong = res.data.isTrue.isChong 
						// this.isTi = res.data.isTrue.isTi 
						// this.isZhuan = res.data.isTrue.isZhuan 
						// this.isDuihuan = res.data.isTrue.isDuihuan 
						// this.chongzhiBZ = res.data.chongzhiBZ
						// this.zhuanzhangBZ = res.data.zhuanzhangBZ
						// this.tibiBZ = res.data.tibiBZ
						// this.proportion = res.data.duihuanbili
						// this.usdtSXF = res.data.usdtSXF
						// this.jkcSXF = res.data.jkcSXF
						// this.isZhuanJkc = res.data.isTrue.isJkfScZZ
					} else {
						uni.showToast({
							title:res.resule,
							icon:'none'
						})
					}
				})
			
			},
			goDetail(id) {
				uni.navigateTo({
					url:'/pages/user/noticeDetail?id=' + id
				})
			},
			close() {
				this.$refs.shifts.close()
				this.$refs.roll.close()
				this.$refs.transfer.close()
			},
			
 		}
	}
</script>

<style scoped lang="less">
	page {
		height: 100%;
		
		.index {
			height: 100%;
			.index-count {
				padding:0px 30rpx 20px 30rpx;
				.swiper-box {
					.swiper-box {
						height: 340rpx;
					}
				}
				.area-box {
					.area {
						width:100%;
						height:200rpx;
					}
				}
				.market-box {
					padding: 0 170rpx;
					height: 100rpx;
					.market {
						background:url(../../static/index/hq.png) no-repeat;
						background-size: 100% 100%;
						height: 10rpx;
						width: 100%;
					}
					
				}
				.currency-list {
					// height: 600rpx;
					// overflow: scroll;
					.item {
						padding: 35rpx 30rpx;
					}
				}
			}
			.shade_box {
				padding: 50rpx 38rpx 40rpx;
				.close {
				right: 20rpx;
				top: 20rpx;
			}
			
			
		}
		.hot-list {
			padding: 0rpx 0rpx 100rpx 0rpx;
			.list-item {
				.shop-img {
					border-radius:20rpx 20rpx 0px 0px;
					width: 336rpx;
					height: 336rpx;
					
				}
			}
		}
		}
	}
	
</style>
