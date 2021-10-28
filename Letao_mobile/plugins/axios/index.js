const {
  httpcode
} = require('./httpcode');
import {
  Toast
} from 'vant';

export default function ({
  $axios,
  store,
  redirect
}, inject) {
  //请求拦截
  $axios.onRequest(config => {
    //请求时加载loading
    

    //在请求头设置token
    //已登录
    if (store.state.token) {
      $axios.setHeader('Authorization', `Bearer ${store.state.token}`);
    }
    console.log('Making request to ' + config.url)
    return config;
  })

  //响应拦截
  $axios.onResponse(res => {
    //响应时结束loading


    //获取 服务端 响应状态码
    const {
      status,
      message
    } = res.data;
    if (!status) {
      Toast(message);
    }
  })

  //错误拦截
  $axios.onError(error => {
    //http错误码
    const code = parseInt(error.response && error.response.status)

    //提示错误信息
    Toast(httpcode[code]);
    //错误处理
    if (code === 404) {
      redirect('404')
    } else if (code == 401) {
      //没有访问权限
      redirect('/my/login');
    }
  })

  //封装请求方法
  let requestMethod = {};
  ['$get', '$post', '$delete', '$put'].forEach(method => {
    // //区分请求参数 是params 还是data
    // let paramsOrData = method == 'get' || method == 'delete' ? 'params' : 'data';
    // //请求方法
    // requestMethod[method] = (url, data) => {
    //   return $axios({
    //     method,
    //     url,
    //     [paramsOrData]: data
    //   })
    // }

    //请求方法
    requestMethod[method] = (url,data)=>{
      return $axios[method](url,data);
    }
  });

  inject('request',requestMethod);
}
