<template>
  <div class="my">
    <div class="my_info">
      <h3>会员个人信息</h3>
      <p>
        <span>用户名:</span>
        <span>{{ userInfo.username }}</span>
      </p>
      <p>
        <span>手机号:</span>
        <span>{{ userInfo.mobile }}</span>
      </p>
      <van-button type="danger" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["userInfo", "token"]),
  },

  methods: {
    ...mapMutations(["updateUserInfo","updateToken"]),
    //退出登录
    logout() {
      console.log(this.token);
      //清除vuex中的token
      this.updateToken("");
      this.updateUserInfo("");
      //跳转首页
      this.$router.push('/my/login');
    },
  },
};
</script>

<style scoped>
.my_info{
  padding-left: 2rem;
}

</style>