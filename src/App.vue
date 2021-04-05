<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
  export default {
    async mounted(){
      //通过dispatch把数据放到vuex上
      this.$store.dispatch('getAddress')
      this.$store.dispatch('autoLogin')
      console.log(this.$store.dispatch('autoLogin'));
    },
   
    components: {
      FooterGuide
    },
    methods:{
      
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

 
</style>
