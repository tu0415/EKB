<template>
	<view class="shift">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<Back :txt="'充值'"></Back>
		<view class="cont flexAI flexdcolumn">
			<text class="f32 site-txt">钱包地址</text>
			<view class="wh338 code flex">
				<tki-qrcode cid="qrcode" ref="qrcode" :val="address" onval :size="338" loadMake :showLoading="false"  />
			</view>
			<view class="f28" style="text-align: center;word-break:break-all;" >
				{{address}}
			</view>
			<view class="btn-box">
				<view class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60 cfff" @click="copy()">
					复制钱包地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from '@/components/back.vue'
	import tkiQrcod from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		name:'register',
		data() {
			return {
				address: "",
				qrcode: '',
				bzId:''
			}
		},
		components:{
			Back,
			'tki-qrcode': tkiQrcod
		},
		onLoad(e) {
			this.bzId = JSON.parse(e.data).id
		},
		onShow() {
			this.getAddress()
		},
		methods:{
			// result(e) {
			// 	this.qrImg = e
			// },
			copy() {
				uni.setClipboardData({
					data: this.address
				});
				
			},
			getAddress() {
				this.$http.questToken(this.$API.wellet.recharge,'post',{bzId:this.bzId}).then(res=>{
					if(res.code == 200) {
						this.address = res.data.address
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	page{
		.shift {
			.cont {
				padding: 45rpx;
				.site-txt {
					margin-top: 40rpx;
				}
				.code {
					width: 370rpx;
					height: 370rpx;
					margin: 30rpx 0 20rpx;
					background-color: #fff;
				}
				.site {
					width: 600rpx;
				}
				.btn-box {
					padding: 0 20rpx;
					width: 100%;
				}
			}
		}
	}
</style>

