

<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
			this.checkUpgrade()
		},
		onHide: function() {
			// console.log('App Hide')
		},
		globalData:{
			is_flag:true
		},
		methods:{
			checkUpgrade() {
				// plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				// 	var wgtStr = "appid:"+wgtinfo.appid;
				// 	console.log(wgtStr)
				// })
				
				// console.log(version)
				
				let data = {
					// #ifdef APP-PLUS
					version: '1.0.8',
					os: plus.os.name === 'iOS' ? 1 : 2,
					// #endif
				}
				this.$http.quest(this.$API.login.edition_upd, "post", data).then(res => {
					if(res.code == 200) {
						console.log(res)
						var iosUrl = res.data.iOS
						var androidUrl = res.data.Android
						if(res.data.type != 0) {
							// #ifdef APP-PLUS
							uni.showModal({
							    title: '提示',
							    content: res.data.bug,
							    success: function (res) {
							        if (res.confirm) {
										if(plus.os.name === 'iOS') {
											plus.runtime.openURL(iosUrl)
										} else {
											plus.runtime.openURL(androidUrl)
										}
										
							        } else if (res.cancel) {
										plus.runtime.quit()
							        }
							    }
							});
							// #endif
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}, error => {
					console.log(error);
				})
				
			}
		} 
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/common.css';
	@import './common/top.css';
	@import './components/parse/parse.css';
</style>
