export function getCityData() {
  const dataTopCity = [
    // 15日办结率
    ['泉州分行', '沈阳分行', '西宁分行', '烟台分行', '济南分行'],
    // [99.10, 99.04, 99.01, 98.99, 98.87]
    // 平均处理期限
    ['佛山分行', '南昌分行', '东莞分行', '银川分行', '温州分行'],
    // [4.24, 4.11, 3.99, 3.87, 3.54]
    // 升级投诉率
    ['唐山分行', '天津分行', '济南分行', '沈阳分行', '海口分行'],
    // [15.30, 14.20, 13.21, 12.20, 12.00]
    // 反复投诉率
    ['天津分行', '郑州分行', '银川分行', '武汉分行', '唐山分行'],
    // [11.52, 11.20, 10.90, 10.04, 10.03]
    // 每网点投诉
    ['成都分行', '重庆分行', '贵阳分行', '东莞分行', '南昌分行'],
    // [142.28, 138.44, 134.84, 127.32, 126.93]
    // 每百万客户投诉
    ['北京分行', '长春分行', '长沙分行', '成都分行', '重庆分行'],
    // [200.53, 199.80, 194.05, 178.10, 173.05]
    // 每百亿资产投诉
    ['北京分行', '长春分行', '长春分行', '成都分行', '重庆分行'],
    // [114.59, 114.17, 110.89, 101.77, 98.89]
    // 多元化方式化解投诉比率
    ['温州分行', '北京分行', '沈阳分行', '唐山分行', '南京分行'],
    // [23.50, 22.63, 21.11, 21.01, 19.42]
    // 客户满意度
    ['长沙分行', '东莞分行', '长春分行', '成都分行', '合肥分行']
    // [72.77, 68.87, 63.56, 63.31, 60.18]
  ];
  const dataDownCity = [
    // 15日办结率
    ['成都分行', '长沙分行', '佛山分行', '东莞分行', '大连分行'],
    // [92.56, 92.21, 91.93, 91.15, 90.18]
    // 平均处理期限
    ['西宁分行', '乌鲁木齐分行', '广州分行', '宁波分行', '深圳分行'],
    // [1.19, 1.16, 1.11, 1.04, 1.01]
    // 升级投诉率
    ['广州分行', '南通分行', '青岛分行', '合肥分行', '贵阳分行'],
    // [6.80, 6.34, 6.21, 6.04, 5.55]
    // 反复投诉率
    ['南昌分行', '上海分行', '贵阳分行', '重庆分行', '兰州分行'],
    // [3.51, 3.36, 2.53, 2,30, 2.05]
    // 每网点投诉
    ['苏州分行', '厦门分行', '天津分行', '银川分行', '郑州分行'],
    // [62.21, 61.84, 60.49, 60.16, 54.95]
    // 每百万客户投诉
    ['西安分行', '西宁分行', '烟台分行', '银川分行', '郑州分行'],
    // [84.20, 81.0, 77.88, 57.15, 54.95]
    // 每百亿资产投诉
    ['西安分行', '西宁分行', '烟台分行', '银川分行', '郑州分行'],
    // [48.11, 46.29, 44.50, 32.60, 31.40]
    // 多元化方式化解投诉比率
    ['西安分行', '长春分行', '佛山分行', '乌鲁木齐分行', '郑州分行'],
    // [10.42， 9.85， 9.83， 9.10， 9.01]
    // 客户满意度
    ['南昌分行', '杭州分行', '兰州分行', '烟台分行', '厦门分行']
    // [44.65， 44.45， 41.93， 39.01， 38.81]
  ];

  return {
    dataTopCity,
    dataDownCity
  };
}
