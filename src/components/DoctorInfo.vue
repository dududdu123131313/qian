<template>
  <div class="doctor-box">
    <div class="doctor-info">
      <div class="doctor-profile">
        <img :src="doctorImage" alt="doctor photo" />
        <div>
          <h3>{{ doctor.name }}</h3>
          <p>{{ doctor.department }}</p>
          <p>{{ doctor.outpatientType }}</p>
        </div>
      </div>
      <div class="appointment-options">
        <p>可预约时间：{{ formatDateTime(doctor.visitTime) }}</p>
        <!-- 显示剩余号数 -->
        <p v-if="doctor.remainingNumbers > 0">剩余号数：{{ doctor.remainingNumbers }}</p>
        <button @click="showAppointmentModal = true">预约</button>
      </div>
    </div>
    <div class="fee">挂号费 {{ doctor.cost }}元</div>
  </div>

  <!-- 模态窗口 -->
  <div v-if="showAppointmentModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showAppointmentModal = false">&times;</span>
      <h2>预约医生：{{ doctor.name }}</h2>
      <p>科室：{{ doctor.department }}</p>
      <p>类型：{{ doctor.outpatientType }}</p>
      <p>可预约时间：{{ formatDateTime(doctor.visitTime) }}</p>
      <!-- 显示剩余号数 -->
      <p v-if="doctor.remainingNumbers > 0">剩余号数：{{ doctor.remainingNumbers }}</p>
      <!-- 显示挂号费 -->
      <p>挂号费：{{ doctor.cost }}元</p>
      <label for="patient">选择挂号人：</label>
      <select id="patient" v-model="selectedPatient">
        <option disabled value="">请选择</option>
        <option v-for="patient in patients" :key="patient.id" :value="patient">{{ patient.name }}</option>
      </select>
      <!-- 支付按钮 -->
      <button class="payment-button" @click="handlePayment">支付</button>
    </div>
  </div>
</template>

<script>
import doctorImage from '@/assets/doctor.png';
import axios from 'axios';

export default {
  props: {
    doctor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      doctorImage: doctorImage,
      showAppointmentModal: false,
      selectedPatient: '',
      patients: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
      ]
    };
  },
  computed: {
    // 从个人中心获取用户名、姓名和电话
    currentUser() {
      // 假设这些信息存储在另一个组件或者 Vuex store 中
      // 这里只是一个示例，你需要根据实际情况调整
      return {
        username: this.$root.username, // 从根组件获取用户名
        name: this.$root.name, // 从根组件获取姓名
        phone: this.$root.phone, // 从根组件获取电话
      };
    }
  },

  methods: {
    bookAppointment(doctor) {
      alert(`预约${doctor.name}在${doctor.VisitTime}`);
    },
    handlePayment() {
      if (this.selectedPatient) {
        const registrationTime = new Date();
        registrationTime.setHours(registrationTime.getHours() + 8);
        // 构建要发送到后端的数据对象
        const RegistrationList = {
          name:  this.selectedPatient.name ,
          age: '18', // 假设年龄信息需要从其他地方获取
          phoneNumber: '13363618523', // 假设电话号码信息需要从其他地方获取
          department: this.doctor.department,
          visitTime: this.doctor.visitTime,
          registrationTime:  registrationTime.toISOString(),
          doctor_Name: this.doctor.name,
          outpatientType: this.doctor.outpatientType,
          accountName: 'user123', // 假设你有一个方法来获取当前登录用户的用户名
        };

        // 使用 axios 发送 POST 请求到后端
        axios.post('http://10.3.83.194:8088/registrationLists/addRegistration', RegistrationList)
          .then(response => {
            // 请求成功，处理响应
            console.log('Appointment successful:', response.data);
            alert('预约成功！');
            this.showAppointmentModal = false; // 关闭模态框
          })
          .catch(error => {
            // 请求失败，处理错误
            console.error('Appointment failed:', error.response || error.message);
            alert('预约失败，请重试。');
          });
      } else {
        alert('请选择挂号人。');
      }
    },
    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  }
};
</script>

<style scoped>
.doctor-box {
  width: 30%;
  min-width: 240px;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.doctor-profile {
  display: flex;
  align-items: center;
}

.doctor-profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.appointment-options {
  margin-top: 20px;
}

.fee {
  margin-top: 20px;
  font-weight: bold;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.close {
  float: right;
  font-size: 24px;
  cursor: pointer;
}

/* 支付按钮样式 */
.payment-button {
  background-color: #3161FF; /* 蓝色背景 */
  color: #ffffff; /* 白色文字 */
  padding: 10px 20px; /* 内边距 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  cursor: pointer; /* 鼠标指针 */
  font-size: 16px; /* 文字大小 */
  margin-top: 10px; /* 外边距 */
  float: right;
}

.payment-button:hover {
  background-color: #2980b9; /* 鼠标悬停时的背景颜色 */
}
</style>