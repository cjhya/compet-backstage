import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//保存数据
const state = {
  user:{}
};

//获取state数据
const getters = {
  getUser(state) {
    return state.user;
  },
};

//同步执行修改state值方法
const mutations = {
  updateUser(state,data) {
    state.user = data;
  },
};

//异步执行mutations方法
const actions = {
  asyncUpdateUser(content, user) {
    content.commit("updateUser", user);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
