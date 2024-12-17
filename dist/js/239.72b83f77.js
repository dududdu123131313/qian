"use strict";(self["webpackChunklogin_vue"]=self["webpackChunklogin_vue"]||[]).push([[239],{6239:function(e,o,t){t.r(o),t.d(o,{default:function(){return f}});var n=t(6768),s=t(5130);const r={class:"container left-panel-active",id:"loginComponent"},a={class:"container__form container--signin"},i={class:"container__overlay"},l={class:"overlay"},c={class:"overlay__panel overlay--right"};function u(e,o,t,u,p,d){return(0,n.uX)(),(0,n.CE)("div",r,[(0,n.Lk)("div",a,[(0,n.Lk)("form",{onSubmit:o[4]||(o[4]=(0,s.D$)(((...e)=>d.handleLogin&&d.handleLogin(...e)),["prevent"])),class:"form",id:"form2"},[o[6]||(o[6]=(0,n.Lk)("h2",{class:"form__title"},"登录账号",-1)),(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":o[0]||(o[0]=e=>p.login.accountName=e),type:"text",placeholder:"用户名/手机号",class:"input"},null,512),[[s.Jo,p.login.accountName]]),(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":o[1]||(o[1]=e=>p.login.passWord=e),type:"password",placeholder:"密码",class:"input"},null,512),[[s.Jo,p.login.passWord]]),(0,n.Lk)("a",{class:"link",id:"forgetPassword",onClick:o[2]||(o[2]=(...e)=>d.goToResetPassword&&d.goToResetPassword(...e))},"忘记密码?"),(0,n.Lk)("button",{onClick:o[3]||(o[3]=e=>d.togglePanel("login")),class:"btn",id:"login"},"登 录")],32)]),(0,n.Lk)("div",i,[(0,n.Lk)("div",l,[(0,n.Lk)("div",c,[(0,n.Lk)("button",{class:"btn",id:"signIn",onClick:o[5]||(o[5]=(...e)=>d.goToRegister&&d.goToRegister(...e))},"注册账号")])])])])}t(4114);var p=t(1387),d=t(4373),g={name:"loginComponent",setup(){const e=(0,p.rd)();function o(o){o.preventDefault();const t=o.target.getAttribute("to");e.push(t)}return{navigate:o}},data(){return{isSignUpActive:!1,signup:{phoneNumber:"",passWord:"",verificationCode:""},login:{accountName:"",passWord:""}}},methods:{togglePanel(e){this.isSignUpActive="register"===e},handleLogin(){const{accountName:e,passWord:o}=this.login;if(e&&o){const t=/^\d{11}$/.test(e);let n=t?"/users/login/phone":"/users/login/account";const s=t?{phoneNumber:e,passWord:o}:{accountName:e,passWord:o};d.A.post(n,s,{headers:{"Content-Type":"application/json"}}).then((e=>{if(!(e.status>=200&&e.status<300))throw new Error("登录失败");console.log(e.data),this.$store.commit("setUserInfo",e.data),alert("登录成功！"),this.$router.push("/homeComponent")})).catch((e=>{console.error("Error:",e),alert("登录失败，请检查您的信息或网络连接。")}))}else alert("请填写所有必填项！")},requestVerificationCode(){const{phoneNumber:e}=this.signup;e?d.A.post("https://your-backend-api-url/send-verification-code",{phoneNumber:e},{headers:{"Content-Type":"application/json"}}).then((e=>{e.data.success?alert("验证码已发送，请查收！"):alert("发送验证码失败，请稍后再试。")})).catch((e=>{console.error("Error:",e),alert("网络错误，请检查您的连接。")})):alert("请输入手机号码！")},goToResetPassword(){window.location.href="/resetPassWord"},goToRegister(){this.$router.push("/register")}}},h=t(1241);const m=(0,h.A)(g,[["render",u]]);var f=m}}]);
//# sourceMappingURL=239.72b83f77.js.map