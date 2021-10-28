<template>
  <div class="register">
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
      <van-field
        v-model="repeatPassword"
        type="repeatPassword"
        name="repeatPassword"
        label="确认密码"
        placeholder="请确认密码"
        :rules="[{ required: true, message: '请重新填写密码' }]"
      />
      <van-field
        v-model="mobile"
        type="mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="info"
            :disabled="isDisabled"
            @click="sendSMS"
            >{{ smsText }}</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="smscode"
        type="smscode"
        name="smscode"
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请重新填写验证码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>

    <!-- 会员协议 -->
    <van-row gutter="20">
      <van-col span="6"></van-col>
      <van-col span="12">
        <van-checkbox v-model="isAgree" shape="square">
          《同意阅读会员协议》
        </van-checkbox>
      </van-col>
      <van-col span="2"></van-col>
    </van-row>
  </div>
</template>

<script>
//引入
import { verify } from "~/utils";
import { Toast } from "vant";

export default {
  data() {
    return {
      //表单数据
      username: "",
      password: "",
      repeatPassword: "",
      mobile: "",
      smscode: "",
      //保存调用发送短信接口返回的验证码
      smscodeServer: "",
      //协议选中框
      isAgree: false,
      //发送短信可用状态
      isDisabled: false,
      //发送短信文案
      smsText:'发送短信'
    };
  },
  methods: {
    // values 提交表单所有数据
    async onSubmit(values) {
      console.log("submit", values);
      //是否勾选协议
      if(!this.isAgree){
        Toast('请勾选协议');
      }

      //表单校验
      const msg =
        verify.username(this.username) ||
        verify.password(this.password, this.repeatPassword) ||
        verify.mobile(this.mobile);

      //校验不通过 弹窗提示并退出
      if (msg) {
        Toast(msg);
        return;
      }

      //验证短信验证码
      if(this.smscode !== this.smscodeServer){
        Toast("验证码输入有误");
        return;
      }

      //调用注册接口
      const { status } = await this.$api.Register(values);
      if(status == 200){
        //注册成功把用户信息 存在vuex中

        //注册成功 跳转登录页
        this.$router.push('/my/login');
      }
    },

    //发送短信
    async sendSMS() {
      //调用发送短信接口
      //校验手机号是否合法
      const msg = verify.mobile(this.mobile);
      if(msg){
        Toast(msg);
        return;
      }

      //禁用按钮可用状态
      this.isDisabled = true;
      //发送定时器
      //定义时间 控制禁用时间
      let times = 30;
      this.timerId = setInterval(() => {
        times--;
        this.smsText = `剩余${times}秒`;
        if (times == 0) {
          //当时间为0时 按钮可用
          this.isDisabled = false;
          this.smsText = "发送短信"
          //清除定时器
          clearInterval(this.timerId);
        }
      }, 1000);

      //发送请求
      const { smscode } = await this.$api.SendSmsCode(this.mobile);

      //保存服务端返回的短信验证码
      this.smscodeServer = smscode;
      console.log(this.smscodeServer);
    },
  },
};
</script>

<style>
</style>