<template>
  <div class="swiper-container">
    <p class="title-level2 default-item">
      <span class="sort">排名</span>
      <span class="name">分行或总行业务部门</span>
      <span class="complaint-counts">总行来访投诉量</span>
      <span class="timely-access-rate">接访及时率</span>
      <span class="repeat-petition-rate">重复信访率</span>
    </p>
    <swiper
      class="my_swiper"
      ref="visitingComplaintSwiper"
      :options="swiperOption"
      @slideChange="slideChange"
      v-loading="quaEnpSwiperLoading"
    >
      <swiper-slide v-for="(item, index) in picList" :key="index">
        <div class="default-item">
          <div class="sort">{{ index + 1 }}</div>
          <div class="name">{{ item.label }}</div>
          <span class="complaint-counts"
            >{{ item.complaintCounts }} <i class="unit">件</i></span
          >
          <span class="timely-access-rate">{{ item.timelyAccessRate }}%</span>
          <span class="repeat-petition-rate"
            >{{ item.repeatPetitionRate }}%</span
          >
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      activeSlide: 0,
      picList: [
        {
          label: "江西分行",
          complaintCounts: 5732,
          timelyAccessRate: 62.45,
          repeatPetitionRate: 23.45,
        },
        {
          label: "山东分行",
          complaintCounts: 4472,
          timelyAccessRate: 72.45,
          repeatPetitionRate: 13.45,
        },
        {
          label: "广西分行",
          complaintCounts: 2123,
          timelyAccessRate: 32.48,
          repeatPetitionRate: 26.64,
        },
        {
          label: "云南分行",
          complaintCounts: 1246,
          timelyAccessRate: 52.45,
          repeatPetitionRate: 12.45,
        },
        {
          label: "河南分行",
          complaintCounts: 10020,
          timelyAccessRate: 49.19,
          repeatPetitionRate: 19.98,
        },
        {
          label: "北京分行",
          complaintCounts: 9901,
          timelyAccessRate: 57.21,
          repeatPetitionRate: 10.45,
        },
      ],
      activeIndex: 0,
      quaEnpSwiperLoading: false,
      swiperOption: {
        direction: "vertical", // Swiper的滑动方向,可设置为水平方向切换 horizontal（默认） 或垂直方向切换
        slidesPerView: "auto", // Swiper的列数
        loop: true, // 无缝轮播
        spaceBetween: 5, // 板块间距
        centeredSlides: false,
        speed: 2000,
        fadeEffect: true,
        // 设置自动轮播
        autoplay: {
          delay: 200, // 2秒切换一次
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        height: 200,
        observer: true,
        observeParents: true,
        grabCursor: false, // 覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状
      },
    };
  },
  created() {},
  mounted() {},
  computed: {
    swiper() {
      return this.$refs["visitingComplaintSwiper"].swiper;
    },
  },
  methods: {
    slideChange() {
      this.activeIndex = this.$refs.visitingComplaintSwiper.swiper.activeIndex;
    },
  },
};
</script>
   <style lang="less" scoped>
.swiper-container {
  .title-level2 {
    margin-top: 11px;
    color: #ffffff;
    font-weight: 700;
    text-shadow: 0px 0px 30px rgba(30, 242, 255, 0.3);
    font-size: 12px;
    letter-spacing: 0.05em;
    position: relative;
    height: 30px;
    line-height: 30px;
    padding-left: 40px;
    text-align: left;
    background: url("../../assets/image/title3.png");
    background-size: 100% 100%;
    display: flex;
    margin-bottom: 8px;
  }
  width: 100%;
  height: calc(100% - 38px);
  margin-left: 0;
  margin-right: 0;
  display: inline-block;
  .my_swiper {
    height: 200px;
  }
  .swiper-slide {
    width: 100%;
    height: 43px !important;
    background: url(../../assets/image/qualified-enp/default.png);
    background-size: 100% 100%;
    padding-left: 30px;
    padding-right: 10px;
    .default-item {
      padding: 0px 12px;
      display: flex;
      align-items: center;
      height: 100%;
      line-height: 46px;
      justify-content: space-between;
      .count {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: #ffffff;
        text-shadow: 0px 0px 20px #257cff;
        span {
          color: #d1e2ff;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
  }
  /deep/.swiper-slide-active {
    display: inline-block;
    // height: 93px !important;
    background-image: url(../../assets/image/qualified-enp/active_bg.png);
    background-size: 100% 100%;
    .sort,
    .name,
    .complaint-counts {
      color: #ffe600;
      font-weight: 700;
      font-size: 14px;
      line-height: 24px;
    }
    .complaint-counts i {
      font-weight: 400;
    }
    .active-item {
      text-align: left;
      padding-left: 40px;
    }
    .default-item {
      .count {
        color: #ffe600;
        font-weight: 700;
        font-size: 16px;
        span {
          color: #ffffff;
          font-weight: 400;
          font-size: 12px;
          margin-left: 4px;
        }
      }
    }
  }
}
.default-item {
  display: flex;
  width: 100%;
  padding-right: 19px;

  .sort {
    flex: 1;
    text-align: left;
  }
  .name {
    flex: 3;
    text-align: left;
  }
  .complaint-counts {
    flex: 2;
    text-align: right;
    .unit {
      font-size: 12px;
    }
  }
  .timely-access-rate {
    flex: 2;
    text-align: right;
  }
  .repeat-petition-rate {
    flex: 2;
    text-align: right;
  }
}
</style>
  