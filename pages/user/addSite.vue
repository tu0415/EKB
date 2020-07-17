<template>
	<view class="notice">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
			<Back :txt="'添加收货地址	'"></Back>
		<view class="list">
			<view class="bgcfff list-item flexAI">
				<text class="f32 txt">收货人</text>
				<input type="text" v-model="name" placeholder="请输入收货人姓名" />
			</view>
			<view class="bgcfff list-item flexAI">
				<text class="f32 txt">手机号码</text>
				<input type="number" v-model="tel" placeholder="请输入手机号码" />
			</view>
			<view class="list-item bgcfff">
				<text class="f32">详细地址</text>
				<textarea class="trea mt20" v-model="address" placeholder="请填写地址" />
			</view>
		</view>
		<view class="btn f36 c021E34 bg00FFBA flex br45 h90 cfff" @click="addAddressEvt">
			添加
		</view>
	</view>
</template>

<script>
	import Back from "@/components/back.vue"
	export default {
		data() {
			return {
				name:'',
				tel:'',
				address:'',
				isPayadd:''
			}
		},
		
		components:{
			Back
		},
		onLoad(e) {
			this.isPayadd = JSON.parse(e.data).isPayadd
		},
		methods:{
			addAddressEvt() {
				let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
				if (!this.name) {
					uni.showToast({
						title: '请输入收货人姓名',
						icon: 'none'
					});
					return false;
				}
				if (!reg.test(this.tel)) {
					uni.showToast({
						title: '手机号码不正确',
						icon: 'none'
					});
					return false;
				}
				if (!this.address) {
					uni.showToast({
						title: '请输入收货人地址',
						icon: 'none'
					});
					return false;
				}
				let data = {
					name:this.name,
					tel:this.tel,
					address:this.address,
				}
				this.$http.questToken(this.$API.user.addAddress,'post',data).then(res=>{
					if(res.code == 200) {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						if(this.isPayadd == 1) {
							setTimeout(()=>{ uni.navigateBack({
								delta:1
							 })},800)
						} else {
							uni.navigateTo({
								url:'/pages/user/address'
							})
						}
						
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
			
			goDetail(id) {
				uni.navigateTo({url:'/pages/user/noticeDetail?id='+ id})
			},
		}
	}
</script>

<style scoped lang="less">
	.notice {
		.top-title {
			position: fixed;
			top: var(--status-bar-height);
			left: 0;
			width: 100%;
			height: 96rpx;
			background-color: #041D25;
			z-index: 10;
		}
		.list {
			.list-item {
				padding: 30rpx;
				.txt {
					width: 180rpx;
				}
				.trea {
					width: 100%;
				}
			}
		}
		.btn {
			width: 90%;
			margin: 40rpx auto;
		}
		
	}
</style>
