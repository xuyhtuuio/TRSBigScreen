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
    <div class="ranking-title">后五名</div>
    <div id="ranking-downfive" class="ranking-outter"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: null,
      optionD: null,
      sign: 0
    }
  },
  mounted() {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: 0,
        right: 0,
        bottom: 30,
        top: 5
      },
      xAxis: {
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        }, // 不显示坐标轴
        // 不显示坐标轴刻度
        axisLabel: {
          show: false
        },
        // 动画效果
        axisPointer: {
          type: 'shadow'
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#262732'],
            width: 1,
            type: 'solid'
          }
        }
      },
      yAxis: {
        data: [],
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        } // 不显示坐标轴
      },
      series: [
        {
          type: 'bar',
          data: [32, 32, 10, 11, 41],
          barWidth: 6,
          barGap: '20%',
          itemStyle: {
            normal: {}
          },
          axisTick: {
            show: false // 不显示坐标轴刻度线
          },
          borderRadius: [30, 10, 10, 10],
          color: '#09CEA9',
          showBackground: true,
          backgroundStyle: {
            color: '#1C1C34'
          }
        }
      ]
    }
    this.optionD = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: 0,
        right: 0,
        bottom: 30,
        top: 5
      },
      xAxis: {
        axisTick: {
          show: false
        },

        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        }, // 不显示坐标轴
        // 不显示坐标轴刻度
        axisLabel: {
          show: false
        },
        // 动画效果
        axisPointer: {
          type: 'shadow'
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#262732'],
            width: 1,
            type: 'solid'
          }
        }
      },
      yAxis: {
        data: [],

        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        } // 不显示坐标轴
      },
      series: [
        {
          type: 'bar',
          data: [99, 76, 71, 15, 23],

          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: {
                  // 数值样式
                  color: 'red',
                  fontSize: 16
                }
              }
            }
          },

          barWidth: 6,
          axisTick: {
            show: false // 不显示坐标轴刻度线
          },
          borderRadius: [10, 10, 10, 10],
          color: '#FB3F22',
          showBackground: true,
          backgroundStyle: {
            color: '#1C1C34'
          }
        }
      ]
    }
    // eslint-disable-next-line
    const dataTop = [
      [76, 28, 41, 95, 17],
      [89, 45, 13, 77, 56],
      [43, 88, 24, 19, 75],
      [32, 68, 92, 61, 47],
      [55, 16, 83, 26, 71],
      [36, 52, 79, 14, 63],
      [87, 41, 98, 31, 67],
      [58, 76, 25, 49, 91],
      [62, 29, 81, 74, 38]
    ]
    // eslint-disable-next-line
    const dataDown = [
      [15, 29, 72, 55, 83],
      [41, 68, 37, 94, 27],
      [62, 19, 45, 88, 31],
      [79, 51, 24, 36, 66],
      [92, 57, 13, 48, 73],
      [26, 84, 63, 39, 58],
      [33, 12, 75, 22, 97],
      [69, 42, 89, 17, 54],
      [76, 28, 41, 95, 67]
    ]
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
        this.optionD.series[0].data = dataDown[this.sign]
      } else {
        this.sign = 0
      }
      this.init()
    }, 5000)
  },

  methods: {
    init() {
      const myChartTopFive = this.$echarts.init(
        document.getElementById('ranking-topfive')
      )
      const myChartDownFive = this.$echarts.init(
        document.getElementById('ranking-downfive')
      )
      myChartTopFive.clear()
      myChartDownFive.clear()
      myChartTopFive.setOption(this.option, true)
      myChartDownFive.setOption(this.optionD, true)
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
:deep(.el-col) {
  // margin-right: 5px;
  margin-bottom: 10px;
}
</style>
