<template>
	<view class="index">
		<view class="index-cont">
			<view class="banner pr">
				<image class="wh100 pb user-bg" src="/static/user/wd_bg@2x.png" mode=""></image>
				<!-- <image @click="scan" class="wh48 scan-code" src="/static/user/sys@2x.png" mode=""></image> -->
				<!-- <image @click="codeEvt" class="wh48  menu pb" src="/static/user/menu.png" mode=""></image> -->
				<view class="pb info flex flexdcolumn">
					<image  class="user-img mb10" :src="userInfo.pic_img" mode=""></image>
					<view class="f32 flexAI">
						<text>ID:{{userInfo.tel}}</text>
						<image class="wh48 ml20" :src="'/static/user/v' +userInfo.vip+ '@2x.png'" mode=""></image>
					</view>
				</view>
			</view>
			<view class="flex bg062B37 br20 mr30 ml30 column pr">
				<view class="flexAI flexdcolumn flex1" @click="pushPage('/pages/user/myOrder',1)" >
					<image class="wh48" src="/static/user/wddd@2x.png" mode=""></image>
					<text class="f28 mt20">我的订单</text>
				</view>
				<view class="flexAI flexdcolumn flex1" @click="pushPage('/pages/user/myEarnings',1)" >
					<image class="wh48" src="/static/user/wdsy@2x.png" mode=""></image>
					<text class="f28 mt20">我的收益</text>
				</view>
				<view class="flexAI flexdcolumn flex1" @click="pushPage('/pages/user/team',1)" >
					<image class="wh48" src="/static/user/wdtd@2x.png" mode=""></image>
					<text class="f28 mt20">我的团队</text>
				</view>
				<view class="flexAI flexdcolumn flex1" @click="pushPage('/pages/user/share',1)" >
					<image class="wh48" src="/static/user/wyfx@2x.png" mode=""></image>
					<text class="f28 mt20">我要分享</text>
				</view>
				
			</view>
			<view class="list bg062B37 br20 mt30 ml30 mr30">
				<view class="item disJcsbAc" @click="pushPage('/pages/user/address',1)" >
					<view class="disJcsbAc" >
						<image class="wh48 mr30" src="/static/user/shdz@2x.png" mode=""></image>
						<text class="f28">收货地址</text>
					</view>
					<image class="wh40" src="/static/user/into@3x.png" mode=""></image>
				</view>
				<view class="item disJcsbAc" @click="service">
					<view class="disJcsbAc">
						<image class="wh48 mr30" src="/static/user/kf@2x.png" mode=""></image>
						<text class="f28">联系客服</text>
					</view>
					<image class="wh40" src="/static/user/into@3x.png" mode=""></image>
				</view>
				<view class="item disJcsbAc"  @click="pushPage('/pages/user/notice',1)">
					<view class="disJcsbAc">
						<image class="wh48 mr30" src="/static/user/gg.png" mode=""></image>
						<text class="f28">系统公告</text>
					</view>
					<image class="wh40" src="/static/user/into@3x.png" mode=""></image>
				</view>
				<view class="item disJcsbAc" @click="pushPage('/pages/user/security',1)">
					<view class="disJcsbAc" >
						<image class="wh48 mr30" src="/static/user/anquan@2x.png" mode=""></image>
						<text class="f28">安全设置</text>
					</view>
					<image class="wh40" src="/static/user/into@3x.png" mode=""></image>
				</view>
				<view class="item disJcsbAc" @click="quit">
					<view class="disJcsbAc">
						<image class="wh48 mr30" src="/static/user/tc@2x.png" mode=""></image>
						<text class="f28">退出登录</text>
					</view>
					<image class="wh40" src="/static/user/into@3x.png" mode=""></image>
				</view>
			</view>
		</view>
	
		<view class="shade" v-if="isService">
			<view class="shade_box br10">
				<image @click="isService = false" class="wh20 close pb" src="/static/user/close.png" mode=""></image>
				<view class="title f34 flex f32">
					<text>客服邮箱</text>
				</view>
				<view class="txt f36 number flex">
					{{userInfo.kefu}}
				</view>
				<view class="confirm bg00FFBA br10 flex c021E34 h70 m0 f26" @click="copy">
					复制邮箱
				</view>
				
			</view>
		</view>
		
		<!-- <view class="shade " v-if="isCode" @click="shadeEVt">
			<view class="shade_box br20" >
				<view class="tc mb30">
					扫一扫向我转账
				</view>
				<tki-qrcode cid="qrcode" ref="qrcode" :val="qrcode" onval :size="280" loadMake :showLoading="false"  />
			</view>
		</view> -->
	</view>
</template>

<script>
	import tkiQrcod from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				// userId:JSON.parse(uni.getStorageSync('info')).mobile,
				isService:false,
				mailbox:'',
				userInfo:{},
				qrcode:"",
				isCode:false
			}
		},
		onShow() {
			this.getUserInfo()
			
		},
		components: {
			'tki-qrcode': tkiQrcod
		},
		methods:{
			service(){
				this.isService = true
			},
			copy() {
				uni.setClipboardData({
					data: this.mailbox
				});
				
			},
			
			getUserInfo() {
				this.$http.questToken(this.$API.user.userInfo, "post").then(res=>{
					if(res.code == 200) {
						this.userInfo = res.data
					} else {
						uni.showToast({
							title:res.resule,
							icon:'none'
						})
					}
				})
			},
			
			quit() {
				uni.showModal({
				    title: '提示',
				    content: '是否退出登录',
				    success: function (res) {
				        if (res.confirm) {
							uni.removeStorageSync('token')
							uni.setStorageSync("mobile",'')
							uni.reLaunch({url:'/pages/login/login'})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>



<style scoped lang="less">
.index {
	.index-cont {
		.banner {
			height: 460rpx;
			.info {
				top: 140rpx;
				left: 50%;
				transform: translateX(-50%);
				.user-img {
					width: 120rpx;
					height: 120rpx;
				}
			}
			.scan-code {
				top: 100rpx;
				left: 24rpx;
			}
			.menu {
				top: 100rpx;
				right: 24rpx;
			}
		}
		.item {
			padding: 35rpx 50rpx 35rpx 63rpx;
		}
		.column {
			margin-top: -100rpx;
			padding: 40rpx 0;
		}
	}

	.shade_box {
		padding: 35rpx 80rpx 54rpx;
		.number {
			margin: 25rpx 0 40rpx;
		}
		.pay-input {
			height: 80rpx;
			background-color: #354a5c;
			padding-left: 20rpx;
			margin-bottom: 50rpx;
		}
		.confirm{
			width: 200rpx;
		}
		.close {
			right: 20rpx;
			top: 20rpx;
		}
		
			
	}
	.language {
		width: 440rpx;
		padding: 20rpx 0 30rpx;
		view {
			height: 80rpx;
		}
		.close {
			right: 20rpx;
			top: 20rpx;
		}
	}
			

}
</style>

<style>
	
	
</style>
