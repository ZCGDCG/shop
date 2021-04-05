/* 
vuex最核心的属性对象
*/
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './modules/user'
import shop from './modules/shop'
import msite from './modules/msite'

//声明使用插件
Vue.use(Vuex)

export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules:{
        user,
        shop,
        msite
    }
})