/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
    uni.$u.http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
        const data = response.data
		
		if(data.status) {
			/**
			 * 登录失效
			 */
			if(data.status.error_code == 1016) {
				uni.navigateTo({
					url: '/mine/login'
				})
				uni.hideLoading()
				return Promise.reject()
			}
			/**
			 * 其他错误状态，弹出提示框
			 */
			else if(data.status.error_code != 0 || !data.data) {
				uni.hideLoading()
				uni.$u.toast(data.status.error_desc)
				return Promise.reject(data)
			}
		}
		
        return data || {}
    }, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
		uni.hideLoading()
        return Promise.reject(response)
    })
}