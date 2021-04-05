/* 
首页功能模块
*/
import {
    reqAddress,
    reqFoodList,
    reqShopList,
} from '../../api/index'
import {
    RECEIVE_ADDRESS,
    RECEIVE_FOODLIST,
    RECEIVE_SHOPLIST,
} from '../mutations-type'
export default{
    state:{
        latitude: 37.797666, // 纬度
        longitude: 112.591516, // 经度
        address: {}, // 地址信息对象
        FoodList: [], // 分类数组
        ShopList: [], //商家数组
    },
    mutations:{
        [RECEIVE_ADDRESS](state,address){
            state.address=address
        },
        [RECEIVE_FOODLIST](state,FoodList){
            state.FoodList=FoodList
        },
        [RECEIVE_SHOPLIST](state,ShopList){
            state.ShopList=ShopList
        },
    },
    actions:{
        /* 
        获取当前地址信息的异步action
        */
        async getAddress({commit,state}){
            const{longitude,latitude}=state
            //发起请求
            const result=await reqAddress(longitude,latitude)
            //请求成功则向mutation发送数据
            if(result.code==0){
                const address=result.data
                commit(RECEIVE_ADDRESS,address)
            }
        },
        /* 
        异步获取食品列表信息
        */
        async getFoodList({commit},callback){
            const result=await reqFoodList()
            //请求成功则向mutation发送数据
            if(result.code==0){
                const FoodList=result.data
                commit(RECEIVE_FOODLIST,FoodList)
                //判断传回的callback是否是函数类型，是的话在进行调用
                typeof callback==='function'&&callback()
            }
        },
        /* 
        获取商家信息的异步action
        */
        async getShopList({commit,state}){
            const{longitude,latitude}=state
            //发起请求
            const result=await reqShopList({longitude,latitude})
            //请求成功则向mutation发送数据
            if(result.code===0){
                const ShopList=result.data
                commit(RECEIVE_SHOPLIST,ShopList)
            }
        },
    },
    getters:{}
}