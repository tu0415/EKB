import Vue from 'vue'
// let URL = 'http://jkc.test.6n0z.cn' // 测试    
let URL = 'http://jkc666.com' // 正式
// 在非H5里编译
// #ifndef H5
const API = URL + '/api'
// #endif

// 在H5里编译
// #ifdef H5
const API = '/api'
// #endif


const quest = (url, method, data) => {
	let httpDefaultOpts = {
		url: API + url,
		data: data,
		method: method,
		header: {
			'X-Requested-With': 'XMLHttpRequest',
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		dataType: 'json',
		
	}

	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				// if(res[1].data.code == 10 || res[1].data.code == 11) {
				// 	uni.showToast({title:res[1].data.resule})
				// 	uni.setStorageSync("token",'')
				// 	uni.setStorageSync("mobile",'')
				// 	uni.navigateTo({url:'/pages/login/login'})
				// }
				
				resolve(res[1].data)
			}
		).catch(
			(response) => {
				console.log(response)
				uni.showToast({
					title:'服务器繁忙,请稍后再试',
					icon:'none'
				})
				reject(response)
			}
		)
	})
	return promise
};

const questToken = (url, method, data) => {
	let httpDefaultOpts = {
		url: API + url,
		data: data,
		method: method,
		header: {
			'token':uni.getStorageSync('token'),
			'X-Requested-With': 'XMLHttpRequest',
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		dataType: 'json',
		
	}

	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				if(res[1].data.code == 999) {
				// 	uni.showToast({title:res[1].data.resule})
				// 	uni.setStorageSync("token",'')
				// 	uni.setStorageSync("mobile",'')
					uni.reLaunch({url:'/pages/login/login'})
					
				}
				resolve(res[1].data)
			}
		).catch(
			(response) => {
				uni.showToast({
					title:'服务器繁忙,请稍后再试',
					icon:'none'
				})
				reject(response)
			}
		)
	})
	return promise
};


export default {
	// baseUrl,
	quest,
	questToken
}
