// 页面白名单
const whiteList = [
	'/mine/login',
]

function hasPermission(url) {
	let lifeData = uni.getStorageSync('lifeData');
	// 在白名单中或有token，直接跳转
	if (whiteList.indexOf(url) !== -1 || lifeData.token) {
		return true
	}
	return false
}

uni.addInterceptor('navigateTo', {
	// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
	invoke(e) {
		let url = e.url.split("?")[0];
		if (!hasPermission(url)) {
			uni.reLaunch({
				url: '/mine/login'
			})
			return false
		}
		return true
	},
	success(e) {}
})

uni.addInterceptor('switchTab', {
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.reLaunch({
				url: '/mine/login'
			})
			return false
		}
		return true
	},
	success(e) {}
})
