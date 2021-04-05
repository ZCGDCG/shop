/* 
使用mockjs提供mock接口数据
*/
import Mock from 'mockjs'
import data from './data.json'//返回的是js对象（已经解析好了）

Mock.mock('/api/goods',{code:0,data: data.goods})
Mock.mock('/api/info',{code:0,data: data.info})
Mock.mock('/api/ratings',{code:0,data: data.ratings})

//不需要导出但是，需要在入口文件处进行引入