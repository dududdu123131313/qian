<!-- BillList.vue -->
<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>创建时间</th>
            <th>订单编号</th>
            <th>支付金额</th>
            <th>类型</th>
            <th>科室</th>
            <th>手机号</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.orderNumber">
            <td>{{ bill.creationTime }}</td>
            <td>{{ bill.orderNumber }}</td>
            <td>¥{{ bill.paymentAmount }}</td>
            <td>{{ bill.type }}</td>
            <td>{{ bill.department }}</td>
            <td>{{ bill.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        bills: []
      };
    },
    created() {
      this.fetchBills();
    },
    methods: {
      async fetchBills() {
        try {
          const response = await axios.get('/api/bills');
          this.bills = response.data;
        } catch (error) {
          console.error('Error fetching bills:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  </style>