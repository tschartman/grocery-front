import "./plugins/vuetify";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import moment from "moment";


Vue.config.productionTip = false;

    Vue.prototype.$http = Axios;

    Axios.interceptors.request.use(
      (config) => {
        let token = localStorage.getItem('token');
    
        if (token) {
          config.headers['Authorization'] = `Bearer ${ token }`;
        }
    
        return config;
      }, 
    
      (error) => {
        return Promise.reject(error);
      }
    );

    Axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if (error.response.status == 401){
        let refresh = localStorage.getItem('refresh');
        if (refresh){
          let newRefresh = {'refresh': refresh}
          store
          .dispatch("refresh", newRefresh)
          .catch(err => console.log(err));
        } 
      }
    });

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
