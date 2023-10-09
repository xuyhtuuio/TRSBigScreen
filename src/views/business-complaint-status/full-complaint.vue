<template>
  <div class="full-cpmplaint">
    <p class="title-level2">全量投诉各业务占比</p>
    <div class="regCap">
      <div class="pie-box">
        <div class="reg_container" ref="box"></div>
      </div>
      <div style="position: absolute" class="legends">
        <ul>
          <li
            v-for="(item, index) in legends"
            :key="index"
            :class="activeIndex == index ? 'active' : 'default'"
          >
            <div class="block">
              <span :style="{ background: item.color }"></span>
              <span
                :class="activeIndex == index ? 'label-active' : 'label-default'"
                >{{ item.name }}</span
              >
            </div>
            <div
              :class="
                activeIndex === index
                  ? 'counts counts-active'
                  : 'counts counts-default'
              "
            >
              {{ item.value }}
              <span>件</span>
            </div>
            <div class="pre" :style="{ color: item.color }">
              {{ item.pre }}%
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      legends: [],
      activeIndex: 0,
      options: {},
      pie_data: [],
      typeBar: "",
      mTime: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const data = [
        { name: "信用卡", value: 15672, pre: "" },
        { name: "借记卡", value: 11210, pre: "" },
        { name: "个人贷款", value: 9325, pre: "" },
        { name: "理财类", value: 7245, pre: "" },
        { name: "其他零售", value: 5145, pre: "" },
        { name: "对公/小微", value: 4941, pre: "" },
      ];

      const total = data.reduce((prev, cur) => {
        return prev + cur.value;
      }, 0);
      const colors = [
        "#F76560",
        "#249EFF",
        "#26BFBF",
        "#389E0D",
        "#FFE600",
        "#8349E6",
      ];
      this.legends = data.map((m, index) => {
        return {
          ...m,
          color: colors[index],
          pre: ((m.value / total) * 100).toFixed(2),
        };
      });
      this.typeBar = this.$echarts.getInstanceByDom(this.$refs["box"]);
      if (this.typeBar == null) {
        this.typeBar = this.$echarts.init(this.$refs["box"]);
      }
      const option = {
        color: [
          "#F76560",
          "#249EFF",
          "#26BFBF",
          "#389E0D",
          "#FFE600",
          "#8349E6",
        ],
        series: [
          {
            type: "pie",
            radius: ["70%", "86%"],
            center: ["50%", "50%"],
            // avoidLabelOverlap: false,
            itemStyle: {
              normal: {
                borderWidth: 3,
                borderColor: "rgba(0,0,0,0.5)",
              },
            },

            label: {
              normal: {
                show: false,
                position: "center",
                fontSize: "12",
                color: "#",
                formatter: ["{a|{b}}", "{b|{c}件}"].join("\n"),
                rich: {
                  a: {
                    // 中间字的数值样式
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: 700,
                    verticalAlign: "middle",
                    marginBottom: 20,
                  },
                  b: {
                    // 中间字的名称样式
                    fontSize: 14,
                    lineHeight: 24,
                    fontWeight: 700,
                    fontStyle: "italic",
                  },
                },
              },
              emphasis: {
                show: true,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data,
          },
          {
            name: "内边框",
            type: "pie",
            clockWise: true, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ["50%", "50%"],
            radius: ["60%", "60%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 9,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: "#364358",
                  },
                },
              },
            ],
          },
          {
            name: "外边框",
            type: "pie",
            clockWise: true, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ["50%", "50%"],
            radius: ["99%", "99%"],
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 100,
                name: "",
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: "#364358",
                  },
                },
              },
            ],
          },
        ],
      };
      this.options = option;
      this.typeBar.setOption(option);
      let currentIndex = -1; // 当前高亮图形在饼图数据中的下标
      clearInterval(this.changePieInterval);
      this.changePieInterval = setInterval(() => {
        const dataLen = data.length;
        currentIndex = (currentIndex + 1) % dataLen;
        this.activeIndex = currentIndex;
        if (currentIndex + 1 === dataLen) {
          this.$emit("tab3industryParkPie", true);
        }
        this.highlightPie(currentIndex);
      }, 1000); // 设置自动切换高亮图形的定时器
      this.typeBar.on("mouseover", (params) => {
        // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
        clearInterval(this.changePieInterval);
        currentIndex = params.dataIndex;
        this.activeIndex = currentIndex;
        this.highlightPie(currentIndex);
      });
      this.typeBar.on("mouseout", () => {
        // 用户鼠标移出时，重新开始自动切换
        if (this.changePieInterval) clearInterval(this.changePieInterval);
        this.changePieInterval = setInterval(() => {
          const dataLen = this.legends.length;
          currentIndex = (currentIndex + 1) % dataLen;
          this.activeIndex = currentIndex;
          this.highlightPie(currentIndex);
        }, 1000);
      });
    },
    selectPie(currentIndex) {
      // 高亮效果切换到下一个图形
      const dataLen = this.legends.length;
      currentIndex = (currentIndex + 1) % dataLen;
      this.highlightPie(currentIndex);
    },
    highlightPie(currentIndex) {
      // 取消所有高亮并高亮当前图形
      // 遍历饼图数据，取消所有图形的高亮效果
      // eslint-disable-next-line
      for (let idx in this.options.series[0].data) {
        this.typeBar.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: idx,
        });
        // 高亮当前图形
        this.typeBar.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.full-cpmplaint {
  .title-level2 {
    margin-top: 11px;
    color: #ffffff;
    font-weight: 700;
    text-shadow: 0px 0px 30px rgba(30, 242, 255, 0.3);
    font-size: 12px;
    letter-spacing: 0.05em;
    position: relative;
    height: 30px;
    line-height: 30px;
    padding-left: 26px;
    text-align: left;
    background: url("../../assets/image/title3.png");
    background-size: 100% 100%;
  }

  .regCap {
    height: calc(100% - 30px);
    display: flex;
    width: 100%;
    position: relative;
    padding: 8px 0px 0px 8px;
  }
  .pie-box {
    width: 55%;
    position: absolute;
    height: 100%;
    margin-right: 16px;
    .reg_container {
      width: 100%;
      height: 90%;
    }
  }
  .legends {
    width: 300px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    ul {
      min-width: 228px;
      li {
        padding: 2px 8px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        .block {
          width: 44%;
          span:nth-of-type(1) {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 8px;
          }
          span:nth-of-type(2) {
            font-weight: 700;
            font-size: 12px;
            line-height: 20px;
            color: #ffffff;
          }
          .label-active {
            font-weight: 700;
            color: #ffffff;
          }
          .label-default {
            font-weight: 400;
            color: #d1e2ff;
          }
        }
        .counts {
          width: 34%;
          font-weight: 700;
          font-size: 12px;
          line-height: 20px;
          color: #ffffff;
          font-style: italic;
          text-align: right;
          span {
            font-weight: 400;
            font-size: 10px;
            line-height: 20px;
            font-style: italic;
            -webkit-transform: scale(0.83);
            transform-origin: 50% 50%;
          }
        }
        .counts-default {
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #d1e2ff;
        }
        .counts-active {
          font-weight: 700;
          font-size: 12px;
          line-height: 20px;
          color: #fff;
        }
        .pre {
          width: 22%;
          text-align: right;
          font-weight: 700;
          font-size: 10px;
          font-style: italic;
          line-height: 18px;
          -webkit-transform: scale(0.83);
        }
      }
      li:last-of-type {
        margin-bottom: 0;
      }
      .active {
        background: rgba(255, 230, 0, 0.1);
        box-shadow: inset 0px 0px 7px rgba(255, 216, 80, 0.7);
      }
      .default {
        background: linear-gradient(
          90deg,
          #0e1b3d 0.66%,
          rgba(14, 27, 61, 0) 100%
        );
        border-radius: 2px;
      }
    }
  }
}
</style>