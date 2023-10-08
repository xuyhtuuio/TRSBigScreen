<template>
  <div class="outter">
    <div class="top-area">
      <el-row :gutter="10" style="margin-left: 0px">
        <el-col :span="6" :class="{ active: isActive }"> 15日办结率 </el-col>
        <el-col :span="6"> 15日办结率 </el-col>
        <el-col :span="6"> 15日办结率 </el-col>
        <el-col :span="6"> 15日办结率 </el-col>
        <el-col :span="8"> 15日办结率 </el-col>
        <el-col :span="8"> 15日办结率 </el-col>
        <el-col :span="8"> 15日办结率 </el-col>
        <el-col :span="12"> 15日办结率 </el-col>
        <el-col :span="12"> 15日办结率 </el-col>
      </el-row>
    </div>
    <div id="ranking" class="ranking-outter"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: null,
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
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: { show: false }, // 不显示坐标轴
      },
      yAxis: {
        data: [],
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: { show: false }, // 不显示坐标轴
      },
      series: [
        {
          type: 'bar',
          data: [19325, 23438, 31000, 121594, 134141, 681807],
          barWidth: 15,
          itemStyle: {
            normal: {
              // 这部分让指标提示显示在上方
              label: {
                formatter: '{b}{c}千万元',
                // show: true,
                // position: 'top',
              },
            },
          },

          axisTick: {
            show: false, // 不显示坐标轴刻度线
          },
        },
      ],
    };
  },

  computed: {
    isActive() {
      return true;
    },
  },

  methods: {
    init() {
      const myChart = this.$echarts.init(document.getElementById('ranking'));
      myChart.setOption(this.option);
    },
  },
  watch: {
    option() {
      this.init();
    },
  },
  created() {
    this.init();
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
