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
  <div class="profile-container">
    <h1 class="title">个人中心</h1>
    <div class="section-box account-info">
      <h2 class="section-title">账号信息</h2>
      <p>用户名: <strong>{{ username }}</strong></p>
      <p>姓名: <strong>{{ name }}</strong></p>
      <p>手机号: <strong>{{ phone }}</strong></p>
      <button @click="changePassword">修改密码</button>
      <button @click="bindPhone">绑定手机号</button>
      <button @click="logout">退出登录</button>
    </div>
    <div class="section-box">
      <h2 class="section-title">实名认证信息</h2>
      <p v-if="isRealNameVerified">姓名: {{ realNameInfo.name }}</p>
      <p v-if="isRealNameVerified">身份证号: {{ realNameInfo.idNumber }}</p>
      <button :disabled="isRealNameVerified" @click="showingRealNameModal">实名认证</button>
    </div>
    <div class="section-box">
      <h2 class="section-title">家庭成员信息</h2>
      <button @click="showAddFamilyMemberModal">添加家庭成员</button>
      <div v-for="member in familyMembers" :key="member.id" class="family-member">
        <p>姓名: {{ member.name }}</p>
        <p>年龄: {{ member.age }}</p>
        <p>性别: {{ member.gender }}</p>
        <p>身份证号: {{ member.idNumber }}</p>
      </div>
    </div>

    <!-- 添加家庭成员的弹窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>添加家庭成员</h2>
        <input type="text" v-model="newMember.name" placeholder="姓名" required />
        <input type="text" v-model="newMember.idNumber" placeholder="身份证号" required />
        <button @click="submitFamilyMember">添加</button>
      </div>
    </div>

    <!-- 实名认证的弹窗 -->
    <div v-if="showRealNameModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeRealNameModal">&times;</span>
        <h2>实名认证</h2>
        <input type="text" v-model="authInfo.name" placeholder="姓名" required />
        <input type="text" v-model="authInfo.idNumber" placeholder="身份证号" required />
        <button @click="submitRealNameVerification">认证</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileComponent',
  data() {
    return {
      username: 'user123',
      name: '张三',
      phone: '13800138000',

      familyMembers: [],
      showModal: false,
      newMember: {
        name: '',
        idNumber: ''
      },

     isRealNameVerified: false,
      realNameInfo: null,
      showRealNameModal: false,
      authInfo: { name: '', idNumber: '' },
      
      
    };
  },

  computed: {
    // 计算属性，根据实名认证状态禁用按钮
    canVerify() {
      return !this.isRealNameVerified;
    }
  },

  methods: {
    changePassword() {
      alert('修改密码功能尚未实现');
    },
    bindPhone() {
      alert('绑定手机号功能尚未实现');
    },
    logout() {
      alert('退出登录功能尚未实现');
    },
    showAddFamilyMemberModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    submitFamilyMember() {
      axios.post('/api/family-members', {
        name: this.newMember.name,
        idNumber: this.newMember.idNumber
      })
      .then(response => {
        this.familyMembers.push(response.data);
        this.newMember.name = '';
        this.newMember.idNumber = '';
        this.closeModal();
      })
      .catch(error => {
        console.error('Error adding family member:', error);
        alert('添加家庭成员失败，请重试。');
      });
    },
    showingRealNameModal() {
      this.showRealNameModal = true;
    },
    closeRealNameModal() {
      this.showRealNameModal = false;
    },
    submitRealNameVerification() {
      if (this.canVerify) {
        axios.post('/api/real-name-verification', {
          name: this.authInfo.name,
          idNumber: this.authInfo.idNumber
        })
        .then(response => {
           this.realNameInfo = response.data; // 假设后端返回了实名信息
           this.isRealNameVerified = true;
           this.authInfo.name = '';
           this.authInfo.idNumber = '';
           this.closeRealNameModal();
         })
        .catch(error => {
           console.error('Error during real-name verification:', error);
          alert('实名认证失败，请重试。');
        });
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.section-box {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 95%;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.account-info strong {
  margin-left: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.family-member {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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
.profile-container {
  margin-left: 250px;

}
</style>