<template>
	<view class="start hv100"><image class="git start-img hv100" src="/static/start/start.gif" mode=""></image></view>
</template>

<script>
export default {
	onLoad() {
		setTimeout(() => {
			this.pushHome();
		}, 2500);
	},
	methods: {
		pushHome() {
			if (uni.getStorageSync('token')) {
				uni.switchTab({ url: '/pages/index/index' });
			} else {
				uni.reLaunch({ url: '/pages/login/login' });
			}
		}
	}
};
</script>

<style scoped lang="less">
.start {
	&-img {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
	}
}
.hv100 {
	box-sizing: border-box;
	min-height: 100%;
	min-height: calc(100vh - var(--window-top) - var(--window-bottom));
}
</style>
