<template>
  <div class="container left-panel-active" id="loginComponent">
    <!-- 登录 -->

    <div class="container__form container--signin">
      <form @submit.prevent="handleLogin" class="form" id="form2">
        <h2 class="form__title">登录账号</h2>
        <input v-model="login.accountName" type="text" placeholder="用户名/手机号" class="input" />
        <input v-model="login.passWord" type="password" placeholder="密码" class="input" />
        <a class="link" id="forgetPassword" @click="goToResetPassword">忘记密码?</a>
        <button @click="togglePanel('login')" class="btn" id="login">登 录</button>
      </form>
    </div>

    <!-- 覆盖层 -->
    <div class="container__overlay">
      <div class="overlay">
        <div class="overlay__panel overlay--right">
          <button  class="btn" id="signIn" @click="goToRegister">注册账号</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'loginComponent',
  setup() {
    const router = useRouter();

    function navigate(event) {
      event.preventDefault();
      const path = event.target.getAttribute('to');
      router.push(path);
    }

    return {
      navigate
    };
  },
  data() {
    return {
      isSignUpActive: false,
      signup: {
        phoneNumber: '',
        passWord: '',
        verificationCode: ''
      },
      login: {
        accountName: '',
        passWord: ''
      }
    };
  },
  methods: {
    togglePanel(panel) {
      this.isSignUpActive = panel === 'register';
    },

    // 处理登录逻辑，使用axios发送POST请求
    handleLogin() {
    
      const { accountName, passWord } = this.login;
      if (accountName && passWord) {
        // 判断输入的是否为手机号格式，这里简单以是否纯数字且长度合适来判断，实际可能需更严谨验证
        const isPhoneNumber = /^\d{11}$/.test(accountName);
        let loginUrl = isPhoneNumber? '/users/login/phone' : '/users/login/account';
        const loginData = isPhoneNumber? { phoneNumber: accountName, passWord: passWord } : { accountName: accountName, passWord: passWord };
        axios.post(loginUrl, loginData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (response.status >= 200 && response.status < 300) {
                console.log(response.data); 
                this.$store.commit("setUserInfo", response.data);
                alert('登录成功！');
                this.$router.push('/homeComponent') ;
              } else {
                throw new Error('登录失败');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('登录失败，请检查您的信息或网络连接。');
            });
      } else {
        alert('请填写所有必填项！');
      }
    },

    requestVerificationCode() {
      const { phoneNumber } = this.signup;
      if (phoneNumber) {
        axios.post('https://your-backend-api-url/send-verification-code', {
          phoneNumber: phoneNumber
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
            .then(response => {
              if (response.data.success) {
                alert('验证码已发送，请查收！');
              } else {
                alert('发送验证码失败，请稍后再试。');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('网络错误，请检查您的连接。');
            });
      } else {
        alert('请输入手机号码！');
      }
    },

    goToResetPassword() {
      window.location.href = "/resetPassWord";
    },

    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style>
/* 保持原有的样式不变 */
:root {
  /* COLORS */
  --white: #F5F7FF;
  --gray: #333;
  --blue: #3161FF;
  --lightblue: #3161F2;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 700px;
  --max-height: 373px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
template {
  align-items: center;
  background-color: var(--white);
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: var(--blue);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline; /* 鼠标悬停时添加下划线 */
}

.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  /*让容器居中*/
  margin: auto auto;
  /*让容器垂直居中*/
  top: 50%;
  transform: translateY(60%);
  width: 100%;
}

.container__form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: var(--lightblue);
  background: url("http://localhost:63342/hosptial-vue/vue/public/images/background1.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: var(--blue);
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.form>.btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
  border-radius: var(--button-radius);
}
.get-verification-code {
  color: var(--blue); /* 蓝色文字 */
  cursor: pointer; /* 鼠标指针变为手型 */
  margin-left: 0.5rem; /* 左边距 */
}
.get-verification-code:hover {
  text-decoration: underline; /* 鼠标悬停时添加下划线 */
}

@keyframes show {

  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

</style>