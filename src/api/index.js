/* 
包含n个接口请求函数的模块
*/

import ajax from './ajax'

//根据经纬度获取位置详情
export const reqAddress=(longitude,latitude)=>ajax(`/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqFoodList=()=>ajax('/index_category')

//根据经纬度获取商铺列表
export const reqShopList=({longitude,latitude})=>ajax('/shops', {params:{longitude,latitude}})
// 根据经纬度和关键字搜索商铺列表
export const reqSearchShop=(geohash,keyword)=>ajax.get('/search_shops', {params:{geohash,keyword}})
// 用户名密码登陆
//export const reqPwdLogin=({name,pwd,captcha})=>ajax('/login_pwd', {params:{name,pwd,captcha}},'POST')
export const reqPwdLogin = ({name,pwd,captcha}) => ajax.post('/login_pwd', {
    // url: '/sendcode',
        name,
        pwd,
        captcha
  })
// 发送短信验证码
//export const reqSendCode = (phone) => ajax('/sendcode', {phone})
export const reqSendCode = (phone) => ajax.get('/sendcode', {
    // url: '/sendcode',
    params: {
      phone
    }
  })
// 手机号验证码登陆
//export const reqSmsLogin=(phone,code)=>ajax('/login_sms', {params:{phone,code}},'POST')
export const reqSmsLogin = ({phone,code}) => ajax.post('/login_sms', {
    // url: '/sendcode',
        phone,
        code
  })
//自动登陆
export const reqAutoLogin = () => ajax.get('/auto_login')
// 获取goods
export const reqGoods = () => ajax('/goods')
// 获取ratings
export const reqRatings = () => ajax('/ratings')
// 获取info
export const reqInfo = () => ajax('/info')
