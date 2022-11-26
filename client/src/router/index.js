import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home/Home.vue';
import Order from '../pages/Order/Order.vue';
import Person from '../pages/Person/Person.vue';
import Search from '../pages/Search/Search.vue';
import Login from '../pages/Login/Login.vue';
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'


Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/person',
      component: Person,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          component: ShopRating
        },
        {
          path: '',
          redirect:'/shop/goods'
        }

      ]
      
    }
  ]
})