<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { verify } from "~/utils";
import { Toast } from "vant";
import { mapMutations } from "vuex";
import Cookie from "js-cookie";

export default {
  data() {
    return {
      //表单参数
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["updateToken", "updateUserInfo"]),

    //登录时表单字段
    async onSubmit(values) {
      console.log("submit", values);

      //表单校验
      const msg =
        verify.username(this.username) || verify.password(this.password);

      //判断信息
      if (msg) {
        Toast(msg);
      }

      //表单校验通过
      const {
        status,
        userInfo: { token, username, mobile },
      } = await this.$api.Login(values);

      //判断状态
      if (status == 200) {
        //存储token到vuex中
        this.updateToken(token);

        //存储用户数据到vuex中
        this.updateUserInfo({
          username,
          mobile,
        });

        //存储token 和 用户信息到cookie
        Cookie.set("token", token);

        //跳转到首页
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>