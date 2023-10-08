<template>
<!-- :style="{height: normalHeight + 'px'}" -->
  <div class="login" id="login" >
    <div class="login_left">
      <div class="left_content">
        <div class="content_desc">
          <img src="../../assets/image/login_logo.png"/>
          <span>欢迎使用产业大脑平台</span>
        </div>
        <div class="login_insert">
          <!-- <i class="iconfont Vector2" ></i> -->
          <img src="../../assets/image/login_insertPic.png"/>
        </div>
      </div>
    </div>
    <div class="login_right">
      <span>登录账户</span>
      <el-form ref="login_form" :model="login_form" :rules="rules" class="login_form">
        <el-form-item prop="name">
          <i class="iconfont Vector2" ></i>
          <el-input v-model="login_form.name" :placeholder="`点击输入${isMoblie ? '手机号' : '用户名'}`">
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd" v-if="!isMoblie">
          <i class="iconfont Vector3" ></i>
          <el-input v-model="login_form.pwd" placeholder="点击输入密码" :type="picFlag?'password':'text'">
          </el-input>
          <img :src="picFlag?picHidden:picShow" @click="picHandler" class="pwdPic"/>
        </el-form-item>
        <el-form-item prop="verify">
          <i class="iconfont Vector4" ></i>
          <el-input v-model="login_form.verify" placeholder="点击输入验证码">
          </el-input>
          <div v-if="isMoblie" class="verify_code get_code">
            <span @click="getCodeMible">{{CodeMibleTxt}}</span>
          </div>
          <div v-else class="verify_code">
            <img v-if="verCode" :src="verCode" @click="verCodeChange"/>
          </div>
        </el-form-item>
      </el-form>
      <div class="pwd_operate">
        <div style="color: blue;cursor: pointer;" @click="changeLoginType">{{ isMoblie ? '密码' : '手机号' }}登录</div>
        <template v-if="!isMoblie">
          <div class="forget">
            <el-checkbox v-model="rem_pwd" class="remember">记住密码</el-checkbox>
            <div>忘记密码?</div>
            <div class="line"></div>
          </div>
        </template>
      </div>
      <div class="btns">
        <el-button @click="submitForm('login_form')" v-once-click>登录</el-button>
        <label @click="resign">注册</label>
      </div>
    </div>
  </div>
</template>

<script>
import {
  toCode,
  fromCode
} from '@/lib/utils';
const pwdHidden = require('../../assets/image/pwd_hidden.png');
const pwdShow = require('../../assets/image/pwd_show.png');
export default {
  name: 'login-page',
  data() {
    return {
      isMoblie: true,
      login_form: {
        name: '',
        pwd: '',
        verify: '',
        verKey: ''
      },
      CodeMibleTime: 60,
      CodeMibleTimer: null,
      CodeMibleTxt: '获取验证码',
      rem_pwd: false,
      picFlag: true,
      picHidden: pwdHidden,
      picShow: pwdShow,
      verCode: '', // 是对验证码图片的储存
      rules: {
        name: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      normalHeight: document.documentElement.clientHeight,
      gohistory: false,
    };
  },
  watch: {
    normalHeight(val) {
      if (!this.timer) {
        this.normalHeight = val;
        this.timer = true;
        setTimeout(() => {
          this.timer = false;
        }, 400);
      }
    },
  },
  created() {
    window.localStorage.removeItem('AI_token');
    this.$store.state.userMess = {};
    this.$store.state.authorities = [];
    const userName = window.localStorage.getItem('AI_name');
    const pwd = window.localStorage.getItem('AI_pwd');
    this.login_form.name = userName || '';
    if (pwd) {
      this.login_form.pwd = fromCode(pwd);
      this.rem_pwd = true;
    }
    const _this = this;
    document.onkeydown = function (e) {
      e = window.event || e;
      if (
        (_this.$route.path === '/login' || _this.$route.path === '/')
        && (e.code === 'Enter' || e.code === 'enter')
      ) {
        _this.submitForm('login_form');
      }
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        this.normalHeight = window.fullHeight;
      })();
    };
  },
  methods: {
    resign() {
      window.open('http://www.aikn.trs.com.cn?from=teis')
    },
    submitForm(formName) {
      window.localStorage.removeItem('AI_auth');
      const _this = this;
      _this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let token;
          try {
            let res;
            if (this.isMoblie) {
              res = await this.loginByMible()
            } else {
              res = await this.loginByPwd()
            }
            if (!res.access_token) {
              this.$message.error(res.error_description)
              return;
            }
            token = res.access_token;
            window.localStorage.setItem('AI_token', token);
            window.localStorage.setItem('Authorization', res.access_token);
            window.localStorage.setItem('AI_name', _this.login_form.name);
            if (_this.rem_pwd === true) {
              window.localStorage.setItem(
                'AI_pwd',
                toCode(this.login_form.pwd)
              );
            } else {
              window.localStorage.removeItem('AI_pwd');
            }
            if (this.gohistory) {
              this.$router.go(-1);
            } else {
              const query = JSON.parse(localStorage.getItem('gohistory'))
              if (query) {
                this.$router.push({ name: 'home', query });
                return;
              }
              this.$router.push({ name: 'home' });
            }
          } catch {
            if (this.isMoblie) {
              _this.$message.error('手机号有误或不存在');
            } else {
              _this.$message.error('账号或密码错误');
            }
            _this.codeFun();
            _this.login_form.verify = '';
          }
        } else {
          return false;
        }
      });
    },
    changeLoginType() {
      this.isMoblie = !this.isMoblie
      if (!this.isMoblie) {
        this.codeFun()
      }
    },
    // 获取账号验证码
    async codeFun() {
      const res = await this.$http({
        url: this.$GLOBAL.uaa + 'captcha'
      });
      if (res === undefined) {
        this.$message.error('网络错误，请稍后再试');
        return;
      }
      // this.ruleForm.codeImg = res.data.image;
      this.verCode = res.data.image;
      this.login_form.verKey = res.data.key;
    },
    // 密码显示与隐藏
    picHandler() {
      this.picFlag = !this.picFlag;
    },
    // 点击改变验证码
    verCodeChange() {
      this.codeFun();
    },
    // 系统内部手机号验证码
    getCodeMible() {
      if (this.CodeMibleTime > 0 && this.CodeMibleTime < 60) {
        return;
      }
      clearInterval(this.CodeMibleTimer);
      this.CodeMibleTime = 60;

      this.$http({
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        url: this.$GLOBAL.uaa + 'validCodeSms',
        data: {
          phone: this.login_form.name
        }
      }).then(() => {
        this.CodeMibleTimer = setInterval(() => {
          if (this.CodeMibleTime <= 0) {
            this.CodeMibleTxt = '点击重新发送';
          } else {
            this.CodeMibleTxt = `剩余时间${this.CodeMibleTime}秒`;
            this.CodeMibleTime--;
          }
        }, 1000);
      }).catch(res => {
        if (['验证码还在有效期，请勿重复操作'].includes(res.data.msg)) {
          this.CodeMibleTimer = setInterval(() => {
            if (this.CodeMibleTime <= 0) {
              this.CodeMibleTxt = '点击重新发送';
            } else {
              this.CodeMibleTxt = `剩余时间${this.CodeMibleTime}秒`;
              this.CodeMibleTime--;
            }
          }, 1000);
        }
      })
    },
    // 登录（手机号+短信验证码）
    async loginByMible() {
      const res = await this.$http({
        method: 'post',
        contentType: 'application/x-www-form-urlencoded',
        url: this.$GLOBAL.uaa + 'oauth/token',
        data: {
          username: this.login_form.name,
          smscode: this.login_form.verify,
          grant_type: 'sms_code',
          client_id: 'teisdata',
          client_secret: 'secret'
        },
        msg: false
      });
      return res
    },
    // 登录（用户名+密码+图片验证码）
    async loginByPwd() {
      const res = await this.$http({
        method: 'post',
        url: this.$GLOBAL.uaa + 'oauth/token',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          username: this.login_form.name,
          password: this.login_form.pwd,
          verKey: this.login_form.verKey,
          verCode: this.login_form.verify,
          grant_type: 'password',
          client_id: 'teisdata',
          client_secret: 'secret'
        },
        msg: false
      });
      return res
    },
    loginIndex(e) {
      if (e.keyCode === 13) {
        this.$router.push({ name: 'chain-atlas-index' });
      }
    },
    loadLoginHeight() {
      const normalWidth = window.innerWidth;
      const normalHeight = window.innerHeight;
      window.onresize = function () {
        if (
          normalWidth > window.innerWidth
          || normalHeight < window.innerHeight
        ) {
          const height = document.documentElement.clientHeight;
          document.getElementById('login').style.height = height + 'px';
        }
      };
    },
    gunacha() {},
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from && from.name !== 'login' && from.fullPath !== '/') {
        vm.gohistory = true;
        localStorage.setItem('gohistory', JSON.stringify(from.query))
      }
    });
  },
};
</script>
<style lang="less" src="./login.less" scoped></style>
