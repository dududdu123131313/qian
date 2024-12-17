<!-- MyBillsComponent.vue -->
<template>
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
  height: 100%; 
  width: 100%;
  margin-top: 30px; 
  margin-bottom: 60px; 
  margin-left:20px;
  padding: 20px;
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