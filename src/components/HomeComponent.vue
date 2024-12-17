<template>
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

.main-content {
  margin-left: 220px; /* Adjust the margin to account for the width of the nav-bar plus padding */
  padding: 20px;
  width: 100%; /* Ensure the main content takes up the remaining space */

  background: 100%;

}
</style>