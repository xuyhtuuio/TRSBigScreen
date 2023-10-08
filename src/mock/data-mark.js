/* eslint-disable */
import Mock from 'mockjs';
const res = {
  data: {},
  exception: null,
  msg: '共 <b>12345</b> 篇文章，过滤得到 <span style="color: blue;">9876</span> 篇，您将对过滤后的文章进行标注。',
  status: 200,
  success: true,
  timestamp: '1656551281496'
}
export default [
  // get请求需要用正则匹配，来处理params
  Mock.mock(/\/mock\/humanMark\/queryHumanMarkByCondition/, 'post', res),
];