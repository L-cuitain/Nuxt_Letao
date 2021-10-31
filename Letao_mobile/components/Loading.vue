<template>
    <!-- 加载组件 -->
    <van-overlay :show="show"  class="loading">
      <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
    </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      //控制遮罩显示隐藏
      show: false,
    };
  },
  methods: {
    //loading开始加载
    start(){
        //开启遮罩
        this.show = true;
    },
    //loading结束加载
    finish(){
        //隐藏遮罩
        this.show = false;
    }
  },
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>