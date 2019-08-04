import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import moment from "moment";

Vue.config.productionTip = false;

    Vue.prototype.$http = Axios;
    const token = localStorage.getItem("token");
    if (token) {
      Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
    }

// currency filter
Vue.filter("toCurrency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MMMM, DD, YYYY");
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
