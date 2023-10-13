<template>
  <div class="outter">
    <div class="top-area">
      <el-row :gutter="3" style="margin-left: 0px">
        <el-col
          v-for="(item, index) in complaintList"
          :key="index"
          :span="item.span"
        >
          <div
            :class="{ active: isActived(index), default: !isActived(index) }"
          >
            {{ item.label }}
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="ranking-title">前五名</div>
    <div id="ranking-topfive" class="ranking-outter"></div>
    <div class="top-ranking-dec">
      <p v-for="(item, index) in dataTopCity[sign]" :key="index">
        <span>NO.{{ index + 1 }}</span
        >{{ item }}
      </p>
    </div>
    <div class="bottom-area">
      <div class="ranking-title">后五名</div>
      <div id="ranking-downfive" class="ranking-outter"></div>
    </div>

    <div class="down-ranking-dec">
      <p v-for="(item, index) in dataDownCity[sign]" :key="index">
        <span>NO.{{ index + 40 }}</span
        >{{ item }}
      </p>
    </div>
  </div>
</template>

<script>
import { getCityData } from './city'
import { getCityValue } from './cityData'
const { dataTopCity, dataDownCity } = getCityData()
const { dataTop, dataDown } = getCityValue()

export default {
  data() {
    return {
      option: null,
      optionD: null,
      sign: 0,
      myChartTopFive: null,
      myChartDownFive: null,
      complaintList: [
        {
          label: '15日办结率',
          span: 6
        },
        {
          label: '平均处理期限',
          span: 6
        },
        {
          label: '升级投诉率',
          span: 6
        },
        {
          label: '反复投诉率',
          span: 6
        },
        {
          label: '每网点投诉',
          span: 8
        },
        {
          label: '每百万客户投诉',
          span: 8
        },
        {
          label: '每百亿资产投诉',
          span: 8
        },
        {
          label: '多元方式化解投诉比率',
          span: 12
        },
        {
          label: '客户满意度',
          span: 12
        }
      ],
      dataTopCity,
      dataDownCity
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
     * 初始化
     */
    this.init()

    this.AssignmentData = () => {
      const topData = this.fingureData('top')
      const downData = this.fingureData('down')

      this.getTopOption().series[0].data = topData
      this.getTopOption().yAxis[1].data = topData
      this.getDownOption().series[0].data = downData
      this.getDownOption().yAxis[1].data = downData
    }
    /**
     * 每隔5秒钟刷新一次数据
     */
    setInterval(() => {
      // 更新数据
      ++this.sign
      this.sign === 9 ? (this.sign = 0) : this.sign
      this.AssignmentData()
      this.init()
    }, 5000)
  },

  methods: {
    /**
     * 初始化
     */
    init() {
      if (this.myChartDownFive && this.myChartTopFive) {
        this.myChartTopFive.clear()
        this.myChartDownFive.clear()
      }
      this.myChartTopFive.setOption(this.getTopOption(), true)
      this.myChartDownFive.setOption(this.getDownOption(), true)
    },
    /**
     * 根据sign判断是不是active
     */
    isActived(index) {
      return index === this.sign
    },

    /**
     * 动态的计算出最接近的刻度值，自定义刻度
     */
    fingureData(to) {
      const max = Math.max(...dataTop[this.sign])
      const maxD = Math.max(...dataDown[this.sign])
      let maxLen = 0
      // 判断是几位数
      const maxStr = to === 'top' ? max.toString() : maxD.toString()
      // 转换成数组
      const maxArr = maxStr.split('')
      if (maxArr.includes('.')) {
        // 说明是小数,截取.之前的数
        maxLen = maxStr.split('.')[0].length
      } else {
        maxLen = maxStr.length
      }

      // 特殊情况
      if ([0, 2, 3, 7, 8].includes(this.sign)) {
        // 在第一个位置插入100
        const newArr = to === 'top' ? [...dataTop[this.sign]] : [...dataDown[this.sign]]
        newArr.unshift(100)
        return newArr
      }

      if ([4, 5, 6].includes(this.sign)) {
        const newArr = to === 'top' ? [...dataTop[this.sign]] : [...dataDown[this.sign]]
        newArr.unshift(200)
        return newArr
      }

      // 通用情况
      if (maxLen === 1) {
        // 在第一个位置插入10
        const newArr = to === 'top' ? [...dataTop[this.sign]] : [...dataDown[this.sign]]
        newArr.unshift(10)
        return newArr
      }

      if (maxLen === 2) {
        // 在第一个位置插入100
        const newArr = to === 'top' ? [...dataTop[this.sign]] : [...dataDown[this.sign]]
        newArr.unshift(100)
        return newArr
      }

      if (maxLen === 3) {
        // 在第一个位置插入200
        const newArr = to === 'top' ? [...dataTop[this.sign]] : [...dataDown[this.sign]]
        newArr.unshift(200)
        return newArr
      }
    },

    getOption(data, color, isInArr) {
      return {
        legend: {
          show: false
        },
        grid: {
          left: 0,
          right: 0,
          top: -40,
          bottom: 0
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
            },
            barMinHeight: 100
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            barMinHeight: 100,
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
                return isInArr(value)
              }
            },
            data
          }
        ],
        series: [
          {
            show: true,
            name: '',
            type: 'bar',
            data,
            barWidth: 6, // 柱子宽度
            showBackground: true,
            backgroundStyle: {
              color: '#1C1C34'
            },
            itemStyle: {
              barBorderRadius: [0, 20, 20, 0],
              color
            }
          }
        ]
      }
    },

    getTopOption() {
      return this.getOption(this.fingureData('top'), '#09CEA9', (value) => {
        if (['99.1', '99.04', '99.01', '98.99', '98.87'].includes(value)) {
          return value + ' %'
        }

        if (['15.3', '14.2', '13.21', '12.2', '12'].includes(value)) {
          return value + ' %'
        }

        if (['11.52', '11.2', '10.9', '10.04', '10.03'].includes(value)) {
          return value + ' %'
        }

        if (['23.5', '22.63', '21.11', '21.01', '19.42'].includes(value)) {
          return value + ' %'
        }

        if (['72.77', '68.87', '63.56', '63.31', '60.18'].includes(value)) {
          return value + ' %'
        }
        return value
      })
    },

    getDownOption() {
      return this.getOption(this.fingureData('down'), '#FB3F22', (value) => {
        if (['92.56', '92.21', '91.93', '91.15', '90.18'].includes(value)) {
          return value + ' %'
        }

        if (['6.8', '6.34', '6.21', '6.04', '5.55'].includes(value)) {
          return value + ' %'
        }

        if (['3.51', '3.36', '2.53', '2.3', '2.05'].includes(value)) {
          return value + ' %'
        }

        if (['10.42', '9.85', '9.83', '9.1', '9.01'].includes(value)) {
          return value + ' %'
        }

        if (['44.65', '44.45', '41.93', '39.01', '38.81'].includes(value)) {
          return value + ' %'
        }
        return value
      })
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
  top: 188px;
}

.top-ranking-dec p {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 23px;

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
  top: 445px;
}
.down-ranking-dec p {
  font-family: Microsoft YaHei;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 23px;

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
