<template>
  <div class="box" :style="{ zIndex: mapLoading ? -1 : 1 }">
    <div id="mapL7" v-loading="mapLoading"></div>
    <img id="rotate-icon" class="rotate-icon" v-show="showRotateIcon" src="@/assets/image/rotate.png" />
    <div class="lenged">
      <div class="lenged-title">
        <div class="lenged-item"><span></span></div>
        <div class="lenged-item lenged-item-label">监管转办投诉占全量投诉比值的排名：</div>
      </div>
      <div class="lenged-items">
        <div class="lenged-item move-top">
          <p class="blue"></p><span>第1~5名</span>
        </div>
        <div class="lenged-item move-top">
          <p class="green"></p><span>第6~15名</span>
        </div>
        <div class="lenged-item move-top">
          <p class="yellow"></p><span>第16~25名</span>
        </div>
        <div class="lenged-item move-top">
          <p class="orange"></p><span>第26~36名</span>
        </div>
        <div class="lenged-item move-top">
          <p class="red"></p><span>第37~44名</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { Marker, MarkerLayer } from '@antv/l7';
import { Choropleth } from '@antv/l7plot';
import { parseElement, parseQuery } from '@/lib/utils'
import { mapData } from './mapL7Data'
const rotateIcon = require('@/assets/image/rotate.png')
const dirllMap = {
  country: ['province', 'city', 'district'],
  province: ['city', 'district'],
  city: ['district'],
  district: []
}
let tooltipsData = {}

export default {
  name: 'mapL7',
  data() {
    // 处理query参数
    const { level, province, city, noDirll } = parseQuery(this)
    return {
      publicPath: process.env.BASE_URL,
      mapLoading: true,
      showRotateIcon: false,
      manualDrill: false,
      noDirll,
      chinaBorder: {
        // 国界
        // national: { color: 'rgb(134, 191, 244)', width: 2, opacity: 1 },
        national: false,
        // 争议
        dispute: { color: 'rgb(134, 191, 244)', width: 1, opacity: 0, dashArray: [2, 2] },
        // 海洋
        // coast: { color: "rgb(134, 191, 244)", width: 0.7, opacity: 0.8 },
        coast: false,
        // 港澳
        hkm: { color: 'gray', width: 0.7, opacity: 0 },
        // hkm: false
      },
      currentChoroplethData: { // 当前行政区的数据
        province: {},
        city: {},
        district: {}
      },
      // 当前行政区的实例
      choropleth: {},
      markerLayer: null,
      markerRotateList: [],
      timer: null,
      rotateTimer: null,
      currentProvinceIndex: 0,
      currentLevel: level || 'province',
      breadcrumb: {
        province: level === 'province' ? (province || '浙江省') : undefined,
        city
      }, // 面包屑
      breadcrumbAdcode: {}, // 面包屑对于的adcode
      initLevel: level || 'province', // 当前行政区初始化的级别
      dirllStep: ['province', 'city', 'district'],
      moduleLoopFinished: false, // 周边模块是否循环完成
      loopAreaFinished: false, // 当前层级的行政区是否循环完成
      companySumScale: [5, 15, 25, 36, 50], // 企业数量比例尺,
      loop: this.$route.query.loop || true,
    }
  },
  mounted() {
    this.init(this.publicPath + 'map/china.json', 'country')
  },
  methods: {
    // 初始化
    init(url, initLevel) {
      this.choropleth?.scene?.destroy();
      this.choropleth.scene?.removeAllMakers?.();
      this.choropleth.removeAllLayer?.();
      this.choropleth?.destroy?.();
      this.destroyScence()
      this.initLevel = initLevel
      this.dirllStep = dirllMap[initLevel]
      $.getJSON(url, data => {
        this.currentChoroplethData[initLevel] = data
        // 初始化地图
        this.choropleth = new Choropleth('mapL7', this.getOptions(mapData));
        this.markerLayer = new MarkerLayer({});
        this.choropleth.on('loaded', () => {
          const maps = document.querySelector('.amap-maps')
          maps && (maps.style.background = 'rgba(0, 0, 0, 0)') // 处理闪白屏问题
          this.mapLoading = false
          // 禁止地图滚动缩放
          this.choropleth.scene?.setMapStatus({
            doubleClickZoom: false, // 双击放大
            zoomEnable: false, // 滚动缩放
            rotateEnable: false // 旋转
          });
          // 去掉轮廓线
          this.choropleth.scene?.map.setFeatures([]);
          setTimeout(() => {
            this.setMarker(mapData)
          }, 1000);
        });
      })
    },
    getOptions(data) {
      const _this = this;
      const options = {
        // 地图容器配置
        map: {
          viewMode: '3D',
          type: 'amap',
          style: 'blank',
          center: [120.19382669582967, 30.258134],
          zoom: 5,
          pitch: 0,
          logo: false,
          token: 'bad6278ba83f0f9dc05a9d734bb40f00',
        },
        geoArea: {
          url: this.publicPath + 'map/choropleth-data',
          type: 'topojson',
        },
        // 关联数据
        source: {
          data,
          joinBy: { sourceField: 'name' },
        },
        // 地图等级
        viewLevel: {
          level: 'country',
          adcode: 100000,
        },
        // 根据容器宽高自定义图表
        autoFit: true,
        // 设置地图颜色
        color: {
          field: 'name',
          value: ['rgba(3, 166, 221, 0.8)', 'rgba(23, 148, 237, 0.8)', 'rgba(6, 94, 200, 0.8)', 'rgba(23, 78, 178, 0.8)', 'rgba(3, 66, 175, 0.8)', 'rgba(18, 47, 152, 0.8)', 'rgba(12, 38, 134, 0.8)'],
          scale: { type: 'cat' },
        },
        // 边框
        chinaBorder: this.chinaBorder,
        // 边界颜色
        style: {
          opacity: 1,
          stroke: 'rgb(88,205,247)',
          lineWidth: 0.6,
          lineOpacity: 1,
        },
        tooltip: {
          inPlot: false,
          offsets: [20, -20],
          items: ['name', 'adcode'],
          customContent: (title, items) => {
            return _this.customContent(title, items);
          }
        },
      }
      return options
    },
    // 绘制散点
    setMarker(nodes) {
      this.choropleth.scene?.removeAllMakers?.();
      for (let i = nodes.length - 1; i >= 0; i--) {
        let { center } = nodes[i];
        center = center.split(',')
        const lng = Number(center[0])
        const lat = Number(center[1])
        const icon = document.createElement('div')
        const className = this.setCircle(i)
        icon.className = 'marker1 marker' + className
        const marker = new Marker({
          element: icon,
          anchor: 'center'
        }).setLnglat({
          lng,
          lat
        });
        this.markerLayer.addMarker(marker);
      }
      // 旋转icon
      clearInterval(this.timer)
      let times = 0
      const skipProvince = ['台湾省', '澳门特别行政区', '香港特别行政区']
      this.timer = setInterval(() => {
        this.showRotateIcon = true
        if (!skipProvince.includes(nodes[times]?.name)) {
          times = times < nodes.length ? times : 0;
          if (this.currentChoroplethData.country.features) {
            tooltipsData = nodes[times];
            this.setRotateMarker(nodes[times])
            this.times = times
          }
        }
        ++times;
      }, 5000);
      this.choropleth.scene?.addMarkerLayer(this.markerLayer);
    },
    createRotateIcon() {
      let icon = document.querySelector('.rotate-icon')
      if (!icon) {
        icon = document.createElement('img')
        icon.src = rotateIcon;
        icon.className = 'rotate-icon'
        icon.style.position = 'relative'
        icon.style.width = '44px'
        icon.style.height = '44px'
        clearInterval(this.rotateTimer)
        let deg = 5
        icon.style.transform = `rotateZ(${deg}deg)`
        this.rotateTimer = setInterval(() => {
          if (deg > 1000000) { deg = 0 }
          deg += 5
          icon.style.transform = `rotateZ(${deg}deg)`
        }, 100)
      }
      return icon
    },
    destroyScence() {
      const divs = document.querySelectorAll('#mapL7>div')
      const amapDiv = []
      const amapScence = []
      Array.from(divs).forEach((div) => {
        if (div.id?.includes('l7_amap_div')) {
          amapDiv.push({ id: div.id, node: div })
        } else if (div.id?.includes('l7-scene-')) {
          amapScence.push({ id: div.id, node: div })
        }
      })
      if (amapDiv.length > 0) {
        amapDiv.forEach(item => item.node.parentNode.removeChild(item.node))
        amapScence.forEach(item => item.node.parentNode.removeChild(item.node))
      }
      this.markerRotate = null
      this.markerRotateList.forEach(marker => {
        marker.remove()
      })
      this.markerRotateList = []
    },
    customContent(title, items) {
      const data = tooltipsData || {}
      const tooltipsNode = document.createElement('div');
      if (items.length) {
        const tooltips = `<div class="custom-tooltips">
          <p class="title">
            <span class="title-icon">
              <span></span>
            </span>
            <b style="transform: matrix(0.99, 0, -0.16, 1, 0, 0);">${items[0]?.value}</b>
          </p>
          <ul class="ul">
            <li class="li">
              <div class="li-left">全量投诉</div>
              <div class="li-right">${data.data1 || '--'} 件</div>
            </li>
            <li class="li">
              <div class="li-left">监管转办投诉</div>
              <div class="li-right">${data.data2 || '--'} 件</div>
            </li>
            <li class="li">
              <div class="li-left">多元方式化解投诉</div>
              <div class="li-right">${data.data3 || '--'} 件</div>
            </li>
          </ul>
          <ul class="ul ul-order">
            <li class="li">
              <div class="li-left">15日办结率</div>
              <div class="li-right">${(data.data4 * 100).toFixed(2) || '--'}%</div>
              <div class="li-order">第${data.data5 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">平均处理期限</div>
              <div class="li-right">${data.data6.toFixed(2) || '--'}天</div>
              <div class="li-order">第${data.data7 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">每网点投诉</div>
              <div class="li-right">${data.data8.toFixed(2) || '--'} 件</div>
              <div class="li-order">第${data.data9 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">每百万客户投诉</div>
              <div class="li-right">${data.data10.toFixed(2) || '--'}件</div>
              <div class="li-order">第${data.data11 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">每百亿资产投诉</div>
              <div class="li-right">${data.data12.toFixed(2) || '--'}件</div>
              <div class="li-order">第${data.data13 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">升级投诉率</div>
              <div class="li-right">${(data.data14 * 100).toFixed(2) || '--'}%</div>
              <div class="li-order">第${data.data15 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">反复投诉率</div>
              <div class="li-right">${(data.data16 * 100).toFixed(2) || '--'}%</div>
              <div class="li-order">第${data.data17 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">多元方式化解投诉比率</div>
              <div class="li-right">${(data.data18 * 100).toFixed(2) || '--'}%</div>
              <div class="li-order">第${data.data19 || '--'}名</div>
            </li>
            <li class="li">
              <div class="li-left">客户满意度</div>
              <div class="li-right">${(data.data20 * 100).toFixed(2) || '--'}%</div>
              <div class="li-order">第${data.data21 || '--'}名</div>
            </li>
          </ul>
        </div>`
        return parseElement(tooltips)[0]
      }
      return tooltipsNode;
    },
    setCircle(companySum) {
      if (companySum >= this.companySumScale[3]) {
        return 5
      } else if (companySum >= this.companySumScale[2]) {
        return 4
      } else if (companySum >= this.companySumScale[1]) {
        return 3
      } else if (companySum >= this.companySumScale[0]) {
        return 2
      }
      return 1
    },
    setRotateMarker(node) {
      const { name, adcode } = node;
      let { center } = node;
      center = center.split(',')
      const lng = Number(center[0])
      const lat = Number(center[1])
      if ((lng && lat) || center) {
        const icon = this.createRotateIcon()
        if (this.markerRotate) {
          this.markerRotate = this.markerRotate.setLnglat({
            lng,
            lat
          });
        } else {
          this.markerRotate = new Marker({
            element: icon,
            anchor: 'center',
            offsets: [-22, 22]
          }).setLnglat({
            lng,
            lat
          });
          this.markerLayer.addMarker(this.markerRotate);
          this.choropleth.scene?.addMarkerLayer(this.markerLayer);
        }
        this.markerRotateList.push(this.markerRotate)
        if (this.choropleth.tooltip) {
          this.choropleth.tooltip.updateTooltip({
            lngLat: {
              lng,
              lat
            },
          }, {
            items: [
              { name: 'name', value: name },
              { name: 'adcode', value: adcode }
            ]
          });
          this.choropleth.tooltip.showTooltip()
          const container = document.querySelector('.l7plot-tooltip-container')
          if (container && container.style.top?.slice(0, -2) > 200) {
            container.style.top = '200px'
          }
          if (container && container.style.left?.slice(0, -2) > 800) {
            container.style.left = '800px'
          }
        }
      }
    },
  }
}
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  display: flex;
  width: 100%;
  height: calc(100% - 110px);

  .breadcrumb {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10000;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
    text-shadow: 0px 0px 30px rgba(30, 242, 255, 0.3);
    transform: matrix(1, 0, -0.08, 1, 0, 0);

    .enable:hover {
      cursor: pointer;
      color: rgba(255, 199, 0, 1)
    }
  }
}

#mapL7 {
  text-align: left;
  position: relative;
  top: -50px;
  z-index: 1;
  // transform: scale(1.2);
  transform-origin: 50% 50%;
  width: calc(100% + 100px);
  height: calc(100% + 200px);
  background: rgba(0, 0, 0, 0);

  /deep/ .amap-maps {
    background: #071531;
  }
  /deep/ .el-loading-spinner{
    top: 35%;
  }
}

.lenged {
  position: absolute;
  top: 80%;
  left: 20px;
  z-index: 0;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 14px;

  &-item {
    text-align: left;

    p {
      width: 50px;
      height: 4px;
      margin-bottom: 5px;
    }

    .blue {
      background: #08A5CE;
    }

    .green {
      background: #09CEA9;
    }

    .yellow {
      background: #FFE600;
    }

    .orange {
      background: #FA8C16;
    }

    .red {
      background: #FB3F22;
    }

    span {
      font-weight: 700;
      font-size: 12px;
      color: #D1E2FF;
      transform: matrix(0.99, 0, -0.15, 1, 0, 0);
    }
  }
  &-items {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      font-size: 12px;
      display: inline-block;
      -webkit-transform: scale(0.83);
      transform: scale(0.83);
      transform-origin: 0 0;
    }
  }
  .move-top {
    position: relative;
    top: 6px;
    text-align: center;
  }

  &-title {
    display: flex;
    align-items: center;

    .lenged-item:first-child {
      margin-right: 20px;
      // box-sizing: border-box;
      width: 12px;
      height: 12px;
      background: rgba(255, 210, 51, 0.5);
      border: 2px solid #FFFFFF;
      border-radius: 50%;
    }

    .lenged-item-label {
      font-weight: 700;
      font-size: 14px;
      color: #D1E2FF;
    }
  }
}

/deep/.l7plot-tooltip-container {
  z-index: 9999;
  width: calc(100% - 32px);
  height: 100%;
}

/deep/.l7plot-tooltip-container {
  width: 277px;
  height: 350px;
}

/deep/.custom-tooltips {
  text-align: left;
  padding: 10px;
  width: 277px;
  height: 350px;
  color: #ffffff;
  border: 1px solid rgba(192, 229, 255, 0.6);
  background: linear-gradient(178.54deg, #262F84 -1.72%, rgba(12, 41, 84, 0.88) -1.71%, rgba(8, 15, 53, 0.71) 98.75%);

  .title {
    display: flex;
    gap: 10px;
    padding-bottom: 12px;

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12px;
      height: 12px;
      background: #2457BA;
      box-shadow: inset 0px 0px 4px rgba(10, 59, 87, 0.5);

      span {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #1C35B3;
      }
    }
  }

  .ul {
    padding: 6px 0;
    border-top: 1.5px solid #607BC2;

    .li {
      display: flex;
      justify-content: space-between;

      &-left {
        padding: 4px 0;
        font-size: 12px;
        font-weight: 700;
        color: #D1E2FF;
      }

      &-right {
        font-size: 11px;
        transform: scale(0.83);
        transform-origin: 100% 50%;
        font-weight: 700;
        color: #FFE600;
        transform: matrix(0.98, 0, -0.18, 1, 0, 0);
      }
    }
  }

  .ul-order {
    li {
      .li-left {
        flex: 1;
      }

      .li-right {
        width: 60px;
        text-align: right;
      }

      .li-order {
        width: 50px;
        text-align: right;
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
      }
    }
  }
}

/deep/.marker1 {
  width: 14px;
  height: 14px;
  // width: 4px;
  // height: 4px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, #08A5CE 0%, #A7EDFF 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 30px 10px rgba(36, 234, 167, 0.5);
}

/deep/.marker2 {
  // width: 10px;
  // height: 10px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, #09CEA9 0%, #09BCB9 40.1%, #8CE7FF 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 30px 10px rgba(36, 234, 167, 0.5);
}

/deep/.marker3 {
  // width: 16px;
  // height: 16px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, #FFE600 0%, #FFE708 45.31%, #FFFFFF 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 30px 10px rgba(36, 234, 167, 0.5);
}

/deep/.marker4 {
  // width: 22px;
  // height: 22px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, #FA8C16 0%, #FCAB0E 61.46%, #FFF277 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 30px 10px rgba(36, 234, 167, 0.7)
}

/deep/.marker5 {
  // width: 28px;
  // height: 28px;
  border-radius: 50%;
  background: radial-gradient(50% 50% at 50% 50%, rgba(251, 63, 34, 0.8) 0%, rgba(251, 94, 29, 0.8) 55.21%, rgba(253, 159, 33, 0.8) 89.58%);
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 30px 10px rgba(36, 234, 167, 0.7);
}

#rotate-icon {
  position: relative;
  z-index: 10;
  width: 44px;
  height: 44px;
  -webkit-animation: gif1 6s infinite linear;
  animation: gif1 6s infinite linear;
}

@keyframes gif1 {
  0% {
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }

  100% {
    -webkit-transform: rotateZ(360deg);
    transform: rotateZ(360deg);
  }
}

/deep/.el-loading-mask {
  background-color: #071531;
}
</style>
