<template>
	<view class=" h100 bg041D25">
		<view class="status_bar bg041D25"><view class="top-view bg041D25"></view></view>
		<view class=" bg041D25">
			<Back :txt="'确认下单'"></Back>
		</view>
		<view class="count ml30 mr30">
			<view class="disJcsbAc br20 mt60 mb50">
				<view class="flexAI">
					<image class="wh40" src="/static/user/address.png" mode=""></image>
					<view class="f28 ml20 flexdcolumn flexAI">
						<text class="mb20">{{addres.name}}</text>
						<text >{{addres.street}}</text>
					</view>
				</view>
				<view class="f28 flexAI">
					<view class="flexAI flexdcolumn">
						<text class="mb20">{{addres.tel}}</text>
						<!-- <text>ddd</text> -->
					</view>
					<image class="wh40 ml20" src="/static/user/into@3x.png" mode=""></image>
				</view>
			</view>
			<view class="disJcsb f28 mt60 mb50">
				<image class="wh170 mr40" :src="info.pic" mode=""></image>
				<view class="flex1 disJcsb flexdcolumn">
					<view class="f32">{{info.goodName}}</view>
					<view class="disJcsb ">
						<text class="cFF4444">${{info.price}}</text>
						<text class="c999">X{{info.buyNum}}</text>
					</view>
				</view>
			</view>
			<view class="f28 disJcsb mt60 mb50">
				<text>商品原价</text>
				<text>${{info.price}}</text>
			</view>
			<view class="f28 disJcsb mt60 mb50">
				<text>合计</text>
				<text class="cFF4444">${{info.sumPrice}}</text>
			</view>
			<view class="f28  mt60 mb50 ">
				<text class="mb20">卖家留言</text>
				<textarea class="mt20 bg062B37 leave" v-model="buyMessage" placeholder="订单补充说明" />
			</view>
		</view>
		
		<view class="f28 disJcsbAc place-box bg062B37 ">
			<view class="">
				合计 <text class="cFF4444 ml10">${{info.sumPrice}}</text>
			</view>
			<view class="flex bottom" @click="openShare">
				立即下单
			</view>
		</view>
			
		<unipopup ref='shade' type="center" >
			<view class="shade_box br10 flexdcolumn flexAI">
				<image  @click="close" class="wh32 close pb" src="/static/user/close.png"></image>
				<text class="f30">请输入支付密码</text>
				<view class="pwd-box pr flex mt30">
					<input  type="password pb" ref="pwd" focus="false" class="pwd" v-model="msg" maxlength="6" />
					<view class="pwd-wrap pb flex ">
						<view class="list-num flex flex1">
							<view v-if="msgLength > 0" class="dot flex"></view>
						</view>
						<view class="list-num flex flex1">
							<view v-if="msgLength > 1" class="dot flex"></view>
						</view>
						<view class="list-num flex flex1">
							<view v-if="msgLength > 2" class="dot flex"></view>
						</view>
						<view class="list-num flex flex1">
							<view v-if="msgLength > 3" class="dot flex"></view>
						</view>
						<view class="list-num flex flex1">
							<view v-if="msgLength > 4" class="dot flex"></view>
						</view>
						<view class="list-num flex flex1">
							<view v-if="msgLength > 5" class="dot flex"></view>
						</view>
					</view>
				</view>
				<view class="btn br10 f32 c000 bg26B5FF flex h88 mr30 ml30 mt60" @click="payEvt">
					确认
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
			msgLength: 0,
			msg: "",
			id:'',
			number:'',
			addres:{},
			info:{},
			buyMessage:""
		};
	},
	watch: {
		msg(curVal) {
			if (/[^\d]/g.test(curVal)) {
				this.msg = this.msg.replace(/[^\d]/g, "");
			} else {
				this.msgLength = curVal.length;
			}
		}
	},
	onLoad(e) {
		this.id = JSON.parse(e.data).id
		this.number = JSON.parse(e.data).number
	},
	onShow() {
		this.getData()
	},
	beforeDestroy() {
		this.$refs.shade.close()
	},
	components: {
		Back,
		unipopup
	},
	methods: {
		openShare() {
			this.$refs.shade.open()
		},
		close() {
			this.msg = ''
			this.shade = false
			this.$refs.shade.close()
		},
		getData() {
			let data = {
				guigeId:this.id,
				buyNum:this.number
			}
			this.$http.questToken(this.$API.shop.shopBuy,'post',data).then(res=>{
				if(res.code == 200) {
					this.$refs.shade.close()
					this.msg = ''
					this.addres = res.data.address
					if(res.data.address && res.data.address.length == 0) {
						uni.showToast({
							title:'亲,您还没有收货地址,赶紧去添加吧',
							icon:'none'
						})
						setTimeout(()=>{
							this.pushPage('/pages/user/address',1)
						},1000)
					}
					this.info = res.data.goods
				} else {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			})
		},
		payEvt() {
			let data = {
				guigeId:this.info.guigeId,
				addressId:this.addres.id,
				buyMessage:this.buyMessage,
				payPwd:this.msg,
				buyNum:this.info.buyNum
			}
			this.$http.questToken(this.$API.shop.addOrderById,'post',data).then(res=>{
				if(res.code == 200) {
					uni.navigateTo({
						url:'/pages/user/myOrder',
						icon:'none'
					})
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
		.leave {
			width: 100%;
			height: 350rpx;
			padding: 20rpx;
		}
			
	}
	.place-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
		.bottom {
			background-color: #26B5FF;
			width: 200rpx;
			height: 70rpx;
			border-radius: 35rpx;
		}
	}
	
	.shade_box {
		padding: 50rpx 38rpx 40rpx;
	
		.close {
			right: 20rpx;
			top: 20rpx;
		}
	
		.pwd-box {
			.pwd {
				width: 480rpx;
				height: 80rpx;
				z-index: -1;
				background-color: #264A6A;
				padding-left: 20rpx;
				color: #264A6A;
			}
	
			.pwd-wrap {
				width: 100%;
				height: 100%;
				top: 0;
	
				.list-num {
					border-right: 2rpx solid #102A41;
					height: 100%;
					.dot {
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						background-color: #FFFFFF;
					}
				}
	
				.list-num:last-child {
					border-right: none;
				}
			}
		}
	
		.btn {
			width: 400rpx;
			border-radius: 40rpx;
			height: 80rpx;
		}
	
	}
	
	
}
</style>
