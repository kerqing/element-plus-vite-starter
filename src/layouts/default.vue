<template>
  <div class="layout layout-default">
    <van-sticky>
      <van-nav-bar title="标题" />
    </van-sticky>
    <main class="layout-default-main">
      <router-view></router-view>
    </main>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/setting" icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
const active = ref(0);
</script>
