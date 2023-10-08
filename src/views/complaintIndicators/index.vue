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
          <p class="item-ranking">第一名</p>
        </div>
        <div class="top-item">
          <p class="item-dec">每网点投诉</p>
          <p class="item-dec-piece">
            <span class="item-dec-num">100.11</span>
            件
          </p>
          <p class="item-ranking">第一名</p>
        </div>
        <div class="top-item">
          <p class="item-dec">每网点投诉</p>
          <p class="item-dec-piece">
            <span class="item-dec-num">100.11</span>
            件
          </p>
          <p class="item-ranking">第一名</p>
        </div>
      </div>
    </div>

    <img :src="enp_kanban2" alt="" />
    <img :src="enp_kanban1" alt="" />
  </div>
</template>

<script>
import enp_kanban0 from "@/assets/image/enp_kanban0.png";
import enp_kanban1 from "@/assets/image/enp_kanban1.png";
import enp_kanban2 from "@/assets/image/enp-kanban2.png";
export default {
  data() {
    return {
      enp_kanban0,
      enp_kanban1,
      enp_kanban2,
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style scoped lang="less">
.outter {
  // width: 100%;
  // height: 100%;
  // background-color: #000;
  .top-area {
    width: 362px;
    height: 163px;
    background: url("../../assets/image/enp_kanban0.png");
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
      flex: 1;

      .top-item {
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

          .item-dec-num {
            font-family: Microsoft YaHei;
            font-size: 16px;
            font-weight: 700;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: left;
            text-shadow: 0px 0px 20px #257cff;
          }
        }
      }
    }
  }
}
</style>
