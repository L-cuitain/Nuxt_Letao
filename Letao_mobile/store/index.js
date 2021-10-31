//存储公共数据
export const state = () => {
  return {
    token: '',
    userInfo: ''
  }
}


//调用同步方法
export const mutations = {
  //修改用户信息数据
  updateUserInfo(state,payload){
    //存储用户信息
    state.userInfo = payload;
  },
  //修改token
  updateToken(state,payload){
    //存储用户token
    state.token = payload;
  }
}


//调用异步方法
export const actions = {
  //只在服务器执行一次 路由切换不会执行
  nuxtServerInit({ commit } , { req }){
    // 定义token
    let token = "";
    //是否存在cookie
    if(req.headers.cookie){
      //解析token
      let parsed = require('cookieparser').parse(req.headers.cookie);
      //设置token
      token = parsed.token;

      //修改token
      commit('updateToken',token);
    }
  }
}