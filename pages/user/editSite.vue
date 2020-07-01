<template>
	<view class="notice">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
			<Back :txt="'编辑收货地址	'"></Back>
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
				<textarea class="trea mt20" v-model="street" placeholder="请填写地址" />
			</view>
		</view>
		<view class="btn f36 c021E34 bg00FFBA flex br45 h90 cfff" @click="getList">
			完成
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
				id:'',
				street:'',
			}
		},
		onLoad(e) {
			this.name = e.name
			this.tel = e.tel
			this.id = e.id
			this.street = e.street
		},
		
		components:{
			Back
		},
		
		methods:{
			getList() {
				let data = {
					name:this.name,
					tel:this.tel,
					address:this.street,
					id:this.id
				}
				if (this.finish) return
				this.$http.questToken(this.$API.user.addAddress,'post',data).then(res=>{
					if(res.code == 200) {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						uni.navigateTo({
							url:'/pages/user/address'
						})
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
