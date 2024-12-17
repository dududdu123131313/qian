<!-- RegistrationComponent.vue -->
<template>
  <div class="container">
    <h1 class="title">预约挂号</h1>
        <div class="selection-container">
      <!-- 选择科室 -->
      <div class="selection-row">
        <span>选择科室：</span>
        <button v-for="department in departments" :key="department" @click="selectDepartment(department)">
          {{ department }}
        </button>
        <input type="text" v-model="selectedDepartment" class="selection-input" />
      </div>
      <!-- 选择类型 -->
      <div class="selection-row">
        <span>选择类型：</span>
        <button v-for="type in types" :key="type" @click="selectType(type)">
          {{ type }}
        </button>
        <input type="text" v-model="selectedType" class="selection-input" />
      </div>
      <!-- 选择日期 -->
      <div class="selection-row">
        <span>选择日期：</span>
        <button v-for="date in dates" :key="date" @click="selectDate(date)">
          {{ date }}
        </button>
        <input type="text" v-model="selectedDate" class="selection-input" />
      </div>
    <!-- 查询按钮 -->
    <button class="query-button" @click="handleQuery" >查询</button>
    </div>

  

    <!-- 结果容器 -->
    <div class="results-container">
      <div class="results" v-if="doctors.length">
        <doctor-info
          v-for="doctor in doctors"
          :key="doctor.id"
          :doctor="doctor"
        ></doctor-info>
      </div>
      <div class="no-results" v-else>
        <p>没有找到相关数据。</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DoctorInfo from './DoctorInfo.vue';

export default {
  components: {
    DoctorInfo
  },
  data() {
    return {
      departments: ['康复科', '普外科', '中医科', '眼科', '口腔科', '皮肤科', '骨科', '风湿免疫科', '肿瘤科', '心内科', '传染科', '妇产科', '呼吸内科',
        '儿科', '血液科', '泌尿外科', '耳鼻喉科', '神经内科', '急诊科', '内分泌科'],
      types: ['专家门诊', '普通门诊'],
      selectedDepartment: '',
      selectedType: '',
      selectedDate: '',
      dates: [],
      doctors: [],
      showResults: false,

    };
  },
  created() {
    this.dates = this.generateDates(5);
  },
  methods: {
    selectDepartment(department) {
      this.selectedDepartment = department;
    },
    selectType(type) {
      this.selectedType = type;
    },
    selectDate(date) {
      this.selectedDate = date;
    },
    handleQuery() {
      const encodedDepartment = encodeURIComponent(this.selectedDepartment);
      const encodedType = encodeURIComponent(this.selectedType);
      const encodedDate = encodeURIComponent(this.selectedDate);

      // 验证日期格式是否正确
      if (this.selectedDate && !/^\d{4}-\d{2}-\d{2}$/.test(this.selectedDate)) {
        alert('请输入正确的日期格式（例如：YYYY-MM-DD）');
        return;
      }


      const queryUrl = `/doctors/query?department=${encodedDepartment}&outpatientType=${encodedType}&visitTime=${encodedDate}`;
      axios.get(queryUrl)
          .then(response => {
            this.doctors = response.data;
            this.showResults = true;
          })
          .catch(error => {
            console.error('Error fetching doctor info:', error);
            if (error.response) {
              alert('查询失败，请稍后重试。错误信息：' + error.response.data);
            } else {
              alert('网络连接异常，请检查网络后重试。');
            }
          });
    },


    generateDates(days) {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < days; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        const year = nextDay.getFullYear();
        const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
        const day = nextDay.getDate().toString().padStart(2, '0');
        dates.push(`${year}-${month}-${day}`);
      }
      return dates;
    }
  }

};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  margin-left:20px;
  height: 100%; 
  width: 100%;
  box-sizing: border-box; 
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

.selection-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  margin-bottom: 20px;
  background-color: white;
}

.selection-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap; /* 允许子元素换行 */
}

.selection-row button {
  padding: 8px 16px; /* 按钮内边距 */
  margin: 4px; /* 按钮外边距 */
  border: 1px solid #ccc; /* 按钮边框 */
  border-radius: 4px; /* 按钮圆角 */
  background-color: #f8f8f8; /* 按钮背景颜色 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  flex: 1 1 auto; /* 允许按钮占据可用空间 */
  min-width: 80px; /* 按钮的最小宽度 */
  text-align: center; /* 文本居中 */
}

.selection-input {
  margin-left: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 4px;
  width: 200px;
  margin-left: auto;
}

.query-button {
  padding: 10px 20px;
  border: none;
  background-color: #3161FF;
  color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px; /* 添加上边距 */
  display: block; /* 使按钮表现为块级元素 */
  margin-left: auto; /* 右边距自动 */
  margin-right: auto; /* 左边距自动 */
  width: fit-content; /* 宽度适应内容 */
}

.query-button:hover {
  background-color: #304add;
}


.results-container {
  width: 90%;
  height: 100%;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.results {
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start; /* 水平排列，从左到右 */
  gap: 20px;
}

.doctor-info {
  flex: 1 1 300px;
  margin: 10px;
  border: 0;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
}

.no-results {
  color: #999;
  text-align: center;
  height: 100%;
  width: 100%;
}
</style>