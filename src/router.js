import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/compareVisits/",
      name: "compareVisits",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/CompareVisits.vue")
    },
    {
      path: "/viewVisit/",
      name: "viewVisit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/ViewVisit.vue")
    },
    {
      path: "/addVisit/",
      name: "addVisit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/AddVisit.vue")
    },
    {
      path: "/addStore/",
      name: "addStore",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/AddStore.vue")
    },
    {
      path: "/itemsView/",
      name: "itemsView",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/ItemsView.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/Register.vue")
    },
    {
      path: "/secure",
      name: "secure",
      component: () =>
        import(/* webpackChunkName: "about" */ "./components/Secure.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
