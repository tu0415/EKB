<template>
	<view class="index">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<view class="index-count">
			<view class="uni-padding-wrap swiper-box">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="true" :interval="interval"
						 :duration="duration">
							<swiper-item class="swiper-box" v-for="(item,index) in limg" :key="index">
								<image class="wh100" :src="item.img" mode=""></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
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
			<view class="wallet-box flex mt60 mb50 ">
				<view url="/pages/wallet/shift" @click="goShift" class=" flex flexdcolumn flex1">
					<image class="wh84" src="/static/index/cz@2x.png" mode=""></image>
					<text class="f30 mt30">充值</text>
				</view>
				<view url="/pages/wallet/roll" @click="goRoll" class=" flex flexdcolumn flex1">
					<image class="wh84" src="/static/index/tb@2x.png" mode=""></image>
					<text class="f30 mt30">提币</text>
				</view>
				<view url="/pages/wallet/transfer" @click="goTransfer" class=" flex flexdcolumn flex1">
					<image class="wh84" src="/static/index/zz@2x.png" mode=""></image>
					<text class="f30 mt30">转账</text>
				</view>
				<view url="/pages/wallet/conversion" @click="goConversion" class=" flex flexdcolumn flex1">
					<image class="wh84" src="/static/index/dh_sy.png" mode=""></image>
					<text class="f30 mt30">兑换</text>
				</view>
			</view>
			<view class="area-box disJcsb">
				<view class="area pr"  @click="pushPage('/pages/index/region',2)">
					<image class="br10 wh100 pb top left" src="/static/index/zzxfq@2x.png" mode=""></image>
					<text class="f34 fwbold pb txt">消费增值区</text>
				</view>
				<view class="area pr"  @click="pushPage('/pages/zoology/shop',2)">
					<image class="br10 wh100 pb top left" src="/static/index/gwxjq@2x.png" mode=""></image>
					<text class="f34 fwbold pb txt">购物消费区</text>
				</view>
			</view>
			<view class="market-box flex">
				<view class="market flex f32">
					行情
				</view>
			</view>
			<view class="currency-list">
				<!-- <scroll-view scroll-y="true" class=""> -->
					<view class="item disJcsbAc bg062B37 br10 mb10" v-for="(item,index) in quotation" :key="index">
						<view class="item-left flexAI">
							<image class="wh60 mr20" :src="item.img" mode=""></image>
							<text class="fwbold">{{item.name}}</text>
						</view>
						<view class="cont flexdcolumn disFlex alend">
							<text class="f30">￥{{item.price}}</text>
							<text class="f22">${{item.MaxPrice}}</text>
						</view>
						<view class="rihgt">
							<text v-if="item.zhangdie == 0" class="cFF4444 f30">+{{item.baifenbi}}%</text>
							<text v-else class="c00FFBA f30">{{item.baifenbi}}%</text>
						</view>
					</view>
				<!-- </scroll-view> -->
			</view>
		</view>
		<unipopup ref='shifts' type="center">
			<view class="shade_box br10 flexdcolumn flexAI pr" style="width: 400rpx">
				<image  @click="close" class="wh32 close pb" src="/static/user/close.png"></image>
				<text class="f36">请选择币种</text>
				<view class="" >
					<view class="flex mt40 mb30" v-for="(item,i) in currencyList" :key='i' @click="goShits(item.id)" >
						{{item.bz_name}}
					</view>
				</view>
			</view>
		</unipopup>
		<unipopup ref='roll' type="center">
			<view class="shade_box br10 flexdcolumn flexAI pr" style="width: 400rpx">
				<image  @click="close" class="wh32 close pb" src="/static/user/close.png"></image>
				<text class="f36">请选择币种</text>
				<view class="" >
					<view class="flex mt40 mb30" v-for="(item,i) in currencyList" :key='i' @click="goRolls(item.id)">
						{{item.bz_name}}
					</view>
				</view>
			</view>
		</unipopup>
		<unipopup ref='transfer' type="center">
			<view class="shade_box br10 flexdcolumn flexAI pr" style="width: 400rpx">
				<image  @click="close" class="wh32 close pb" src="/static/user/close.png"></image>
				<text class="f36">请选择币种</text>
				<view class="" >
					<view class="flex mt40 mb30" v-for="(item,i) in currencyList" :key='i'  @click="goTransfers(item.id)">
						{{item.bz_name}}
					</view>
				</view>
			</view>
		</unipopup>
		
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
				isChong:'',
				isTi:'',
				isZhuan:'',
				isDuihuan:'',
				chongzhiBZ:[],
				zhuanzhangBZ:[],
				tibiBZ:[],
				currencyList:[],
				proportion:'',
				usdtSXF:'',
				jkcSXF:''
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
				this.pushPage('/pages/wallet/transfer?data=',{id:id},1)
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
						this.isChong = res.data.isTrue.isChong 
						this.isTi = res.data.isTrue.isTi 
						this.isZhuan = res.data.isTrue.isZhuan 
						this.isDuihuan = res.data.isTrue.isDuihuan 
						this.chongzhiBZ = res.data.chongzhiBZ
						this.zhuanzhangBZ = res.data.zhuanzhangBZ
						this.tibiBZ = res.data.tibiBZ
						this.proportion = res.data.duihuanbili
						this.usdtSXF = res.data.usdtSXF
						this.jkcSXF = res.data.jkcSXF
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
				padding: 20px 30rpx;
				.swiper-box {
					.swiper-box {
						height: 340rpx;
					}
				}
				.area-box {
					.area {
						width:324rpx;
						height:140rpx;
						.txt {
							left: 20rpx;
							top: 56rpx;
						}
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
		}
	}
	
</style>
