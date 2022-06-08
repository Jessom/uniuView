import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules.js'

import { testApi } from '@/common/apis/test.js'

Vue.use(Vuex) // vue的插件机制

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {
	lifeData = {}
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['token', 'uid', 'userInfo'];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}

// Vuex.Store 构造器选项
const store = new Vuex.Store({
	modules: modules,
	
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
		token: lifeData.token || '',
		uid: lifeData.uid || '',
		userInfo: lifeData.userInfo || {},
    },
	
	mutations: {
		save(state, payload) {
			Object.keys(payload).map(saveKey => {
				state[saveKey] = payload[saveKey]
				saveLifeData(saveKey, payload[saveKey])
			})
		}
	},
	
	actions: {
		async testApi({ commit }, params) {
			const res = await testApi(params)
			return res
		},
	}
})

export default store
