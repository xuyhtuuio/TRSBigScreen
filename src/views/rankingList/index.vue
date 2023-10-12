<template>
  <div class="outter">
    <div class="top-area">
      <el-row :gutter="3" style="margin-left: 0px">
        <el-col :span="6">
          <div :class="{ active: isActived(0), default: !isActived(0) }">
            15日办结率
          </div>
        </el-col>
        <el-col :span="6">
          <div :class="{ active: isActived(1), default: !isActived(1) }">
            平均处理期限
          </div>
        </el-col>
        <el-col :span="6">
          <div :class="{ active: isActived(2), default: !isActived(2) }">
            升级投诉率
          </div>
        </el-col>
        <el-col :span="6">
          <div :class="{ active: isActived(3), default: !isActived(3) }">
            反复投诉率
          </div>
        </el-col>
        <el-col :span="8">
          <div :class="{ active: isActived(4), default: !isActived(4) }">
            每网点投诉
          </div>
        </el-col>
        <el-col :span="8">
          <div :class="{ active: isActived(5), default: !isActived(5) }">
            每百万客户投诉
          </div>
        </el-col>
        <el-col :span="8">
          <div :class="{ active: isActived(6), default: !isActived(6) }">
            每百亿资产投诉
          </div>
        </el-col>
        <el-col :span="12">
          <div :class="{ active: isActived(7), default: !isActived(7) }">
            多元方式化解投诉比率
          </div>
        </el-col>
        <el-col :span="12">
          <div :class="{ active: isActived(8), default: !isActived(8) }">
            客户满意度
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="ranking-title">前五名</div>
    <div id="ranking-topfive" class="ranking-outter"></div>
    <div class="top-ranking-dec">
      <p><span>NO.1</span>北京分行</p>
      <p><span>NO.2</span>长春分行</p>
      <p><span>NO.3</span>长沙分行</p>
      <p><span>NO.4</span>成都分行</p>
      <p><span>NO.5</span>重庆分行</p>
    </div>
    <div class="bottom-area">
      <div class="ranking-title">后五名</div>
      <div id="ranking-downfive" class="ranking-outter"></div>
    </div>

    <div class="down-ranking-dec">
      <p><span>NO.43</span>西安分行</p>
      <p><span>NO.44</span>西宁分行</p>
      <p><span>NO.45</span>烟台分行</p>
      <p><span>NO.46</span>银川分行</p>
      <p><span>NO.47</span>郑州分行</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: null,
      optionD: null,
      sign: 0,
      myChartTopFive: null,
      myChartDownFive: null
    }
  },
  mounted() {
    /**
     * 初始化echarts
     */
    this.myChartTopFive = this.$echarts.init(
      document.getElementById('ranking-topfive')
    )
    this.myChartDownFive = this.$echarts.init(
      document.getElementById('ranking-downfive')
    )

    /**
     * 模拟数据
     */
    const dataTop = [
      [98, 96.65, 92.21, 92.56, 94.45],
      [1.38, 2.14, 2.54, 2.11, 1.76],
      [9.87, 11.31, 8.41, 9.12, 8],
      [6.45, 7.12, 5, 8, 2.3],
      [89.12, 114.17, 103.49, 142.48, 138.44],
      [200.53, 199.8, 194.05, 178.1, 173.05],
      [114.59, 114.17, 110.89, 101.77, 98.89],
      [22.63, 9.85, 16.52, 12.3, 11.4],
      [57.11, 63.56, 72.77, 63.31, 45.5]
    ]

    const dataDown = [
      //
      [96.68, 99.01, 98.99, 98.33, 94.76],
      [2.85, 1.19, 2.2, 3.87, 3.44],
      //
      [11.3, 9.25, 8.9, 10.34, 11.9],
      //
      [7.36, 8.45, 9.6, 10.9, 11.2],
      [74.84, 85.26, 81.97, 60.16, 54.95],
      [84.2, 81.0, 77.88, 57.15, 54.95],
      [48.11, 46.29, 44.5, 32.66, 31.4],
      //
      [10.42, 10.43, 10.88, 14.87, 9.01],
      //
      [47.71, 47.74, 39.01, 55.57, 46.61]
    ]

    /**
     * 配置项
     */
    this.option = {
      legend: {
        show: false
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 15
      },
      xAxis: [
        {
          splitLine: {
            show: false
          },
          type: 'value',
          show: false,
          axisLine: {
            // x轴坐标轴，false为隐藏，true为显示
            show: false
          }
        }
      ],
      yAxis: [
        {
          show: true,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          type: 'category',
          axisTick: {
            show: false
          },
          inverse: true,
          axisLabel: {
            show: false
          }
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            inside: true,
            verticalAlign: 'bottom',
            lineHeight: 34,
            margin: 5, // 刻度标签与轴线之间的距离
            show: true,
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 14,
              lineHeight: 20,
              fontWeight: 700,
              fontFamily: 'Microsoft YaHei'
            },
            formatter(value) {
              if (
                value === '98'
                || value === '96.65'
                || value === '92.21'
                || value === '92.56'
                || value === '94.45'
              ) {
                return value + ' %'
              }

              if (
                value === '9.87'
                || value === '11.31'
                || value === '8.41'
                || value === '9.12'
                || value === '8'
              ) {
                return value + ' %'
              }

              if (
                value === '6.45'
                || value === '7.12'
                || value === '5'
                || value === '8'
                || value === '2.3'
              ) {
                return value + ' %'
              }
              if (
                value === '22.63'
                || value === '9.85'
                || value === '16.52'
                || value === '12.3'
                || value === '11.4'
              ) {
                return value + ' %'
              }

              if (
                value === '57.11'
                || value === '63.56'
                || value === '72.77'
                || value === '63.31'
                || value === '45.5'
              ) {
                return value + ' %'
              }

              return value
            }
          },
          data: dataTop[this.sign]
        }
      ],
      series: [
        {
          show: true,
          name: '',
          type: 'bar',
          data: dataTop[this.sign],
          barWidth: 6, // 柱子宽度
          showBackground: true,
          backgroundStyle: {
            color: '#1C1C34'
          },
          itemStyle: {
            barBorderRadius: [0, 20, 20, 0],
            color: '#09CEA9'
          }
        }
      ]
    }
    this.optionD = {
      legend: {
        show: false
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 15
      },
      xAxis: [
        {
          splitLine: {
            show: false
          },
          type: 'value',
          show: false,
          axisLine: {
            // x轴坐标轴，false为隐藏，true为显示
            show: false
          }
        }
      ],
      yAxis: [
        {
          show: true,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          type: 'category',
          axisTick: {
            show: false
          },
          inverse: true,
          axisLabel: {
            show: false
          }
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            inside: true,
            verticalAlign: 'bottom',
            lineHeight: 28,
            margin: 5, // 刻度标签与轴线之间的距离
            show: true,
            textStyle: {
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 14,
              lineHeight: 20,
              fontWeight: 700,
              fontFamily: 'Microsoft YaHei'
            },
            formatter(value) {
              if (
                value === '96.68'
                || value === '99.01'
                || value === '98.99'
                || value === '98.33'
                || value === '94.76'
              ) {
                return value + ' %'
              }

              if (
                value === '11.3'
                || value === '9.25'
                || value === '8.9'
                || value === '10.34'
                || value === '11.9'
              ) {
                return value + ' %'
              }

              if (
                value === '7.36'
                || value === '8.45'
                || value === '9.6'
                || value === '10.9'
                || value === '11.2'
              ) {
                return value + ' %'
              }

              if (
                value === '47.71'
                || value === '47.74'
                || value === '39.01'
                || value === '55.57'
                || value === '46.61'
              ) {
                return value + ' %'
              }
              return value
            }
          },
          data: dataDown[this.sign]
        }
      ],

      series: [
        {
          show: true,
          name: '',
          type: 'bar',
          data: dataDown[this.sign],
          barWidth: 6, // 柱子宽度
          showBackground: true,
          backgroundStyle: {
            color: '#1C1C34'
          },
          itemStyle: {
            barBorderRadius: [0, 20, 20, 0],
            color: '#FB3F22'
          }
        }
      ]
    }

    /**
     * 初始化
     */
    this.init()

    /**
     * 每隔5秒钟刷新一次数据
     */
    setInterval(() => {
      // 更新数据
      ++this.sign
      if (this.sign < 9) {
        this.option.series[0].data = dataTop[this.sign]
        this.option.yAxis[1].data = dataTop[this.sign]
        this.optionD.series[0].data = dataDown[this.sign]
        this.optionD.yAxis[1].data = dataDown[this.sign]
      } else {
        this.sign = 0
      }
      this.init()
    }, 5000)
  },

  methods: {
    /**
     * 初始化
     */
    init() {
      this.myChartTopFive.clear()
      this.myChartDownFive.clear()
      this.myChartTopFive.setOption(this.option, true)
      this.myChartDownFive.setOption(this.optionD, true)
    },
    /**
     * 根据sign判断是不是active
     */
    isActived(index) {
      return index === this.sign
    }
  }
}
</script>

<style lang="less" scoped>
.outter {
  width: 362px;
  margin-top: 15px;
  .top-area {
    .default {
      background: linear-gradient(
        89.42deg,
        rgba(6, 133, 241, 0.22) -1.24%,
        #1b3476 73.04%,
        #0d1e5f 100.57%
      );
    }
  }
}

.ranking-outter {
  width: 362px;
  height: 238px;
}

.bottom-area {
  position: relative;
  bottom: 20px;
}
//active 覆盖 default
.default {
  background: linear-gradient(
    89.42deg,
    rgba(6, 133, 241, 0.22) -1.24%,
    #1b3476 73.04%,
    #0d1e5f 100.57%
  );
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
}

.active {
  background: linear-gradient(90deg, #503d0d -8.61%, #91640e 60.82%);
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
}

.ranking-title {
  width: 362px;
  height: 30px;
  background: url(../../assets/image/title2.png);
  background-size: 100% 100%;
  text-align: left;
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-top: 2px;
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
}

.top-ranking-dec {
  position: absolute;
  top: 176px;
}

.top-ranking-dec p {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 20px;

  span {
    font-family: Microsoft YaHei;
    font-size: 12px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffe600;
    margin-right: 10px;
  }
}

.down-ranking-dec {
  position: absolute;
  top: 434px;
}
.down-ranking-dec p {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 20px;

  span {
    font-family: Microsoft YaHei;
    font-size: 12px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #ffe600;
    margin-right: 10px;
  }
}
:deep(.el-col) {
  // margin-right: 5px;
  margin-bottom: 10px;
}
</style>
