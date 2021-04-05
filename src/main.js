import Vue from 'vue'
import 'lib-flexible'

import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue'
import CartControl from './components/CartControl/CartControl.vue'
import store from './vuex/store'
import *as API from '@/api'
import VueLazyload from 'vue-lazyload'
import loading from '@/common/images/loading.gif'
import './mock/mock-serve'
import './filters' // 加载自定义过滤器
import Splice from './components/Splice/Splice.vue'

// 注册全局组件
Vue.component('Header', Header)
Vue.component('CartControl', CartControl)
Vue.component('Splice', Splice)
Vue.use(VueLazyload, {
  loading: loading,
})
Vue.prototype.$API=API

new Vue({
  // components: {
  //   App
  // },
  // template: '<App/>'
  render: h => h(App),
  router, // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
  store,//所有组件都可以看到$store
}).$mount('#app')