<template>
  <van-sticky>
    <van-nav-bar title="标题" />
    <van-search v-model="value" placeholder="请输入搜索关键词" />
  </van-sticky>
  <router-view></router-view>
  <van-tabbar v-model="active" route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/setting" icon="setting-o">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
const active = ref(0);
const value = ref("");
</script>
