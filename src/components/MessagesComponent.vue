<!-- MessagesComponent.vue -->
<template>
  <div class="container">
    <h1 class="title">消息中心</h1>
    <div class="messages-list">
      <message-card
        v-for="message in messages"
        :key="message.id"
        :title="message.title"
        :content="message.content"
        :time="message.time"
        :is-read="message.isRead"
        @show-details="displayMessageDetails"
      ></message-card>
    </div>
    <div v-if="showDetails" class="modal">
      <div class="modal-content">
        <h2>{{ details.title }}</h2>
        <p>{{ details.content }}</p>
        <p>{{ details.time }}</p>
        <button @click="closeDetails">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import MessageCard from './MessageCard.vue';
import axios from 'axios';

export default {
  name: 'MessagesComponent',
  components: {
    MessageCard
  },
  data() {
    return {
      messages: [
        { id: 1, title: '欢迎！', content: '欢迎使用医院预约挂号系统', time: '2024-07-20 08:00', isRead: false },
        // 更多消息...
      ],
      showDetails: false,
      details: {},
      intervalId: null, // 用于存储定时器的 ID
    };
  },


  created() {
    this.startCheckingForMessages(); // 组件创建后开始检查新消息
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // 组件销毁前清除定时器
    }
  },

  methods: {
    displayMessageDetails(details) {
      this.details = details;
      this.showDetails = true;
    },
    closeDetails() {
      this.showDetails = false;
    },
    startCheckingForMessages() {
      this.intervalId = setInterval(() => {
        this.fetchMessages();
      }, 10000); // 每 10 秒检查一次新消息
    },
    fetchMessages() {
      // 模拟从后端获取新消息的过程
      axios.get('/messages')
        .then(response => {
          const newMessages = response.data;
          this.messages = [...this.messages, ...newMessages];
        })
        .catch(error => {
          console.error('Error fetching messages:', error);
        });
    },
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh; /* 使容器占满整个视口高度 */
  width: calc(100% - 200px); /* 宽度减去 nav-bar 的宽度 */
  box-sizing: border-box; /* 确保 padding 不会影响宽度和高度 */
  padding: 20px; /* 根据需要添加内边距 */
  margin-left: 200px; /* 与 nav-bar 保持一定距离 */
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.messages-list {
  max-width: 95%;
  margin: 0 20px;
}

.message-card {
  margin-bottom: 20px;
  cursor: pointer; /* 添加手型指针 */
}

.modal {
  position: fixed; /* 固定定位，相对于浏览器窗口定位 */
  top: 50%; /* 从顶部开始，位于视口高度的50% */
  left: 50%; /* 从左侧开始，位于视口宽度的50% */
  transform: translate(-50%, -50%); /* 向左和向上移动自身尺寸的50%，以确保完全居中 */
  width: 50%; /* 宽度为视口宽度的50% */
  height: 50%; /* 高度为视口高度的50% */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐子元素 */
  justify-content: center; /* 水平居中对齐子元素 */
  box-sizing: border-box; /* 边框和内边距包含在宽度和高度内 */
  
}

.modal-content {
  background-color: white;
  text-align: center;
  height: 100%;
  width: 100%;
  border: 2px solid black; /* 添加边框线 */
  border-radius: 10px; /* 为边框添加圆角 */
}

button {
  margin-top: 20px;
}

.container {

  margin-left:20px;
 /* 使容器占满整个视口高度 */
  width: 100%; /* 沾满整个视口宽度 */
/* 根据需要添加内边距 */
}
</style>