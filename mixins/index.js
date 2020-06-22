import Vue from 'vue'
// import { mapState, mapActions } from 'vuex'

Vue.mixin({
	data() {
		return {
			
		}
	},
	computed: {},
	onLoad() {

	},
	methods: {
		pushPage(path, query = {}, isData) {
			if (getApp().globalData.is_flag) { //is_flag开始等于 true
				getApp().globalData.is_flag = false;
				if (isData == 1) {
					uni.navigateTo({
						url: path + JSON.stringify(query)
					});
				} else {
					uni.navigateTo({
						url: path
					});
				}
				setTimeout(() => {
					getApp().globalData.is_flag = true;
				}, 1000)
			} else {
				console.log('重复点击了');
			}

		}
	}
})
