<template>
	<view class="regionDetail">
		<view class="status_bar"><view class="top-view"></view></view>
		<Back :txt="name"></Back>
		<view class="count mr30 ml30">
			<view class="bg-linear box br20 flex">
				<view class="flexAI flexdcolumn flex1 bdr">
					<text class="f32 fwbold mb20">{{usdt}}</text>
					<text class="f26 opacity5">可用USDT</text>
				</view>
				<view class="flexAI flexdcolumn flex1">
					<text class="f32 fwbold mb20">{{jkc}}</text>
					<text class="f26 opacity5">可用JKC</text>
				</view>
			</view>
			<view class="input-box mt20 mb20"><input class="wh100 bg062B37 br20 num-box" maxlength="6" type="number" v-model="num" placeholder="请输入投资数量" /></view>
			<view class="bg062B37 br20 info">
				<view class="flex">
					<view class="flexAI flexdcolumn flex1">
						<text class="f28">需投资 (USDT)</text>
						<text class="f34 c00FFBA mt30">{{needUsdt || 0}}</text>
					</view>
					<view class="flexAI flexdcolumn flex1">
						<text class="f28">需投资 (JKC)</text>
						<text class="f34 c00FFBA mt30">{{needJkc}}</text>
					</view>
				</view>
				<view class="br45 flex bg041D25 f30 h90 mt30">
					<text>预计收益 (JKF)：</text>
					<text class="cFF3C3C">{{earnings || 0}}</text>
				</view>
			</view>
			<view class="btn f36 c021E34 bg00FFBA flex br45 h90 mt60 fwbold" @click="btn()">立即投资</view>
		</view>
		<view class="shade" v-if="isShare">
			<view class="shade_box br20">
				<image class="wh20 close pb" @click="close" src="/static/user/close.png" mode=""></image>
				<view class="title f36 flex "><text>投资支付</text></view>
				<view class="txt f36 number mt60"> {{name}}: <text class="c00FFBA ml10 mr20">{{needUsdt}}</text>USDT</view>
				<view class="txt f36 number mt60"> {{name}}: <text class="c00FFBA ml10 mr20">{{needJkc}}</text>JKC</view>
				<input class="br45 pay-input h90 bg062B37" maxlength="6" @input="onKeyInput($event)" password type="password" v-model="passsword" placeholder="请输入支付密码" />
				<view class="confirm bg00FFBA br45 flex c021E34  m0" @click="buy">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
import Back from '@/components/back.vue';
export default {
	data() {
		return {
			id:'',
			usdt:'',
			jkc:'',
			usdtBILI:'',
			jkcBILI:'',
			num:'',
			beis:'',
			name:'',
			isShare:false,
			passsword:''
		};
	},
	
	components: {
		Back
	},
	computed:{
		needUsdt() {
			return (this.num * (this.usdtBILI / 100)).toFixed(2)
		},
		needJkc() {
			return (this.num * (this.jkcBILI / 100)).toFixed(2)
		},
		earnings() {
			return (this.num * this.beis).toFixed(2)
		}
	},
	onLoad(e) {
		this.id = JSON.parse(e.data).id
		this.usdt = JSON.parse(e.data).usdt
		this.jkc = JSON.parse(e.data).jkc
		this.usdtBILI = JSON.parse(e.data).usdtBILI
		this.jkcBILI = JSON.parse(e.data).jkcBILI
		console.log(this.jkcBILI)
		this.beis = JSON.parse(e.data).beis
		this.name = JSON.parse(e.data).name
	},
	methods: {
		btn() {
			if(!this.num) {
				uni.showToast({
					title:'请输入投资数量',
					icon:'none'
				})
				return false
			}
		
			if(Number(this.needUsdt) > Number(this.usdt)) {
				uni.showToast({
					title:'可用USDT余额不足',
					icon:'none'
				})
				return false
			}
			if(Number(this.needJkc) > Number(this.jkc)) {
			
				uni.showToast({
					title:'可用JKC余额不足',
					icon:'none'
				})
				return false
			}
			this.isShare = true
		},
		close() {
			this.isShare = false
			this.passsword = ''
		},
		onKeyInput(event) {
			let i = event.target.value;
			let num = i.charAt(i.length - 1);
			var reg = new RegExp('^[0-9]*$');
			if (!reg.test(num)) {
				this.passsword =  '';
			} else {
				this.passsword = i;
			}
			
		},
		buy() {
			let data = {
				licaiId:this.id,
				num:this.num,
				payPwd:this.passsword,
			}
			this.$http.questToken(this.$API.index.investment,'post',data).then(res=>{
				if(res.code == 200) {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
						})
					},1000)
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
.count {
	.box {
		padding: 43rpx 0;
	}
	.input-box {
		.num-box {
			padding: 30rpx 0 25rpx 22rpx;
		}
	}
	.info {
		padding: 48rpx 35rpx 37rpx 25rpx;
	}
}
.shade_box {
	padding: 32rpx 37rpx 54rpx;
	.close {
		right: 30rpx;
	}
	.pay-input {
		width: 486rpx;
		margin: 36rpx 0 50rpx;
		padding-left: 30rpx;
	}
	.confirm {
		height: 70rpx;
		width: 200rpx;
	}
}
</style>
