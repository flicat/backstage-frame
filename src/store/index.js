/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/26 026
 * @description 全局 store
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginState: 0
  },
  mutations: {
    increment (state) {
      state.loginState = false;
    }
  }
});
