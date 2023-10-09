<template>
  <div class="outter">
    <div class="top-area">
      <el-row :gutter="10" style="margin-left: 0px">
        <el-col :span="6" :class="{ active: isActived(0) }">
          15日办结率
        </el-col>
        <el-col :span="6" :class="{ active: isActived(1) }">
          15日办结率
        </el-col>
        <el-col :span="6" :class="{ active: isActived(2) }">
          15日办结率
        </el-col>
        <el-col :span="6" :class="{ active: isActived(3) }">
          15日办结率
        </el-col>
        <el-col :span="8" :class="{ active: isActived(4) }">
          15日办结率
        </el-col>
        <el-col :span="8" :class="{ active: isActived(5) }">
          15日办结率
        </el-col>
        <el-col :span="8" :class="{ active: isActived(6) }">
          15日办结率
        </el-col>
        <el-col :span="12" :class="{ active: isActived(7) }">
          15日办结率
        </el-col>
        <el-col :span="12" :class="{ active: isActived(8) }">
          15日办结率
        </el-col>
      </el-row>
    </div>
    <div id="ranking-topfive" class="ranking-outter"></div>
    <div id="ranking-downfive" class="ranking-outter"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      option: null,
      optionD: null,
      sign: 0,
    };
  },
  mounted() {
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      xAxis: {
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff',
          },
        }, // 不显示坐标轴
        // 不显示坐标轴刻度
        axisLabel: {
          show: false,
        },
        // 动画效果
        axisPointer: {
          type: 'shadow',
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#262732'],
            width: 1,
            type: 'solid',
          },
        },
      },
      yAxis: {
        data: [],
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff',
          },
        }, // 不显示坐标轴
      },
      series: [
        {
          type: 'bar',
          data: [19325, 232238, 31000, 121594, 134141],
          barWidth: 15,
          itemStyle: {
            normal: {},
          },
          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
          borderRadius: [30, 10, 10, 10],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4AC0FF' },
            { offset: 1, color: '#2987DC' },
          ]),
        },
      ],
    };
    this.optionD = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      xAxis: {
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff',
          },
        }, // 不显示坐标轴
        // 不显示坐标轴刻度
        axisLabel: {
          show: false,
        },
        // 动画效果
        axisPointer: {
          type: 'shadow',
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#262732'],
            width: 1,
            type: 'solid',
          },
        },
      },
      yAxis: {
        data: [],
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ffffff',
          },
        }, // 不显示坐标轴
      },
      series: [
        {
          type: 'bar',
          data: [99325, 765238, 71000, 821594, 232141],
          barWidth: 15,
          itemStyle: {
            normal: {},
          },
          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
          borderRadius: [30, 10, 10, 10],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4AC0FF' },
            { offset: 1, color: '#2987DC' },
          ]),
        },
      ],
    };
    const dataTop = [
      [19985, 238738, 36900, 151594, 434141],
      [19765, 138738, 16900, 651594, 834141],
      [69985, 238738, 86900, 158794, 934141],
      [79985, 738738, 36900, 132594, 434141],
      [99765, 643738, 96900, 687594, 834141],
      [19985, 195738, 16900, 158794, 234141],
      [49985, 938738, 16900, 165594, 834141],
      [79765, 238738, 76900, 620594, 434141],
      [49985, 338738, 66900, 142794, 134141],
    ];
    const dataDown = [
      [82285, 738738, 16900, 951594, 634141],
      [99765, 138738, 16900, 451594, 234141],
      [29985, 238738, 86900, 958794, 934141],
      [49985, 938738, 16900, 165594, 834141],
      [79765, 238738, 76900, 620594, 434141],
      [49985, 338738, 66900, 142794, 134141],
      [19985, 238738, 36900, 151594, 434141],
      [19765, 138738, 16900, 651594, 834141],
      [69985, 238738, 86900, 158794, 934141],
    ];
    /**
     * 初始化
     */
    this.init()

    /**
     * 每隔5秒钟刷新一次数据
     */
    setInterval(() => {
      // 更新数据
      this.sign++;
      if (this.sign < 9) {
        this.option.series[0].data = dataTop[this.sign];
        this.optionD.series[0].data = dataDown[this.sign];
      } else {
        this.sign = 0;
      }
      this.init();
    }, 5000);
  },

  methods: {
    init() {
      const myChartTopFive = this.$echarts.init(
        document.getElementById('ranking-topfive')
      );
      const myChartDownFive = this.$echarts.init(
        document.getElementById('ranking-downfive')
      );
      myChartTopFive.clear();
      myChartDownFive.clear();
      myChartTopFive.setOption(this.option, true);
      myChartDownFive.setOption(this.optionD, true);
    },
    /**
     * 根据sign判断是不是active
     */
    isActived(index) {
      return index === this.sign;
    },
  },

};

</script>

<style>
.outter {
  width: 362px;
}
.ranking-outter {
  width: 400px;
  height: 400px;
}

.active {
  background-color: red;
}
</style>
