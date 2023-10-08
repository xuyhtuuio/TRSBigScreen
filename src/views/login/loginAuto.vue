<template>
  <div style="heigth: 100vh" v-loading="loading"></div>
</template>

<script>
import { Decrypt } from '@/lib/crypto/module';
export default {
  name: 'login-page',
  data() {
    return {
      loading: true
    };
  },
  created() {
    /* console.log(Encrypt(JSON.stringify({
      username: '',
      password: '',
    }))) */
    this.autoLogin();
  },
  methods: {
    autoLogin() {
      const ifm = window.self === window.top;
      const ifmUrl = this.getParentUrl();
      if (ifm === false) {
        // false的话 页面被嵌套在iframe中
        const host = ['http://192.168.210.57:31588', this.$store.state.getImageUrl, 'https://ib.dataelite.trs.com.cn']
        const JiZrcqcbF = 'dDcBIw9REGHKEefMR+Mwzd5t7uYsAYhXKaN7iWXSbEGnnHYq8YZgNS0ft2kOd2oxrAAcbaSZvR6L/QrWhjW6HA==';
        if (ifmUrl.startsWith(host[0]) || ifmUrl.startsWith(host[1]) || ifmUrl.startsWith(host[2])) {
          this.$http({
            method: 'post',
            contentType: 'application/x-www-form-urlencoded',
            url: this.$GLOBAL.uaa + 'oauth/token',
            data: {
              ...JSON.parse(Decrypt(JiZrcqcbF)),
              grant_type: 'password',
              client_id: 'teisdata',
              client_secret: 'secret'
            },
            msg: false
          }).then((res) => {
            if (res.data) {
              window.localStorage.setItem('AI_token', res.data);
              window.localStorage.setItem('Authorization', res.access_token);
              window.history.go(-1);
            }
          });
        }
      }
    },
    getParentUrl() {
      let url = '';
      try {
        url = window.top.document.referrer;
      } catch (M) {
        if (window.parent) {
          try {
            url = window.parent.document.referrer;
          } catch (L) {
            url = '';
          }
        }
      }
      if (url === '') {
        url = document.referrer;
      }
      return url;
    },
  },
};
</script>
<style lang='less' src='./login.less' scoped></style>
