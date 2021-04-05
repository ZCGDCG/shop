<template>
  <div>
  <div class="goods">
    <div class="menu-wrapper" ref="left">
      <ul ref="leftUI">
        <!-- current -->
        <li class="menu-item" v-for="(good,index) in goods" :key=index :class="{current:index===currentIndex}" @click="SelectItem(index)">
            <img class="icon" :src="good.icon" v-if="good.icon">
            <span class="text bottom-border-1px">{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="right">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index" >
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showDetail(food)">
              <div class="icon" >
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.decoration}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food='food'/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart/>
  </div>
    <Food :food='food' ref="food"/>
</div>
</template>
<script type="text/ecmascript-6">
  import Food from '@/components/Food/Food.vue'
  import ShopCart from '@/components/ShopCart/ShopCart.vue'
  import {mapState} from "vuex"
  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        tops:[0,5,7],
        scrollY:6,
        food:{},
        isShowFood:false
      }
    },
    computed:{
      ...mapState({
        goods:state=>state.shop.goods
      }),
       currentIndex(){
        const{scrollY, tops}=this
        const index= tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1])
        if(this.index!=index && this.leftBScroll){
          this.index=index
          const li=this.$refs.leftUI.children[index]
          this.leftBScroll.scrollToElement(li,300)
        }
        return index
      }
    },
    components:{
      Food,
      ShopCart,
    },
    mounted(){
      //如果数据有了，进行初始化
      if(this.goods.length>0){
          this.initScroll()
          this.initTops()
      }
    },
    /* mounted(){
      new BScroll(this.$refls.left,{})
      new BScroll(this.$refs.right,{})
    }, */
    //若是数据没有在初始化页面的时候出现，可以使用下面的
    watch:{
      goods(){//数据有了
        this.$nextTick(()=>{//列表开始显示了
          this.initScroll()
          this.initTops()
        })
      }
    },
    methods:{
      initScroll(){
        this.leftBScroll=new BScroll(this.$refs.left,{
          click: true//允许点击事件的发生
        })
        this.rightBScroll= new BScroll(this.$refs.right,{
          //probeType:1,//非实时的
          //probeType:2,//实时的，不具有惯性
          probeType:1,//实时的，惯性，编码
          click:true, //允许点击事件的发生
        })
        //给右侧列表绑定scroll事件监听
        this.rightBScroll.on('scroll',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
        //给右侧列表绑定scrollEnd事件监听
        this.rightBScroll.on('scrollEnd',({x,y})=>{
          this.scrollY=Math.abs(y)
        })
        
      },
      initTops(){
        const tops=[]
        let top=0
        //把第一个放到数组中
        tops.push(top)
        //获取右边列表中的第一层的li的数组，伪数组转化为真数组
        const lis=Array.prototype.slice.call(this.$refs.rightUl.children)
        lis.forEach(li => {
          top+=li.clientHeight
          tops.push(top)
        });
        this.tops=tops
      },
      //这些还不够，因为scroll-better是把原来的点击事件给禁掉了，需要在配置对象中打开
      SelectItem(index){
        const top=this.tops[index]
        //点击之后立即改变左侧列表的样式
        this.scrollY=top
        //调用scrollB的函数
        this.rightBScroll.scrollTo(0,-top,300)
      },
      showDetail(food){
          //组件对象，就是组件标签对象
          this.food=food
          this.$refs.food.changeISshowFood()
        }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 auto
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
