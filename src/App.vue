<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();

    return {
      route
    };
  }
});
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

/* 保持原有的样式不变 */
</style>