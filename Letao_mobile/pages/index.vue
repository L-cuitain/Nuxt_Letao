<template>
  <div class="home">
    <!-- 轮播图组件 -->
    <IndexCarousel :swipeList="swipeList" />
    <!-- 宫格组件 -->
    <IndexGridList :gridList="gridList" />
    <!-- 活动组件 -->
    <IndexActive />
    <!-- 品牌组件 -->
    <IndexBrand />
    <!-- 运动专区 -->
    <IndexSports :sportsList="sportsList" />
  </div>
</template>

<script>
export default {
  //请求接口
  //asyncData 刷新页面时 , 运行在服务端,服务器调用服务端接口不存在跨域
  //跨域是浏览器一种安全策略 , 解决浏览器端跨域
  async asyncData({ $api }) {
    // //请求轮播图
    // const {swipeList} = await $axios.$get('/swipeList');

    // //请求宫格列表
    // const { gridList } = await $axios.$get('/gridList');

    // //获取运动专区
    // const { sportsList } = await $axios.$get('/sportList');

    //二次封装axios后请求
    // const { data: { swipeList } } = await $request.get('/swipeList');
    // const { data: { gridList } } = await $request.get('/gridList');
    // const { data: { sportsList } } = await $request.get('/sportList');

    //api封装后请求
    // const { swipeList } = await $api.IndexBanners();
    // const { gridList } = await $api.IndexGridList();
    // const { sportsList } = await $api.IndexSports();

    //并发请求
    //添加默认值
    const [{ swipeList = [] }, { gridList = [] }, { sportsList = [] }] = await Promise.all([
      $api.IndexBanners(),
      $api.IndexGridList(),
      $api.IndexSports(),
    ]);

    return {
      swipeList,
      gridList,
      sportsList,
    };
  },
};
</script>
