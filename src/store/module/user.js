/*
 * @Description: 用户信息
 * @Author: WaynePeng
 * @Date: 2018-12-31 21:54:26
 * @LastEditTime: 2019-01-01 03:34:42
 * @LastEditors: WaynePeng
 */
import Cookies from 'js-cookie'
import { login } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    token: getToken(),
    access: '',
    hasGetInfo: true
  },
  mutations: {
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password, vm}) {
      // 去除左右的空格
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          vm
        })
        resolve()
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        Cookies.remove('JWT-Token')
        resolve()
      })
    }
  }
}
