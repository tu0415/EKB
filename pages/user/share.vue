<template>
	<view class="share">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
		<image class="bg" src="/static/user/fx_bg.png" mode=""></image>
		<Back :txt="'我要分享'" :styleStr='"color:#fff"' :imgurl="'/static/user/back.png'"></Back>
		<view class="count flexdcolumn flexAI pr">
			<image class="wh170 logo" src="/static/login/logo.png" mode=""></image>
			<text class="f50 fwbold cfff" style="font-family:FZJianZhi-M23S;">邀请好友，奖励无上限！</text>
			<text class="f30 invite cfff">邀请码</text>
			<text class="f50 fwbold cfff">{{invite}}</text>
			<text class="f28 cfff mt40 mb20">扫描二维码免费注册</text>
			<view class=" code">
				<tki-qrcode cid="qrcode" ref="qrcode"  :val="qrcode" onval :size="338" loadMake :showLoading="false" @result="result" />
			</view>
			
			<view class="flex">
				<view class="btn bgcfff br10 flex c021E34 f26 mr40" @click="copy">
					复制邀请码
				</view>
				<view class="btn bgcfff br10 flex c021E34 f26 " @click="save">
					保存分享海报
				</view>
							
			</view>
			
		</view>
	</view>
</template>

<script>
	import tkiQrcod from '@/components/tki-qrcode/tki-qrcode.vue'
	import Back from "@/components/back.vue"
	export default {
		name: 'share',
		data() {
			return {
				qrcode: '',
				invite:'',
				// result:
				
			}
		},
		components: {
			Back,
			'tki-qrcode': tkiQrcod
		},
		onShow() {
			this.getShare()
		},
		methods: {
			result(e) {
				this.qrImg = e
				console.log(e)
			},

			save() {
				const that = this;
				/* 获取屏幕信息 */
				let ws = this.$mp.page.$getAppWebview();
				let bitmap = new plus.nativeObj.Bitmap('test');
				// 将webview内容绘制到Bitmap对象中
				ws.draw(bitmap,function(e) {
						/* 获取base64 */
						that.test = bitmap.toBase64Data();
						/* 加载base64编码 */
						bitmap.loadBase64Data(
							bitmap.toBase64Data(),
							function() {
								/* 保存图片 */
								bitmap.save(
									'_doc/share.jpg', {},
									async (i) => {
											console.log('保存图片成功：' + JSON.stringify(i));
											uni.saveImageToPhotosAlbum({
												filePath: i.target,
												success: function() {
													/* 清除 */
													bitmap.clear();
													uni.showToast({title: "保存成功"});
												},
												fail(e) {
													uni.showToast({title: "保存失败",icon: "none"});
												}
											});
										},
										function(e) {
											console.log('保存图片失败：' + JSON.stringify(e));
										}
								);
							},
							function() {
								console.log('加载Base64图片数据失败：' + JSON.stringify(e));
							}
						);
					},
					function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
					}, {
						check: true, // 设置为检测白屏
						clip: {
							top: '100px',
							left: '0px',
							height: '100%',
							width: '100%'
						} // 设置截屏区域
					}
				);
			},
			getShare() {
				this.$http.questToken(this.$API.user.yaoQingF, "post").then(res => {
					if (res.code == 200) {
						this.invite = res.data.code
						this.qrcode = res.data.qrcode 
						// this.qrcode = res.data.src + "?" + "referrer" + "=" + res.data.userinfo.code
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}

				}, error => {
					console.log(error);
				})
			},
			copy() {
				uni.setClipboardData({
					data: this.invite
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.share {
		height: 100%;

		.logo {
			margin: 60rpx 0;
		}

		.invite {
			margin: 60rpx 0 16rpx;
		}

		.code {
			margin: 20rpx 0 15rpx;
			padding: 10rpx;
			background-color: #fff;
		}

		.btn {
			margin-top: 80rpx;
			padding: 20rpx 30rpx;
		}
	}

	.bg {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		min-height: calc(100vh - var(--window-top) - var(--window-bottom));

	}
</style>
