// 模块导入
import Mock from 'mockjs';
import dataMark from './data-mark';
export default {
  startMock() {
    // 设置所有ajax请求的超时时间，模拟网络传输耗时
    Mock.setup({
      timeout: '200-600'
    })
    // 在index.js中引入数据
    dataMark
  }
};
