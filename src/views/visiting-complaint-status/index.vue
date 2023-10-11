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
            >{{ toThousands(item.complaintCounts) }}
            <i class="unit">件</i></span
          >
          <span class="timely-access-rate">{{ item.timelyAccessRate }}</span>
          <span class="repeat-petition-rate"
            >{{ item.repeatPetitionRate }}</span
          >
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { toThousands } from '@/lib/utils'

export default {
  data() {
    return {
      activeSlide: 0,
      picList: [
        {
          label: '石家庄分行',
          complaintCounts: '1197',
          timelyAccessRate: '76.61%',
          repeatPetitionRate: '21.10%'
        },
        {
          label: '无锡分行',
          complaintCounts: '934',
          timelyAccessRate: '64.00%',
          repeatPetitionRate: '19.80%'
        },
        {
          label: '杭州分行',
          complaintCounts: '909',
          timelyAccessRate: '53.00%',
          repeatPetitionRate: '31.00%'
        },
        {
          label: '长沙分行',
          complaintCounts: '982',
          timelyAccessRate: '51.00%',
          repeatPetitionRate: '33.41%'
        },
        {
          label: '北京分行',
          complaintCounts: '839',
          timelyAccessRate: '63.54%',
          repeatPetitionRate: '24.00%'
        },
        {
          label: '重庆分行',
          complaintCounts: '810',
          timelyAccessRate: '74.60%',
          repeatPetitionRate: '17.00%'
        },
        {
          label: '青岛分行',
          complaintCounts: '717',
          timelyAccessRate: '57.90%',
          repeatPetitionRate: '29.30%'
        },
        {
          label: '哈尔滨分行',
          complaintCounts: '709',
          timelyAccessRate: '66.91%',
          repeatPetitionRate: '16.90%'
        },
        {
          label: '宁波分行',
          complaintCounts: '698',
          timelyAccessRate: '57.90%',
          repeatPetitionRate: '19.20%'
        },
        {
          label: '海口分行',
          complaintCounts: '674',
          timelyAccessRate: '48.31%',
          repeatPetitionRate: '18.50%'
        },
        {
          label: '呼和浩特分行',
          complaintCounts: '636',
          timelyAccessRate: '44.76%',
          repeatPetitionRate: '21.70%'
        },
        {
          label: '南通分行',
          complaintCounts: '610',
          timelyAccessRate: '65.10%',
          repeatPetitionRate: '24.00%'
        },
        {
          label: '贵阳分行',
          complaintCounts: '592',
          timelyAccessRate: '59.77%',
          repeatPetitionRate: '19.40%'
        },
        {
          label: '合肥分行',
          complaintCounts: '501',
          timelyAccessRate: '49.08%',
          repeatPetitionRate: '15.50%'
        },
        {
          label: '苏州分行',
          complaintCounts: '498',
          timelyAccessRate: '57.20%',
          repeatPetitionRate: '20.10%'
        }
      ],
      activeIndex: 0,
      quaEnpSwiperLoading: false,
      swiperOption: {
        direction: 'vertical', // Swiper的滑动方向,可设置为水平方向切换 horizontal（默认） 或垂直方向切换
        slidesPerView: 'auto', // Swiper的列数
        loop: true, // 无缝轮播
        spaceBetween: 5, // 板块间距
        centeredSlides: false,
        speed: 2500,
        fadeEffect: true,
        // 设置自动轮播
        autoplay: {
          delay: 5, // 2秒切换一次
          stopOnLastSlide: false,
          disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        height: 200,
        observer: true,
        observeParents: true,
        grabCursor: false // 覆盖Swiper 时指针会变成手掌形状，拖动时指针会变成抓手形状
      }
    }
  },
  created() {},
  mounted() {},
  computed: {
    swiper() {
      return this.$refs['visitingComplaintSwiper'].swiper
    }
  },
  methods: {
    toThousands,
    slideChange() {
      this.activeIndex = this.$refs.visitingComplaintSwiper.swiper.activeIndex
    }
  }
}
</script>
<style lang="less" scoped>
.swiper-container {
  .title-level2 {
    margin-top: 11px;
    color: #ffffff;
    font-weight: 700;
    text-shadow: 0px 0px 30px rgba(30, 242, 255, 0.3);
    font-size: 14px;
    letter-spacing: 0.05em;
    position: relative;

    height: 30px;
    line-height: 30px;
    padding-left: 40px;
    text-align: left;
    background: url('../../assets/image/title3_long.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    background-attachment: fixed;
    margin-bottom: 8px;
  }
  .title-level2 > span {
    font-weight: 700;
  }

  width: 100%;
  height: calc(100% - 38px);
  margin-left: 0;
  margin-right: 0;
  display: inline-block;

  .my_swiper {
    height: 200px;
  }
  /deep/ .swiper-wrapper {
    transition-timing-function: linear !important; /* 没错就是这个属性 */
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
      font-weight: 700;
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
    font-weight: 700;
  }

  .complaint-counts {
    flex: 2;
    text-align: right;
    font-weight: 700;

    .unit {
      font-size: 12px;
      font-weight: 400;
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
