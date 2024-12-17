<template>
  <div class="profile-container">
    <h1 class="title">个人中心</h1>
    <div class="section-box account-info">
      <h2 class="section-title">账号信息</h2>
      <p>用户名: <strong>{{ userInfo.accountName }}</strong></p>
      <p>姓名: <strong>{{  userInfo.name }}</strong></p>
      <p>手机号: <strong>{{  userInfo.phonenumber }}</strong></p>
      <button @click="changePassword">修改密码</button>
      <button @click="bindPhone">绑定手机号</button>
      <button @click="logout">退出登录</button>
    </div>
    <div class="section-box">
      <h2 class="section-title">实名认证信息</h2>
      <p v-if="isRealNameVerified">姓名: {{ realNameInfo.name }}</p>
      <p v-if="isRealNameVerified">身份证号: {{ realNameInfo.id }}</p>
      <button :disabled="isRealNameVerified" @click="showingRealNameModal">实名认证</button>
    </div>
    <div class="section-box">
      <h2 class="section-title">家庭成员信息</h2>
      <button @click="showAddFamilyMemberModal">添加家庭成员</button>
      <div v-for="member in familyMembers" :key="member.id" class="family-member">
        <p>姓名: {{ member.name }}</p>
        <p>年龄: {{ member.age }}</p>
        <p>性别: {{ member.sex }}</p>
        <p>身份证号: {{ member.id }}</p>
      </div>
    </div>

    <!-- 添加家庭成员的弹窗 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>添加家庭成员</h2>
        <input type="text" v-model="newMember.name" placeholder="姓名" required />
        <input type="text" v-model="newMember.id" placeholder="身份证号" required />
        <input type="number" v-model="newMember.age" placeholder="年龄" required />
        <select v-model="newMember.sex" placeholder="性别" required>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
        <button @click="submitFamilyMember">添加</button>
      </div>
    </div>

    <!-- 实名认证的弹窗 -->
    <div v-if="showRealNameModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeRealNameModal">&times;</span>
        <h2>实名认证</h2>
        <input type="text" v-model="authInfo.name" placeholder="姓名" required />
        <input type="text" v-model="authInfo.id" placeholder="身份证号" required />
        <input type="number" v-model="authInfo.age" placeholder="年龄" required />
        <select v-model="authInfo.sex" placeholder="性别" required>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
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
        id: '',
        age: null, // 将年龄初始化为null，方便后续类型判断和验证
        sex: ''
      },
      isRealNameVerified: false,
      realNameInfo: null,
      showRealNameModal: false,
      authInfo: {
        name: '',
        id: '',
        age: null, // 将年龄初始化为null，方便后续类型判断和验证
        sex: ''
      }
    };
  },

  computed: {
    // 计算属性，根据实名认证状态禁用按钮
    canVerify() {
      return !this.isRealNameVerified;
    },
    userInfo() {
      return this.$store.state.userInfo;
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
      // 进行前端数据验证，确保必填项都有合理的值
      if (!this.newMember.name ||!this.newMember.id || this.newMember.age === null ||!this.newMember.sex) {
        alert('请填写完整的家庭成员信息');
        return;
      }
      axios.post('/family-members', {
        name: this.newMember.name,
        id: this.newMember.id,
        age: this.newMember.age,
        sex: this.newMember.sex
      })
          .then(response => {
            this.familyMembers.push(response.data);
            // 清空输入框的值
            this.newMember.name = '';
            this.newMember.id = '';
            this.newMember.age = null;
            this.newMember.sex = '';
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
        const realNameData = {
          name: this.authInfo.name,
          id: this.authInfo.id,
          sex: this.authInfo.sex,
          age: this.authInfo.age,
        };

        // 前端数据验证逻辑，完善年龄范围验证以及其他可能的验证逻辑
        if (realNameData.age === null || isNaN(realNameData.age) || realNameData.age < 0 || realNameData.age > 150) {
          alert('年龄需在0到150岁之间且为有效数字，请重新输入。');
          return;
        }
        if (!realNameData.name ||!realNameData.id ||!realNameData.sex) {
          alert('请填写完整的实名认证信息');
          return;
        }

        axios.post('/identifications', realNameData)
            .then(response => {
              this.realNameInfo = response.data;
              if (response.data && response.data.success) {
                this.isRealNameVerified = true;
                // 清空输入框的值
                this.authInfo.name = '';
                this.authInfo.id = '';
                this.authInfo.age = null;
                this.authInfo.sex = '';
                this.closeRealNameModal();
              } else {
                console.error('实名认证成功，但返回数据格式不符合预期:', response.data);
                alert('实名认证成功。');
              }
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
  margin-left: 20px;
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
  background-color: #3131FF;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

</style>