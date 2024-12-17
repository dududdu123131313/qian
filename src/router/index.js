// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// 懒加载组件
const HomeNavigation = () => import('../components/HomeNavigation.vue');
const HomeComponent = () => import('../components/HomeComponent.vue');
const RegistrationComponent = () => import('../components/RegistrationComponent.vue');
const MyRegistrationsComponent = () => import('../components/MyRegistrationsComponent.vue');
const MyBillsComponent = () => import('../components/MyBillsComponent.vue');
const MessagesComponent = () => import('../components/MessagesComponent.vue');
const ProfileComponent = () => import('../components/ProfileComponent.vue');
const LoginComponent =()=> import('../components/LoginComponent.vue');
const RegisterComponent = () => import('../components/RegisterComponent.vue');
const routes = [
  
  {
    path: '/Navigation',
    name: 'hoNavigationme',
    component: HomeNavigation,
    children: [
      {
        path: '/homeComponent',
        name: 'homeComponent',
        component: HomeComponent
      },
      {
        path: '/registration',
        name: 'registration',
        component: RegistrationComponent
      },
      {
        path: '/my-registrations',
        name: 'myRegistrations',
        component: MyRegistrationsComponent
      },
      {
        path: '/my-bills',
        name: 'myBills',
        component: MyBillsComponent
      },
      {
        path: '/my-messages',
        name: 'messages',
        component: MessagesComponent
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfileComponent
      },

    ]
  },

  {
    path: '/',
    name: 'login',
    component: LoginComponent,
  },
    {
    path: '/register',
    name:'register',
    component: RegisterComponent,
      }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;