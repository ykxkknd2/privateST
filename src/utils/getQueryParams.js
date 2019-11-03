/**
 * 获取链接的查询参数，生成对象格式
 */
export default function getQueryParams() {
  let ret = {};
  decodeURIComponent(window.location.search).substr(1).replace(/(\w+)=([^&]*)(&|$)/ig, function(a, b, c) {
    ret[b] = c;
  });
  return ret;
}
