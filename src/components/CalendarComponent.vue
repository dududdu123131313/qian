<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="weekdays">
      <div v-for="day in weekdays" :key="day">{{ day }}</div>
    </div>
    <div class="days">
      <div v-for="day in days" :key="day.id"
           :class="{ 'other-month': day.otherMonth, 'today': day.isToday }"
           @click="selectDate(day.date)">
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      days: []
    };
  },
  computed: {
    currentMonthName() {
      return this.weekdays[new Date(this.currentYear, this.currentMonth, 1).getDay()];
    }
  },
  created() {
    this.generateDays();
  },
  methods: {
    generateDays() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
      const startDay = firstDay.getDay();
      const numberOfDays = lastDay.getDate();

      const days = [];
      // 先处理上个月补充的日期
      for (let i = 0; i < startDay; i++) {
        const prevMonthDate = new Date(this.currentYear, this.currentMonth, 1 - startDay + i);
        days.push({
          id: days.length,
          date: prevMonthDate.getDate(),
          otherMonth: true,
          weekday: (prevMonthDate.getDay() + 7) % 7 // 确保星期范围在0-6
        });
      }
      // 处理本月的日期
      for (let i = 1; i <= numberOfDays; i++) {
        const currentDate = new Date(this.currentYear, this.currentMonth, i);
        days.push({
          id: days.length,
          date: i,
          otherMonth: false,
          isToday: i === new Date().getDate() && this.currentMonth === new Date().getMonth() && this.currentYear === new Date().getFullYear(),
          weekday: currentDate.getDay()
        });
      }

      this.days = days;
    },
    nextMonth() {
      if (this.currentMonth < 11) {
        this.currentMonth++;
      } else {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.generateDays();
    },
    prevMonth() {
      if (this.currentMonth > 0) {
        this.currentMonth--;
      } else {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.generateDays();
    },
    selectDate(date) {
      alert(`Selected date: ${date}`);
    }
  }
};
</script>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.weekdays {
  display: flex;
  margin-bottom: 5px;
}

.weekdays div,.days div {
  width: 14.28%;
  text-align: center;
  padding: 5px;
}

.days {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start; /* 修改此处，让子元素均匀分布，避免最后一行元素宽度异常 */
}

.days div {
  width: 42.857px;
  height: auto;
  flex: 0 0 42.857px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 50%;
  cursor: pointer;
  box-sizing: border-box; /* 确保边框和内边距不影响元素宽度 */
}

.days div:hover {
  background-color: #f0f0f0;
}

.other-month {
  color: #ccc;
}

.today {
  color: #fff;
  background-color: #3498db;
}
</style>