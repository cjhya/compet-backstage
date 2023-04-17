import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//保存数据
const state = {};

//获取state数据
const getters = {
  getUser(data) {
    if (data in state) return state.data;
  },
};

//同步执行修改state值方法
const mutations = {
  updateUser(user) {
    state.user = user;
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
