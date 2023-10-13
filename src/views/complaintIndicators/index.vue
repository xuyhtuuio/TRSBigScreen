<template>
  <div class="outter">
    <div class="top-area">
      <p class="top-area-title">投诉数量情况</p>
      <div class="top-area-content">
        <div class="top-item">
          <p class="item-dec">每网点投诉</p>
          <p class="item-dec-piece">
            <span class="item-dec-num">100.11</span>
            件
          </p>
          <p class="item-ranking">第1名</p>
        </div>
        <div class="top-item">
          <p class="item-dec">每百万客户投诉</p>
          <p class="item-dec-piece">
            <span class="item-dec-num">2000.23</span>
            件
          </p>
          <p class="item-ranking" style="color: #b5d9ff">第12名</p>
        </div>
        <div class="top-item">
          <p class="item-dec">每百亿资产投诉</p>
          <p class="item-dec-piece">
            <span class="item-dec-num">1200.11</span>
            件
          </p>
          <p class="item-ranking" style="color: #fb3f22">第41名</p>
        </div>
      </div>
    </div>

    <div class="center-area">
      <div class="center-item">
        <p class="center-title">银保监转办投诉</p>
        <div class="center-content">
          <p class="center-num-dec">
            <span class="center-num">{{ bank_num }}</span
            >件
          </p>
        </div>
      </div>
      <div class="center-item">
        <p class="center-title">人行转办投诉</p>
        <div class="center-content">
          <p class="center-num-dec">
            <span class="center-num">{{ complaint_num }}</span
            >件
          </p>
        </div>
      </div>
      <div class="center-item">
        <p class="center-title">人行转办投诉</p>
        <div class="center-content">
          <p class="center-num-dec"><span class="center-num">23.83</span>%</p>
          <p class="center-ranking" style="color: #fb3f22">第41名</p>
        </div>
      </div>
      <div class="center-item">
        <p class="center-title">人行转办投诉</p>
        <div class="center-content">
          <p class="center-num-dec"><span class="center-num">23.83</span>%</p>
          <p class="center-ranking">第4名</p>
        </div>
      </div>
      <div class="center-item">
        <p class="center-title">人行转办投诉</p>
        <div class="center-content">
          <p class="center-num-dec"><span class="center-num">20000</span>件</p>
        </div>
      </div>
      <div class="center-item">
        <p class="center-title">人行转办投诉</p>
        <div class="center-content">
          <p class="center-num-dec"><span class="center-num">23.83</span>%</p>
          <p class="center-ranking">第4名</p>
        </div>
      </div>
    </div>

    <div class="bottom-area">
      <p class="bottom-title">客户满意度</p>
      <div class="bottom-content">
        <p class="bottom-num">99.98%</p>
        <p class="bottom-ranking">第2名</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank_num: 2000,
      complaint_num: 2000
    }
  },
  created() {},
  mounted() {
    setInterval(() => {
      this.refresh()
    }, 3000)
  },
  beforeDestroy() {},
  methods: {
    random(times) {
      // 生成1到times的随机数
      return Math.floor(Math.random() * times + 1)
    },
    refresh() {
      const num1 = this.random(10)
      const num2 = this.random(10)
      this.bank_num += num1
      this.complaint_num += num2
    }
  }
}
</script>

<style scoped lang="less">
.outter {
  margin-top: 15px;
  .top-area {
    width: 362px;
    height: 163px;
    background: url('../../assets/image/enp_kanban0.png');
    background-size: contain;

    .top-area-title {
      font-family: Microsoft YaHei;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      margin-left: 10px;
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      position: relative;
      top: 3px;
    }

    .top-area-content {
      display: flex;
      justify-content: center;
      align-content: center;
      margin-top: 30px;

      .top-item {
        width: 99px;
        height: 84px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
        .item-dec {
          font-family: Microsoft YaHei;
          font-size: 12px;
          font-weight: 700;
          line-height: 20px;
          letter-spacing: 0em;
          text-align: center;
        }

        .item-dec-piece {
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: left;
          margin: 5px 0 5px 0;

          .item-dec-num {
            font-family: Microsoft YaHei;
            font-size: 16px;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: left;
            text-shadow: 0px 0px 20px #257cff;
            margin-right: 5px;
          }
        }

        .item-ranking {
          //styleName: 正文/加粗;
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: center;
          color: #09cea9;
        }
      }
    }
  }

  .center-area {
    width: 362px;
    display: flex;
    flex-wrap: wrap;

    .center-item {
      width: 177px;
      height: 106px;
      border-radius: 1px;
      background: url('../../assets/image/enp-kanban2.png');
      background-size: contain;
      margin-right: 8px;
      margin: 10px 8px 5px 0;
      &:nth-child(2n) {
        margin-right: 0;
      }

      .center-title {
        font-family: Microsoft YaHei;
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: center;
        color: #f0f6ff;
        text-align: left;
        position: relative;
        top: 3px;
        margin-left: 10px;
      }

      .center-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        width: 145px;
        height: 70px;
        margin: 10px 0 0 15px;

        .center-num-dec {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          .center-num {
            font-family: Microsoft YaHei;
            font-size: 16px;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: center;
            text-shadow: 0px 0px 20px #257cff;
            margin-right: 5px;
          }
        }

        .center-ranking {
          font-family: Microsoft YaHei;
          font-size: 14px;
          font-weight: 700;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: center;
          color: #09cea9;
        }
      }
    }
  }

  .bottom-area {
    width: 362px;
    height: 80px;
    background: url('../../assets/image/enp_kanban1.png');
    background-size: contain;
    background-repeat: no-repeat;

    .bottom-title {
      font-family: Microsoft YaHei;
      font-size: 12px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      position: relative;
      top: 6px;
      margin-left: 10px;
    }

    .bottom-content {
      display: flex;
      margin: 18px 0 0 130px;
      font-family: Microsoft YaHei;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;

      .bottom-num {
        margin-right: 65px;
      }

      .bottom-ranking {
        color: #09cea9;
      }
    }
  }
}
</style>
