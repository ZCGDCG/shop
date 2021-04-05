/* 
商品功能模块
*/
import Vue from 'vue'
import {
    reqGoods,
    reqRatings,
    reqInfo,
    reqSearchShop,
    reqShopList
} from '../../api/index'
import {
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART,
    SEARCH_SHOP,
} from '../mutations-type'
export default{
    state:{
        latitude: 37.797666, // 纬度
        longitude: 112.591516, // 经度
        goods: [], // 商品列表
        ratings: [], // 商家评价列表
        info: {}, // 商家信息
        cartFoods:[],//购物车中的食物的数量
        searchShop:[]
    },
    mutations:{
        [RECEIVE_INFO](state, {info}) {
            state.info = info
            },
            
        [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
        },
        
        [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
        },
        [ADD_FOOD_COUNT](state, {food}) {
            if(food.count){
                food.count++
            }else{
                //Vue.set( target, propertyName/index, value )
                //Vue.set(food,count,1)
                //food.count=1
                Vue.set(food,'count',1) //给food添加count属性，必须在属性名上加引号
                state.cartFoods.push(food)
            }
        },
        [REDUCE_FOOD_COUNT](state, {food}) {
            food.count--
            if(food.count===0){
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        },
        [CLEAR_CART](state){
            //先把cartFoods中food的count值边为0
            state.cartFoods.forEach(food => food.count=0);
            //重置cartFoods
            state.cartFoods=[]
        },
        [SEARCH_SHOP](state,searchShop){
            state.searchShop=searchShop
        },
        
    },
    actions:{
        // 异步获取商家信息
        async getShopInfo({commit}, cb) {
            const result = await reqInfo()
            if(result.code===0) {
            const info = result.data
            commit(RECEIVE_INFO, {info})

            typeof cb==='function' && cb()
            }
        },

        // 异步获取商家评价列表
        async getShopRatings({commit}, cb) {
            const result = await reqRatings()
            if(result.code===0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, {ratings})

            typeof cb==='function' && cb()
            }
        },

        // 异步获取商家商品列表
        async getShopGoods({commit}, cb) {
            const result = await reqGoods()
            if(result.code===0) {
            const goods = result.data
            commit(RECEIVE_GOODS, {goods})
            // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            typeof cb==='function' && cb()
            }
        },
        // 通过搜索异步获取商家商品列表
        async searchGetShopGoods({commit}) {
            const geohash='37.797666'+','+'112.591516'
            const result = await reqShopList(geohash)
            if(result.code===0) {
            const searchShop = result.data
            commit(SEARCH_SHOP, searchShop)
            }
        },
        updateFoodCount({commit},{isAdd,food}){
            if(isAdd){
            commit(ADD_FOOD_COUNT,{food})
            }else{
            commit(REDUCE_FOOD_COUNT,{food})
            }
        }
    },
    getters:{
        totalCount(state){
            return state.cartFoods.reduce((pre,food)=>pre+food.count,0)
        },
        totalPrice(state){
            return state.cartFoods.reduce((pre,food)=>pre+food.count*food.price,0)
        }
    }
}