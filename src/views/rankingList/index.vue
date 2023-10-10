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
            每网点投诉率
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
      <p><span>NO.1</span>乌鲁木齐分行</p>
      <p><span>NO.2</span>广东分行</p>
      <p><span>NO.3</span>上海分行</p>
      <p><span>NO.4</span>北京分行</p>
      <p><span>NO.5</span>浙江分行</p>
    </div>
    <div class="bottom-area">
      <div class="ranking-title">后五名</div>
      <div id="ranking-downfive" class="ranking-outter"></div>
    </div>

    <div class="down-ranking-dec">
      <p><span>NO.37</span>湖南分行</p>
      <p><span>NO.38</span>云南分行</p>
      <p><span>NO.39</span>广西分行</p>
      <p><span>NO.40</span>江西分行</p>
      <p><span>NO.41</span>山东分行</p>
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
      myChartDownFive: null,
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
      [29.33, 15.22, 93.11, 27.33, 24.22],
      [89.45, 45.21, 13.22, 77.78, 56.12],
      [43.21, 88.94, 24.89, 99.67, 75.33],
      [32.32, 68.11, 92.32, 61.56, 47.92],
      [55.56, 16.12, 99.22, 76.32, 71.23],
      [36.12, 52.93, 99.89, 14.67, 63.92],
      [87.41, 41.29, 22.38, 99.56, 67.12],
      [58.29, 76.31, 25.39, 49.12, 91.49],
      [62.22, 29.78, 81.23, 74.46, 38.16]
    ]
    const dataDown = [
      [93.11, 75.22, 23.89, 27.12, 56.92],
      [41.59, 68.78, 37.28, 94.12, 27.26],
      [62.22, 19.95, 45.29, 99.37, 31.94],
      [98.18, 51.21, 24.32, 36.21, 66.83],
      [97.67, 57.29, 13.33, 48.37, 73.23],
      [26.29, 99.22, 63.19, 39.36, 58.78],
      [33.12, 12.21, 75.34, 22.41, 97.53],
      [69.29, 42.18, 99.78, 17.23, 54.19],
      [76.11, 28.32, 41.32, 95.49, 67.13]
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
              return value + ' %'
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
              return value + ' %'
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
      this.sign++
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
