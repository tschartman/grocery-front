import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import router from './router'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default new Vuex.Store({
  state: {
    visits: [],
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    COMPARE_VISITS: (state, visits) => {
      state.visits = visits;
    },
    SHOW_VISIT: (state, visit) => {
      state.visits = visit;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
      localStorage.setItem("token", token);
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      localStorage.removeItem("token");
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8000/api/token/",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.access;
            const refresh = resp.data.refresh;
            localStorage.setItem("refresh", refresh);
            commit("auth_success", token);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            reject(err);
          });
      });
    },
    inspect({commit}){
      const token = this.state.token;
      const refresh = localStorage.getItem('refresh');
      if(token) {
        const decoded = jwt_decode(token);
        const decoded2 = jwt_decode(refresh);
        const exp = decoded.exp
        const orig_iat = decoded2.exp
        // if token expires in 30 minutes and is not reaching lifespan
        if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
          //token expires soon refresh
         this.dispatch('refresh', localStorage.getItem('refresh'))
         console.log("refreshed")
        } else if (exp -(Date.now()/1000) < 1800){
        // token refresh expires soon so logout
        this.dispatch('logout')
        } else {
        //token is good, do nothing
        }
      }
    },
    refresh({commit}, refresh) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8000/api/token/refresh/",
          data: {'refresh': refresh},
          method: "POST"
        })
        .then(resp => {
          const token = resp.data.access;
          commit("auth_success", token);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          console.log(err)
          reject(err);
        });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        router.push({ path: "login" });
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    token: state => state.token 
  },
  plugins: [
    createPersistedState({
      paths: ["visits"]
    })
  ]
});
