import Vue from 'vue'
import App from './App'

import utils from "@/utils/validate"
Vue.use(utils)

import '@/mixins/index'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

import API from './api/index';
import http from './request/request';
Vue.prototype.$API = API
Vue.prototype.$http = http

import store from './store/index'	
App.store = store


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
