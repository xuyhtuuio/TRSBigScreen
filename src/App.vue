<template>
  <div id="app">
    <div class="roor-content" :class="{dashboard: !['login', 'loginAuto'].includes($route.name)}"  :style="['login', 'loginAuto'].includes($route.name) ? {} : scaleCss">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as routes from '@/router/routers';
export default {
  name: 'App',
  data() {
    return {
      loading: false,
      routes: routes.default,
      path: '',
      userName: '',
      paddingFlag: true,
      scalseNum: 1,
      scalseNum2: 1,
      totalHeight: 400,
      Auth: {},
      show: false,
      // 需要keep-alive页面的name，若加入 keep-alive,则需监听对应 $route
      aliveNames: [],
      cssObj: {},
      scaleCss: {}
    };
  },
  computed: {},
  watch: {},
  created() {
    this.resize();
    window.addEventListener('resize', this.resize, true);
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener('resize', this.resize, true);
  },
  methods: {
    // 缩放
    resize() {
      const obj = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      obj.xScale = obj.width / 1920;
      obj.yScale = obj.height / 1080;
      obj.minScale = Math.min(obj.xScale, obj.yScale);
      window.minScale = obj.minScale;
      this.cssObj = obj;
      const translate = `translate(${(-50 * (1 - obj.xScale))}%,${(-50 * (1 - obj.yScale))}%) scale(${obj.minScale},${obj.minScale})`
      this.scaleCss = {
        transform: translate,
        '-webkit-transform': translate
      }
    },
  }
};
</script>

<style  lang="less">
body{
  overflow: hidden;
  background: #000000;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}
.dashboard{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1920px;
  height: 1080px;
  text-align: center;
  background: #071531;
  // background: url('./assets/image/backgound.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.go-top,.go-bottom {
  width: 32px;
  height: 32px;
  position: fixed;
  z-index: 9999;
  right: 4px;
  bottom: 50px;
  text-align: center;
  padding: 10px 6px;
  margin-bottom: 50px;
  border-radius: 24px;
  background: #ffffff;
  cursor: pointer;
  opacity: 0.8;
  border: 1px solid #eee;
  .el-icon-upload2, .el-icon-download {
    color: #505968;
    font-weight: 700;
  }
  span {
    font-size: 12px;
  }
}
.go-top{
  bottom:100px;
}
.to-top-tips,.to-bottom-tips {
  border-radius: 8px;
}
</style>
