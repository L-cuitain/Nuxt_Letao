<template>
  <div class="category">
    <van-tree-select
      height="80vh"
      :items="oneCategoryList"
      :main-active-index.sync="active"
      @click-nav="categoryHandle"
    >
      <!-- 二级分类 -->
      <template #content> 
        <div class="category_sencond" v-for="item in twoCategoryList" :key="item.id">
          <van-image width="4rem" :src="item.brandLogo"/>
          <p>{{ item.brandName }}</p>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },

  async asyncData({ $api , query }){
    //读取路由参数 如果没有则默认为0
    let active = query.active || 0;
    
    let { oneCategoryList = [] } = await $api.OneCategoryList();

    //判断数据正常返回
    if(!oneCategoryList.length){
      return;
    }

    //遍历oneCategoryList
    oneCategoryList = oneCategoryList.map((item) => {
      return {
        text: item.categoryName,
        ...item
      };
    });
    //二级分类
    const { twoCategoryList } = await $api.TwoCategoryList(oneCategoryList[active]['id']);

    return{
      active,
      oneCategoryList,
      twoCategoryList
    }
  },

  methods: {
    async categoryHandle(index){
      //替换url路由传参
      this.$router.replace(`/category?active=${index}`);
      //切换分类选项
      let { twoCategoryList } = await this.$api.TwoCategoryList(this.oneCategoryList[index]['id']);
      this.twoCategoryList = twoCategoryList;
    }
  },
};
</script>

<style scoped>
.category_sencond {
  float: left;
  text-align: center;
}
</style>