import axios from 'axios'

import { config } from 'shared/lib/config.js'
import { tokenStore } from 'store'

const api = axios.create({
    baseURL: config.API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const store = JSON.parse(sessionStorage.getItem('token'))

    config.headers.Authorization = `Bearer ${store?.state?.token}`

    return config
})

api.interceptors.response.use(
    (config) => config,
    async (error) => {
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            const generalRequest = error.config

            generalRequest._isRetry = true

            try {
                const response = await axios.get(`${config.API_URL}/user/refresh`, { withCredentials: true })
                const storage = JSON.parse(sessionStorage.getItem('token'))

                storage.state.token = response.data.accessToken
                sessionStorage.setItem('token', JSON.stringify(storage))

                return api.request(generalRequest)
            } catch {
                sessionStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }

        throw error
    }
)

export default api
