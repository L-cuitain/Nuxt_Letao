<template>
  <div class="container">
    <!-- 头部 -->
    <header>
      <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <!-- 中间 -->
    <main>
      <Nuxt />
    </main>
    <!-- 底部 -->
    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item name="index" icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item name="category" icon="goods-collect-o" to="/category">分类</van-tabbar-item>
        <van-tabbar-item name="cart" icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item name="my" icon="user-o" to="/my">会员中心</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      title: ''
    };
  },
  methods: {
    onClickLeft() {
      Toast('返回');
    },

    //切换路由
    changeRouter(){
        this.title={
            index: '乐淘-首页',
            category: '乐淘-分类',
            cart: '乐淘-购物车',
            my: '乐淘-会员中心'
        }[this.$route.name]
        this.active = this.$route.name;
    }
  },
  mounted(){
      this.changeRouter();
  },
  watch: {
      //监听路由
      $route(){
        this.changeRouter();
      }
  }
};
</script>

<style>
</style>