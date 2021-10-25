<template>
  <div class="home">
    <!-- 轮播图组件 -->
    <IndexCarousel :swipeList="swipeList"/>
    <!-- 宫格组件 -->
    <IndexGridList :gridList="gridList"/> 
    <!-- 活动组件 -->
    <IndexActive /> 
    <!-- 品牌组件 -->
    <IndexBrand /> 
    <!-- 运动专区 -->
    <IndexSports :sportsList="sportsList"/> 

  </div>
</template>

<script>
export default {
  //请求轮播图
  async asyncData({ $axios }){
    //请求轮播图
    const {swipeList} = await $axios.$get('/swipeList');

    //请求宫格列表
    const { gridList } = await $axios.$get('/gridList');

    //获取运动专区
    const { sportsList } = await $axios.$get('/sportList');
    
    return{ 
      swipeList,
      gridList,
      sportsList
    }
  }
}
</script>
