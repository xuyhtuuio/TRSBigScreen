<template>
  <div class="statistics">
    <div class="clock">
      <p>{{ date }}</p>
      <p>周{{ week }}</p>
      <p class="font32">{{ time }}</p>
      <div class="split"></div>
    </div>
    <div class="statistic">
      <div>
        <p class="font16">全量投诉</p>
        <p class="font32">
          <CountTo :start-val="complaintsFull" :end-val="complaintsFullEnd" :duration="2000"></CountTo>件
        </p>
        <p>
          <span class="font16">今日投诉(实时)</span>
          <CountTo :start-val="complaintsFullToday" :end-val="complaintsFullTodayEnd" :duration="2000"></CountTo>件
        </p>
      </div>
      <div>
        <p class="font16">监管转办投诉</p>
        <p class="font32">
          <CountTo :start-val="complaintReferral" :end-val="complaintReferralEnd" :duration="2000"></CountTo>件
        </p>
        <p>
          <span class="font16">今日投诉(实时)</span>
          <CountTo :start-val="complaintReferralToday" :end-val="complaintReferralTodayEnd" :duration="2000"></CountTo>件
        </p>
      </div>
      <div>
        <p class="font16">15日办结率</p>
        <p class="font32">97.32%</p>
        <!-- <p class="font14 green">第5名</p> -->
      </div>
      <div>
        <p class="font16">平均处理期限</p>
        <p class="font32">7.34天</p>
        <!-- <p class="font14 red">第34名</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'
import CountTo from './count-to';
export default {
  components: { CountTo },
  data() {
    const week = ['日', '一', '二', '三', '四', '五', '六'];
    return {
      date: dayjs().format('MM月DD日'),
      week: week[dayjs().day()],
      time: dayjs().format('HH:mm:ss'),
      complaintsFull: 0,
      complaintsFullEnd: 221896,
      complaintsFullToday: 0,
      complaintsFullTodayEnd: 2000,
      complaintReferral: 0,
      complaintReferralEnd: 27010,
      complaintReferralToday: 0,
      complaintReferralTodayEnd: 200,
    }
  },
  mounted() {
    setInterval(() => {
      this.clock();
    }, 1000);
    setInterval(() => {
      this.refresh()
    }, 5000);
  },
  methods: {
    clock() {
      this.time = dayjs().format('HH:mm:ss');
    },
    refresh() {
      const num2 = this.random(10);
      const num1 = this.random(10) + num2;
      this.complaintsFull = this.complaintsFullEnd;
      this.complaintsFullEnd += num1;
      this.complaintsFullToday = this.complaintsFullTodayEnd;
      this.complaintsFullTodayEnd += num1;
      this.complaintReferral = this.complaintReferralEnd;
      this.complaintReferralEnd += num2;
      this.complaintReferralToday = this.complaintReferralTodayEnd;
      this.complaintReferralTodayEnd += num2;
    },
    random(times) {
      return Math.floor(Math.random() * times + 1)
    },
  },
}
</script>
<style lang="less" scoped>
.statistics {
  display: flex;
  justify-content: space-between;
  padding: 6px 12px;
  font-size: 20px;
  line-height: 28px;
  color: #ffffff;
  font-weight: bold;
  text-align: left;

  p+p {
    margin-top: 8px;

    &+p {
      margin-top: 12px;
    }
  }

  .statistic {
    flex: 1;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 25px;
  }

  .font14 {
    font-size: 14px;
    line-height: 22px;
  }

  .font16 {
    font-size: 16px;
  }

  .font20 {
    font-size: 20px;
  }

  .font28 {
    font-size: 28px;
    line-height: 32px;
  }

  .font32 {
    font-size: 32px;
    line-height: 32px;
  }

  .green {
    color: #09CEA9;
  }

  .red {
    color: #FB3F22;
  }

  .clock {
    width: 176px;
    position: relative;
    padding-right: 56px;
  }

  .split {
    background: #FAFAFA80;
    width: 4px;
    display: inline-block;
    transform: skewX(340deg);
    height: 102px;
    position: absolute;
    right: 18px;
    top: 5px;
  }
}
</style>
