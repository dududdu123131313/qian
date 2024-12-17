import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// 创建一个新的 store 实例
const store = createStore({
  // 数据，相当于 data
  state: {
    userInfo: {
      name: "",
      accountName: "",
      phonenumber: ""
    }
  },
  // getters
  getters: {
    getUserInfo: state => state.userInfo
  },
  // 里面定义方法，操作 state 的方法
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo.name = payload.name;
      state.userInfo.accountName = payload.accountName;
      state.userInfo.phonenumber = payload.phoneNumber;
    }
  },
  // 操作异步操作 mutation
  actions: {
   
  },
  // 模块
  modules: {
  },
  plugins: [createPersistedState({
    // 配置需要持久化存储的 state 数据的键名，这里指定持久化整个userInfo对象
    paths: ['userInfo']
  })]
});

export default store;