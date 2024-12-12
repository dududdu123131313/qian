<template>
  <div id="home">
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
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
  <div>
    <h1>主页</h1>
    <p>这里是主页，欢迎使用医疗预约系统。</p>
    <!-- 使用日历组件 -->
    <CalendarComponent />
  </div>

</template>

<script>
// 引入日历组件
import CalendarComponent from './CalendarComponent.vue';

export default {
  name: 'HomeComponent',
  components: {
    // 注册日历组件
    CalendarComponent
  }

};

</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  display: flex;
  height: 100%;
  width: 100%;
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

.nav-title {
  font-size: 34px;
  font-weight: bold; /* 加粗 */
  margin-bottom: 20px; /* 与导航项之间的间隔 */
}

.nav-item {
  color: white;
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  padding: 10px;
  border-bottom: 1px solid #ffffff;
}

.nav-item:hover, .nav-item.active {
  background-color: #a5a5a5;
}

.main-content {
  margin-left: 220px; /* Adjust the margin to account for the width of the nav-bar plus padding */
  padding: 20px;
  width: 100%; /* Ensure the main content takes up the remaining space */

  background: 100%;

}
</style>