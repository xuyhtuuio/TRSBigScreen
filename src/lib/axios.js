// 导入axios
/* eslint-disable */
import axios from "axios";
import Qs from "qs";
import Vue from 'vue';
import { Encrypt, Decrypt } from '@/lib/crypto/module';
import {
  Message
} from "element-ui";
import md5 from "js-md5";
import router from "@/router";

// cancel集合，避免互相冲突 <method:url>做主键，适配Restful方式
const CancelToken = axios.CancelToken
let cancelCollection = new Map()

const noToken = ["/uaa/oauth/token", "/uaa/captcha", "/teis/loginByPwd", "/uaa/validCodeSms"];
const noSuccess = [
  "/uaa/oauth/token",
  "/uaa/captcha",
  "/uaa/validCodeSms",
  "/uaa/oauth/check_token",
  "/teis/loginByPwd",
  '/teis/company/getAutoInput'
];
// 需要加密的接口-GET接口只有返回值解密，POST接口需要传参加密返回值解密
let enbaleEncryptUrl = [
  'GET:/teis/industry/getIndustryLvTwo',
  'POST:/teis/product/getChildrenTreeByCode',
  'GET:/teis/industry/getNationalIndustryLvOne',
  'POST:/teis/industry/getNationalChildrenTreeByCode',
  'GET:/teis/industry/getNationalIndutryTree',
  'GET:/teis/industry/getSpecialIndustryLvOne?type=1',
  'POST:/teis/industry/getSpecialIndustryByCode',
  'GET:/teis/industry/keyPointIndustry',
  'GET:/teis/industry/getOwnIndustryDepth3?type=1',
  'GET:/teis/industry/getOwnIndustryDepth3?type=2',
  'GET:/teis/industry/getOwnIndustryDepth3?type=3',
  'GET:/teis/industry/getOwnIndustryDepth3?type=4',
]

// object对象存放每次new CancelToken生成的方法
const source = {};

// 每次请求前都会把api放在此数组中，响应成功后清除此请求api
const requestList = [];

// 1. 创建新的axios实例，
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 12 * 5000,
});

// 2.请求拦截器
service.interceptors.request.use(
  (config) => {
    let {
      url,
      isCancel,
      params,
      data,
    } = config;
    const {
      method
    } = config;
    // 默认不传为get请求
    if (!method) {
      config.method = "get";
    }
    // 对url&params加密，& 存入内容中
    const md5Str = md5Url(url, config);
    if (requestList.length) {
      cancelRequest(md5Str);
    }
    if (
      config.contentType === "application/x-www-form-urlencoded;charset=utf-8"
    ) {
      config.headers = {
        "Content-Type": config.contentType,
      };
      config.data = Qs.stringify(config.data);
    } else if (config.contentType === "application/x-www-form-urlencoded") {
      config.headers = {
        "Content-Type": config.contentType,
      };
      config.data = Qs.stringify(config.data);
    } else if (config.contentType === "multipart/form-data") {
      config.headers = {
        "Content-Type": config.contentType,
      };
    } else if (
      config.contentType === "application/octet-stream;charset=utf-8"
    ) {
      config.headers = {
        "Content-Type": config.contentType,
      };
    } else {
      // 判断是否加密
      const allUrl = method.toLocaleUpperCase() + ':' + url
      if (config.data && enbaleEncryptUrl.includes(allUrl)) {
        config.data = Encrypt(JSON.stringify(config.data))
      } else {
        config.data = JSON.stringify(config.data)
      }
      config.headers = {
        "Content-Type": "application/json",
      };
    }

    const ipos = config.url.indexOf("?");
    const str1 = config.url.substring(0, ipos);
    if (ipos > -1) {
      url = str1;
    }
    if (noToken.indexOf(config.url) === -1) {
      // 产业大脑会话保持
      const satoken = window.localStorage.getItem('AI_token');
      satoken && (config.headers.Authorization = `bearer ${satoken}`)
      // 风控请求
      const Authorization = window.localStorage.getItem("Authorization");
      (Authorization && config.url.indexOf('/consumer_test/') === 0) && (config.headers.Authorization = `bearer ${Authorization}`)
    }
    // 根据接口判定 导出文件流
    const downloadUrl = [
      "/rulemark/dcuMark/downloadRule",
      "/rulemark/dcuMark/exportCfCompanay",
      "/rulemark/result/exportByTaskId",
      '/teis/product/down',
      '/teis/macro/GDPExcel'

    ];
    if (downloadUrl.indexOf(config.url) !== -1) {
      config.responseType = 'blob'; // 服务请求类型

    }
    // 请求前将api推入requestList，cancelToken存入source
    config.cancelToken = new axios.CancelToken((c) => {
      source[md5Str] = c;
      // 此请求可能在某个时机需要终止
      if (isCancel) {
        cancelCollection.set(`${method.toUpperCase()}:${url.toLowerCase()}:${Object.entries(method.toUpperCase() === 'GET' ? params : data).toString()}`, c)
      }
    });
    requestList.push(md5Str);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status === 200 && enbaleEncryptUrl.includes(response.config.method.toUpperCase() + ':' + response.config.url)) {
      response.data = JSON.parse(Decrypt(response.data))
    }
    const md5Str = md5Url(response.config.url, response.config);
    // 请求完成后，将此请求从请求列表中移除
    requestList.splice(
      requestList.findIndex((el) => el === md5Str),
      1
    );
    
    if (response.data.status === 401) {
      const name =  window.self === window.top ? 'login' : 'loginAuto';
      router.push({
        name,
      });
    } else if (response.data.status !== 200) {
      // 兼容直接返回blob实体的情况
      if (response.config.responseType === "blob") {
        return response;
      }
      // 不需要显示错误信息的添加showErrorMsg配置
      if (response.config.showErrorMsg !== false) {
        response.data.msg ? Message.error(response.data.msg) : "";
      }
      // 没有success标识的特殊接口需要catch
      if (!noSuccess.includes(response.config.url)) {
        return Promise.reject(response);
      }
    }
    // if (response.data.status) {
    //   window.localStorage.removeItem("AI_token");
    // }
    if (response.data === undefined) {
      return;
    }
    return response.config.responseType === "blob" ? response : response.data;

  },
  (error) => {
    if (axios.isCancel(error)) {
      // 终止请求后，移除api
      requestList.splice(
        requestList.findIndex((el) => el === error),
        1
      );
    } else if (error && error.response && error.config.msg !== false) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.msg = "错误请求";
          break;
        case 401:
          if (!['login', 'loginAuto'].includes(router.app._route.name)) {
            const name =  window.self === window.top ? 'login' : 'loginAuto';
            router.push({
              name,
            });
          }
          break;
        case 403:
          error.msg = "拒绝访问";
          break;
        case 404:
          error.msg = "请求错误,未找到该资源";
          // window.location.href = "404"
          break;
        case 405:
          error.msg = "请求方法未允许";
          break;
        case 408:
          error.msg = "请求超时";
          break;
        case 500:
          // error.msg = '服务器端出错'
          break;
        case 501:
          error.msg = "网络未实现";
          break;
        case 502:
          error.msg = "网络错误";
          break;
        case 503:
          error.msg = "服务不可用";
          break;
        case 504:
          error.msg = "网络超时";
          break;
        case 505:
          error.msg = "http版本不支持该请求";
          break;
        default:
          error.msg = `连接错误${error.response.status}`;
          break;
      }
      error.msg ? Message.error(error.msg) : "";
    } else if (JSON.stringify(error).includes("timeout") && error.config.msg !== false) {
      // 超时处理
      Message.error("服务器响应超时，请刷新当前页面");
    }
    return Promise.reject(error.response ? error.response : {});
  }
);

function md5Url(url, config) {
  const params = config.params ? config.params : config.data;
  return md5(url + JSON.stringify(params));
}

function cancelRequest(api, allCancel) {
  // 请求列表里存在此api，即发起重复请求，把之前的请求取消掉
  if (api && requestList.includes(api) && typeof source[api] === "function") {
    source[api](api);
    // requestList.splice(requestList.findIndex(el => el === api), 1)
  } else if (!api && allCancel) {
    // allCancel为true则请求列表里的请求全部取消
    requestList.forEach((el) => {
      source[el](el);
    });
    // requestList.length = 0;
  }
}
// 全局取消请求-此请求可能在某个时机需要终止
Vue.prototype.$requestCancel = function (reqConfig) {
  let { method = 'get', url = '' } = reqConfig || {}
  let key = `${method.toUpperCase()}:${url.toLowerCase()}`
  // 按规则获取对应的cancel函数 ，然后执行取消操作
  if (!reqConfig) {
    for (let item of cancelCollection.entries()) {
      const key = item[0]
      typeof cancelCollection.get(key) === 'function' && cancelCollection.get(key)()
      cancelCollection.delete(key)
    }
  } else {
    typeof cancelCollection.get(key) === 'function' && cancelCollection.get(key)()
    cancelCollection.delete(key)
  }
}

// 4.导入文件
export default service;
