<!-- MyRegistrationsComponent.vue -->
<template>
  <div class="nav-bar">
    <h1 class="nav-title">南京市浦口人民医院</h1>
    <!-- 导航链接，使用router-link -->
    <router-link to="/home" class="nav-item">主页</router-link>
    <router-link to="/registration" class="nav-item">预约挂号</router-link>
    <router-link to="/my-registrations" class="nav-item">我的挂号</router-link>
    <router-link to="/my-bills" class="nav-item">我的账单</router-link>
    <router-link to="/my-messages" class="nav-item">消息中心</router-link>
    <router-link to="/profile" class="nav-item">个人中心</router-link>
  </div>

  <div class="my-registrations-container">
    <h1 class="title">我的挂号</h1>
    <!-- 添加输入框和查询按钮 -->
    <input type="text" v-model="searchAccountName" placeholder="输入账户名查询" />
    <button @click="fetchRegistrationInfoByAccountName">查询</button>
    <div class="registration - info - container">
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

export default {
  components: {
    RegistrationInfo
  },
  data() {
    return {
      registrationInfo: [],
      filteredRegistrationInfo: [],
      searchAccountName: ""
    };
  },
  methods: {
    async fetchRegistrationInfoByAccountName() {
      try {
        const response = await axios.get(`/registrationLists/account/${this.searchAccountName}`);
        this.registrationInfo = response.data;
        this.filterRegistrationInfo();
      } catch (error) {
        console.error('Error fetching registration info by account name:', error);
      }
    },
    filterRegistrationInfo() {
      this.filteredRegistrationInfo = this.registrationInfo.filter(item => item.accountName === this.searchAccountName);
    }
  }
};
</script>

<style scoped>

.my-registrations-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* 使容器占满整个视口高度 */
  width: 100%; /* 沾满整个视口宽度 */
  box-sizing: border-box; /* 确保 padding 不会影响宽度和高度 */
  padding: 20px; /* 根据需要添加内边距 */
  margin-left: 200px; /* 侧边栏宽度 */
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
  background-color:#3131FF ;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

</style>