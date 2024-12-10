<!-- MyBillsComponent.vue -->
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
  <div class="my-bills-container">
    <h1 class="title">我的账单</h1>
    <div class="bill-list-container">
      <bill-list></bill-list>
    </div>
  </div>
</template>

<script>
import BillList from './BillList.vue';

export default {
  components: {
    BillList
  }
};
</script>

<style scoped>
.my-bills-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%; /* 使容器占满整个视口高度 */
  width: 100%;
  margin-top: 60px; /* 顶部导航栏的高度 */
  margin-bottom: 60px; /* 底部版权信息的高度 */

}

.title {
  margin-bottom: 20px; /* 为标题和账单列表之间添加一些间距 */
}

.bill-list-container {
  width: 80%; /* 设置矩形框的宽度，或者使用百分比、vw/vh等其他单位 */
  max-width: 2400px; /* 设置最大宽度，防止在大屏幕上过宽 */
  flex: 1; /* 使矩形框占据剩余空间 */
  overflow-y: auto; /* 如果内容溢出，添加滚动条 */
  border: 1px solid #ddd; /* 为矩形框添加边框 */
  padding: 20px; /* 为矩形框添加内边距 */
  background-color: #f9f9f9; /* 为矩形框添加背景颜色 */
  border-radius: 8px; /* 为矩形框添加圆角 */
}
.my-bills-container {
  margin-left: 200px;
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