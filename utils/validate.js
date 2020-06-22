// import Vue from 'vue'
const reg = {
	phone:/^1[3|4|5|6|7|8|9][0-9]{9}$/, // 手机号码验证
	pwd:/^[A-Za-z0-9]{6,16}$/,// 6-16位数字加字母
	pay:/^\d{6}$/  // 6位支付密码
}

export default {
	install(Vue) {
		Vue.prototype.$regPhone = reg
	}
}