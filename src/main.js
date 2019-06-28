import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use({
  install (Vue) {
  Vue.prototype.$api = axios.create({
  })
}
})

// currency filter
Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
  });
  return formatter.format(value);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
