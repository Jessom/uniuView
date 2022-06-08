import config from '@/common/config.js'

export const testApi = (params) => uni.$u.http.post(`${config.baseUrl}/test`, params)
