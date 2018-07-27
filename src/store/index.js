/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/26 026
 * @description Description
 */
import Vuex from 'vuex';

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
