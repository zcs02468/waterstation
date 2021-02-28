import axios from "axios";
import store from "../store/index";
// import { Message } from 'ant-design-vue';

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers["Cache-Control"] = "no-cache";
// 创建一个 axios 实例
const Axios = axios.create({
  // baseURL: '/api',
  timeout: 8000,
});

// 请求拦截器
Axios.interceptors.request.use(
  (config) => {
    // let token = window.sessionStorage.getItem("websiteToken");
    // if (token) {
    //   config.headers["Authorization"] = token;
    // }
    return config;
  },
  (error) => {
    // 发送
    return Promise.reject(error);
  }
);

// 响应拦截器
Axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          store.state.isShowLogin = true;
          error.message = "拒绝访问";
          break;
        case 403:
          store.state.isShowLogin = true;
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    // Message.error(error.message);
    return Promise.reject(error);
  }
);

export default Axios;