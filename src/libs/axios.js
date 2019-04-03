import axios from 'axios'
import Vue from 'vue'
import Cookies from 'js-cookie'

export default function () {
  /* axios request 拦截器 */
  axios.interceptors.request.use(
    config => {
      config.baseURL = 'http://examination.winsour.com/'
      let jwtToken = Cookies.get('JWT-Token')
      if (jwtToken && config.url !== 'api/jwt-token') {
        // 添加JWT Token
        config.headers.common['Authorization'] = `Bearer ${jwtToken}`
      }
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )

  /* axios response 拦截器 */
  axios.interceptors.response.use(
    config => {
      return config.data
    },
    err => {
      if (err.message.toString().slice(-3) === '401') {
        Vue.prototype.$Message.error('登陆超时，请重新登陆...')
        setTimeout(function () {
          store.commit('logout')
          router.push({
            name: 'login'
          })
        }, 2000)
      }
      return Promise.reject(err)
    }
  )
  Vue.prototype.$axios = axios
}
