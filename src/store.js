import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
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
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
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
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refresh);
            axios.defaults.headers.common["Authorization"] = `Bearer ${ token }`;;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            localStorage.setItem("refresh", refresh);
            reject(err);
          });
      });
    },
    refresh({commit}, refresh) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:8000/api/token/refresh/",
          data: refresh,
          method: "POST"
        })
        .then(resp => {
          const token = resp.data.access;
          localStorage.setItem("token", token);
          localStorage.removeItem("refresh");
          axios.defaults.headers.common["Authorization"] = `Bearer ${ token }`;;
          commit("auth_success", token);
          resolve(resp);
        })
        .catch(err => {
          commit("auth_error");
          console.log(err)
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          reject(err);
        });
      });
    },
    register({ commit }, user) {
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
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", refresh);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, refresh);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            localStorage.setItem("refresh", refresh);
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  plugins: [
    createPersistedState({
      paths: ["visits"]
    })
  ]
});
