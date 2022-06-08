import App from './App'
import Vue from 'vue'
import uView from 'uview-ui'
import store from './store'

Vue.use(uView)
// uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false
App.mpType = 'app'

// 路由拦截
import './permission';

const app = new Vue({
	store,
    ...App
})

// 引入请求封装
require('./common/request/index')(app)

app.$mount()
