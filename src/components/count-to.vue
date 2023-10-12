<template>
  <CountTo :startVal="startVal" :endVal="endVal" :duration="duration" :style="countStyle" />
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  props: {
    // 开始数值
    startVal: {
      type: Number,
      default: () => 0
    },
    // 结束数值
    endVal: {
      type: Number,
      default: () => 100
    },
    // 数值动画持续时间 单位ms
    duration: {
      type: Number,
      default: () => 3000
    },
    // 数字的样式 示例
    // countStyle: {
    //   fontWeight: 700,
    //   fontSize: "30px",
    //   lineHeight: "38px",
    //   color: "#00F0B8",
    //   textShadow: "0px 0px 15px rgba(0, 240, 184, 0.6)",
    // },
    countStyle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
