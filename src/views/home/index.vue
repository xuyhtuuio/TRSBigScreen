<template>
  <div class="home">
    <!-- 视频背景 -->
    <div class="easyv-component">
      <video width="100%" autoplay="autoplay" loop="loop" muted="muted">
        <source :src="publicPath + '大屏背景视频.mp4'" type="video/mp4" />
      </video>
    </div>
    <div class="header">
      <img class="header-top" src="@/assets/image/header-top.png" />
      <p class="header-title">
        <!-- <span>产业大脑</span> -->
        <span>投诉感知大屏</span>
      </p>
    </div>
    <div class="content">
      <div class="content-left">
        <p class="title-level1">
          <span
            >投诉指标<span class="time-dec">（2023年1月1日至今）</span></span
          >
        </p>
        <complaintIndicators />
      </div>
      <div class="content-center"></div>
      <div class="content-right">
        <p class="title-level1">
          <span>排行榜（2023年1月1日至今）</span>
        </p>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-item">
        <p class="title-level1 title-level1_1">
          <span>不同业务投诉情况（2023年1月1日至今）</span>
        </p>
      </div>
      <div class="bottom-item">
        <p class="title-level1 title-level1_1">
          <span>总行来访投诉处理情况（2023年1月1日至今）</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import complaintIndicators from "@/views/complaintIndicators/index.vue";
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  created() {},
  watch: {},
  methods: {},
  components: {
    complaintIndicators,
  },
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  color: #fff;

  .easyv-component {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    mix-blend-mode: screen;
    filter: hue-rotate(34deg) saturate(200%);

    // pointer-events: auto;
    video {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -9999;
      width: 100%;
      height: 100%;
      object-fit: fill;
      opacity: 0.45;
      transform: none;
      filter: hue-rotate(34deg) saturate(200%);
    }
  }

  .header {
    height: 95px;
  }

  .content {
    margin: 8px 25px 25px;
    height: 662px;
    display: flex;
    .content-left {
      width: 362px;
    }
  }

  .content-right {
    width: 362px;
    position: relative;
    z-index: 2;
  }

  .content-center {
    flex: 1;
  }

  .bottom {
    margin: 0 25px 16px;
    height: 275px;
    position: relative;
    z-index: 10000;
    display: flex;
    .bottom-item {
      flex: 1;
    }
    .bottom-item:first-of-type {
      margin-right: 16px;
      flex: 1.26;
    }

    .enp-insight {
      text-align: left;
      display: flex;
    }
  }
}

.header {
  position: relative;

  .header-top {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .header-title {
    padding-top: 26px;
    font-weight: 700;
    font-size: 36px;
    line-height: 30px;
    color: #ffffff;

    span + span {
      font-size: 36px;
      background: linear-gradient(180deg, #fff0df 0%, #ccd7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      transform: matrix(1, 0, -0.09, 1, 0, 0);

      &::before {
        content: "|";
        padding: 0 16px;
        background: linear-gradient(
          90deg,
          rgba(58, 144, 206, 0.5) -0.21%,
          rgba(58, 144, 206, 0) 107%
        );
        font-size: 24px;
      }
    }
  }

  &-right {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    height: 120px;
    cursor: pointer;
  }
}

.content-center {
  position: relative;

  // overflow: hidden;
  .center-rotate-point {
    position: absolute;
    z-index: -1;
    width: 55%;
    top: 8%;
    left: 20%;
    -webkit-animation: gif 12s infinite linear;
    animation: gif 12s infinite linear;
  }
}

.title-level1 {
  color: #ffffff;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.05em;
  position: relative;
  height: 35px;
  line-height: 35px;
  padding-left: 45px;
  text-align: left;
  background: url("../../assets/image/title-bg.png");
  background-size: 100% 100%;
  margin-bottom: 10px;

  .time-dec {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    height: 28px;
    line-height: 28px;
  }

  &.title-level1_1 {
    background-repeat: no-repeat;
    background: url("../../assets/image/title-bg-1.png");
  }

  > span {
    position: relative;
    z-index: 10;
  }

  &::before {
    content: "";
    display: inline-block;
    width: 187px;
    height: 15px;
    background: url("../../assets/image/title-line1.png");
    background-size: 100% 100%;
    position: absolute;
    left: -50px;
    top: 5px;
    animation-name: titleAinimate_1;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-delay: 0s;
    -webkit-user-drag: none;
    filter: none;
    z-index: 5;
  }

  &::after {
    content: "";
    display: inline-block;
    width: 252px;
    height: 13px;
    background: url("../../assets/image/title-line2.png");
    background-size: 100% 100%;
    position: absolute;
    left: -100px;
    top: 15px;
    animation-name: titleAinimate_2;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 2s;
    animation-delay: 0s;
    -webkit-user-drag: none;
    filter: none;
    z-index: 1;
  }
}

@keyframes titleAinimate_1 {
  0% {
    opacity: 0.03;
    transform: none;
  }

  50% {
    opacity: 1;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)
      translate3d(50px, 0px, 0px);
  }

  100% {
    opacity: 0;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)
      translate3d(100px, 0px, 0px);
  }
}

@keyframes titleAinimate_2 {
  0% {
    opacity: 0.03;
    transform: none;
  }

  50% {
    opacity: 1;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)
      translate3d(100px, 0px, 0px);
  }

  100% {
    opacity: 0;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1)
      translate3d(200px, 0px, 0px);
  }
}

@keyframes gif {
  0% {
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateZ(360deg);
    transform: rotateZ(360deg);
  }
}
</style>
