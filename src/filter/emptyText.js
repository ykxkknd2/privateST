import Vue from 'vue';

/**
 * 空文本格式化
 */
Vue.filter('emptyText', function(value) {
  if (value === undefined || value === '') return '- -';

  return value
});
