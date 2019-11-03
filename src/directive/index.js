import Vue from 'vue';

Vue.directive('permission', {
  inserted(el, binding) {
    if (true) {
      el.remove();
    }
  }
});
