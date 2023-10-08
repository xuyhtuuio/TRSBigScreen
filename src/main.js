/*
 * @Author: your name
 * @Date: 2021-12-30 09:34:45
 * @LastEditTime: 2022-02-16 14:27:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \trs-middle-platform-web\src\main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueContextMenu from 'vue-contextmenu';
import echarts from '@/assets/js/echarts-ui';
import $GLOBAL from '@/lib/const';
import Base64 from '@/lib/base64';

import http from '@/lib/axios'; /* eslint-disable */
import App from './App';
// import dataV from '@jiaminghi/data-view'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper)
// Vue.use(dataV)
import router from './router';
import store from './store'; // 开启 vuex
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.less';
import '@/assets/css/element.less';
import '@/assets/icon/iconfont.css';
import onceClick from './lib/click-once';
// import 'default-passive-events';
import mock from './mock'
// 是否启用mock
if ($GLOBAL.mock) {
  mock && mock.startMock()
}

window._AMapSecurityConfig = {
  securityJsCode: 'd84f7c05fbb777d4ab082630e0ccd7b0',
}

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$GLOBAL = $GLOBAL; // 全局常量
Vue.prototype.$http = http; // 请求库
Vue.prototype.$Base64 = Base64;

Vue.use(ElementUI);
Vue.use(VueContextMenu);
Vue.use(onceClick);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});

function receiveMessageFromIframePage(event) {
  // 接收父页面的  postmessage
  if (event.data && event.data.Authorization) {
    window.localStorage.setItem('AI_token', event.data.Authorization);
    if (window.location.href.indexOf('login') !== -1) {
      window.history.go(-1);
    } else {
      const search = window.location.href.slice(window.location.href.indexOf('?')+1);
      const query = {};
      if (search) {
        query[search.split('=')[0]] = search.split('=')[1]
      }
      router.push({
        name: 'home',
        query
      });
    }
  }
}
window.addEventListener("message", receiveMessageFromIframePage, false);
