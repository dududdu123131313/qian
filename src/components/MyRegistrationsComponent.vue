<template>
  <div class="my-registrations-container">
    <h1 class="title">我的挂号</h1>
    <div class="registration-info-container">
      <registration-info
                    v-for="reg in filteredRegistrationInfo"
                    :key="reg.medicalNumber"
                    :registration="reg"
      ></registration-info>
    </div>
  </div>
</template>

<script>
import RegistrationInfo from './RegistrationInfo.vue';
import axios from 'axios';
import { mapState } from 'vuex'; // 引入mapState辅助函数用于获取Vuex中的state数据

export default {
  components: {
    RegistrationInfo
  },
  data() {
    return {
      registrationInfo: [],
      filteredRegistrationInfo: []
    };
  },
  computed: {
   ...mapState({
      accountName: state => state.userInfo.accountName // 从Vuex的state中获取accountName
    })
  },
  mounted() {
    // 在组件挂载时（页面加载时）就发起查询请求，使用从Vuex获取的accountName作为参数
    this.fetchRegistrationInfoByAccountName();
  },
  methods: {
    async fetchRegistrationInfoByAccountName() {
      try {
        const response = await axios.get(`/registrationLists/account/${this.accountName}`);
        this.registrationInfo = response.data;
        this.filterRegistrationInfo();
      } catch (error) {
        console.error('Error fetching registration info by account name:', error);
      }
    },
    filterRegistrationInfo() {
      this.filteredRegistrationInfo = this.registrationInfo.filter(item => item.accountName === this.accountName);
    }
  }
};
</script>

<style scoped>
.my-registrations-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; /* 使容器占满整个视口高度 */
  width: 100%; /* 沾满整个视口宽度 */
  box-sizing: border-box; /* 确保 padding 不会影响宽度和高度 */
  padding: 20px; /* 根据需要添加内边距 */
  margin-left: 20px; /* 侧边栏宽度 */
}

.title {
  margin-bottom: 20px;
}

.registration-info-container {
  width: 80%;
  max-width: 1200px;
  flex: 1;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.nav-bar {
  width: 200px;
  height: 100%;
  position: fixed;
  background-color: #3131FF;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
</style>