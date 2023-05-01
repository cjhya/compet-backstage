import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import HomePage from "../views/HomePage.vue";
import Authority from "../views/User/Authority.vue";
import Role from "../views/User/Role.vue";
import User from "../views/User/User.vue";
import Classification from "../views/Competition/Classification.vue";
import CompetInfor from "../views/Competition/CompetInfor.vue";
import ArticleInfor from "../views/Forum/ArticleInfor.vue";
import ChatRecord from "../views/Message/ChatRecord.vue"

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "login",
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/home",
      component: Home,
      redirect: "/user",
      children: [
        { path: "/homePage", component: HomePage },
        { path: "/authority", component: Authority },
        { path: "/role", component: Role },
        { path: "/user", component: User },
        { path: "/classification", component: Classification },
        { path: "/competInfor", component: CompetInfor },
        { path: "/articleInfor", component: ArticleInfor },
        { path: "/chatRecord", component: ChatRecord },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/login");
  next();
});

export default router;
