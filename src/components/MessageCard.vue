<!-- MessageCard.vue -->
<template>
    <div class="message-card" @click="showDetails">
      <div class="message-title">{{ title }}</div>
      <div class="message-content">{{ content }}</div>
      <div class="message-time">{{ time }}</div>
      <div v-if="!isRead" class="unread-dot"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      content: String,
      time: String,
      isRead: Boolean
    },
    methods: {
      showDetails() {
        this.$emit('show-details', { title: this.title, content: this.content, time: this.time });
      }
    }
  };
  </script>
  
  <style scoped>
  .message-card {
    width: 100%; /* 宽度固定为100% */
    padding: 15px; /* 内边距 */
    border: 1px solid #dddddd; /* 边框 */
    border-radius: 8px; /* 圆角 */
    margin-bottom: 10px; /* 底部外边距 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
    display: flex;
    flex-direction: column; /* 列布局 */
    background-color: white;
  }
  
  .message-title {
    font-weight: bold; /* 加粗体标题 */
    border-bottom: 2px solid #333; /* 底部边框加粗 */
    padding-bottom: 10px; /* 底部内边距 */
    margin-bottom: 10px; /* 底部外边距 */
  }
  
  .message-content {
    text-align: justify; /* 内容两端对齐 */
    margin-bottom: 10px; /* 底部外边距 */
  }
  
  .message-time {
    align-self: flex-end; /* 自动对齐方式为flex-end */
    font-size: 0.9em; /* 字体大小 */
    color: #888; /* 字体颜色 */
  }
  </style>