/*
vuex 的actions 模块
*/
/*
通过mutation间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopRatings,
  reqShopGoods,
  reqShopInfo,
  reqSearchShop
} from '../api'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },

  // 异步获取食品分类列表
  async getCategorys({commit}) {
    const result = await reqFoodCategorys()
    commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },

  // 异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops : result.data})
  },
  //同步获取用户信息
  getUserInfo({ commit },userInfo) {
    commit(RECEIVE_USERINFO,{userInfo})
  },

  //异步获取用户信息
  async gainUserInfo({commit}) {
    const res = await reqUserInfo()
    if (res.code === 0) {
      const userInfo = res.data
      commit(RECEIVE_USERINFO,{userInfo})
    }
  },
  //用户登出
  async logout({ commit }) {
    const res = await reqLogout()
    if (res.code === 0) {
      commit(RESET_USERINFO)
    }
  },
  //异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了, 通知一下组件
      callback && callback()
    }
  },
}
