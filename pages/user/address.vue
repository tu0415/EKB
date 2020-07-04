<template>
	<view class="notice">
		<view class="status_bar">
			<view class="top-view"></view>
		</view>
			<Back :txt="'收货地址'"></Back>
		<view class="list">
			<view class="bgcfff list-item mb20" v-for="(item,i) in list" :key='i'>
				<view class="bdbfff1 pb30">
					<view class="f28 disJcsbAc">
						<text>{{item.name}}</text>
						<text>{{item.tel}}</text>
					</view>
					<view class="f28 mt40 c999">{{item.street}}</view>
				</view>
				<view class="disJcsbAc mt20">
					<view class="flexAI">
						<image class="wh40" v-if="item.is_moren == 1" src="/static/user/choice.png" mode=""></image>
						<image class="wh40" @click="upIsMorenEvt(item.id)" v-else src="/static/user/nochoice.png" mode=""></image>
						<text class="f28 ml20">默认地址</text>
					</view>
					<view class="disJcsbAc">
						<view class="flexAI">
							<image class="wh40" src="/static/user/edit.png" mode=""></image>
							<navigator :url="'/pages/user/editSite?id=' + item.id + '&name=' + item.name+ '&tel=' + item.tel+ '&street=' + item.street" class="f28 c999 ml10">编辑</navigator>
						</view>
						<view class="flexAI ml30">
							<image class="wh48" src="/static/user/del.png" mode=""></image>
							<text class="f28 c999 ml10" @click="deleteAddress(item.id)">删除</text>
						</view>
					</view>
				</view>
				
			</view>
			<view class="f28 flex" v-if="finish">
				没有更多
			</view>
		</view>
		<view class="btn f36 c021E34  flex   mt60">
			<view class=" btn-box flex bg00FFBA h90 br45 cfff">
				<view class="wh100 flex"  @click="pushPage('/pages/user/addSite',2)" >
					添加地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Back from "@/components/back.vue"
	export default {
		data() {
			return {
				page:1,
				list:[],
				finish:false,
				type:0
			}
		},
		
		onShow() {
			this.clearData()
			this.getList(this.type)
		},
		components:{
			Back
		},
		onReachBottom() {
			this.getList(this.type)
		},
		methods:{
			getList(type) {
				let data = {
					page:this.page,
				}
				if(type == 0) {
					if (this.finish) return
				}
				
				this.$http.questToken(this.$API.user.findAddrList,'post',data).then(res=>{
					if(res.code == 200) {
						
						this.finish = res.data.length < 10 
						!this.finish && (this.page += 1)
						this.list = this.list.concat(res.data)
					} else {
						uni.showToast({
							title:res.resule,
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
			
			deleteAddress(id) {
				this.$http.questToken(this.$API.user.delAddress,'post',{id:id}).then(res=>{
					if(res.code == 200) {
						this.list.some((item,i)=>{
						if(item.id==id){
						this.list.splice(i,1)
						/// some循环如果true,就会终止后续循环
						return true;
						}
						})
						this.clearData()
						this.getList(1)
						
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			upIsMorenEvt(id) {
				this.$http.questToken(this.$API.user.upIsMoren,'post',{id:id}).then(res=>{
					if(res.code == 200) {
						this.clearData()
						this.getList(1)
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			}
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
			}
		}
		.btn {
			position: fixed;
			width: 100%;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0rpx;
			padding-bottom: 20rpx;
			.btn-box {
				width: 90%;
			}
			
		}
		
	}
</style>
