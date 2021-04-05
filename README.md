## 笔记
## FooterGuide
## $router和$route的区别
        $route：是路由信息对象，：包括path，params,hash,query,meta
        $router:是路由实例对象：包括路由的跳转方法，注册全局导航守卫的方法
## 设置动态的样式可以用
        :class="{on: $route.path==='/search'}"  //on是属性名，在路由组件中$router和$route是全局可见的，$router是在路由跳转的时候使用，$route可以在浏览器的vue组件中看到，是个对象，其中包含path...
        this.$router.push()
            跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
        this.$router.replace()
            同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
        this.$router.go(n)
            相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面
## 注册全局组件
        在入口文件处：(1.先引入，2.后注册)
            1.import Header from './components/Header/Header.vue'    
            2.Vue.component('Header', Header)
## 编程式跳转从父路由进入子路由（点击父路由上的某个控件）可以在控件中这样声明，括号中是子路由的路由
            @click="$router.push('/login')"
## swiper插件
        可以简单的制作轮播图（教程很容易就可以看懂）
            先安装：npm add swiper
            然后导入：import Swiper from 'swiper'  
                     import 'swiper/css/swiper.css' 
##  MongoDB 是非关系型数据库
            启动：mongod
## vuex状态数据管理
        vuex包含四大组成部分，都是对象
        state ：包含n状态数据属性的对象
        mutations ：包含n个直接更新状态数据方法的对象
        actions ：包含n个间接更新状态数据方法的对象
        getters ：包含n个状态数据计算属性的对象
        步骤：
        1.创建5个js文件（文件名如下）
        state:中放入状态数据
        mutations：放直接直接更新状态数据的方法
            先引入mutations-types中定义的函数名，然后进行数据的更改 []中的是引入的函数名，参数时需要赋值的变量，第一个为状态对象，第二个是从actions中传回的数据
                [RECEIVE_ADDRESS](state,address){
                    state.address=address
                },
        mutations-types：放mutations的方法名
        actions：放直接间接更新状态数据的方法
            引入外部获取数据的方法，创建需要的函数，参数为{commit,...},进行异步调用外部的方法（需要用到await和async）
            成功的话就把数据传到mutation
        getters：放状态数据计算属性的方法
        store：是vuex最核心的对象
            相当于一个汇总的工作，除了必要的引入外，再把之前的四个文件都引入到这里面，声明插件的使用，向外导出这四个对象
        vuex其中有两个方法，commit和dispatch
            commit：用于在actions中把数据传到mutation中，相当于间接改变数据
            dispatch：this.$store.dispatch('函数名')，通过此种方法进行调用直接改变数据，函数名是actions中定义的函数名
## 在vue中为标签添加唯一标识用
        ref='名字'    
        调用的时候：this.$refs.名字 
## 伪数组变成数组
        Array.prototype.slice.call(this.$refs.rightUl.children)
        this.$refs.rightUl.children  rightUl获取下的所有的子元素
## 取绝对值
        Math.abs(y)  //y的绝对值
## 向响应式对象中添加一个property，并确保这个新 property 同样是响应式的属性
        Vue.set( target, propertyName/index, value )
            其中添加的属性名需要加引号
## 遗留问题
        过度动画
## 阻止冒泡
        @click.stop='事件名'
## vue-lazy-load的使用
        1.引入（在入口文件中）
            不用下载因为vue自带了

            mport VueLazyload from 'vue-lazyload'
        2.在vue中声明使用
            Vue.use(VueLazyload, {
            loading: loading,
            })
            //第二个参数时配置对象，其中loading是指定懒加载的图片，
            //我在项目中是直接引入的 import loading from '@/common/images/loading.gif'
        3.在需要进行懒加载的地方，把src改成v-lazy:'路径'
## 从某个mutation-type中读取某个属性时（从外部引入的库中读取也是一样的道理）
        import {xxxx} from '../../vuex/mutations-type'
        要加花括号
                    



