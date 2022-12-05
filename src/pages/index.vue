<template>
  <van-sticky>
    <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
  </van-sticky>
  <van-pull-refresh
    ref="refreshRef"
    v-model="refreshing"
    @refresh="onRefresh"
    pulling-text="下拉刷新"
    loosing-text="释放刷新"
    loading-text="下拉加载中..."
    success-text="刷新成功"
  >
    <van-list
      ref="listRef"
      v-model:loading="loading"
      :finished="finished"
      loading-text="列表加载中..."
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </van-pull-refresh>
  <van-back-top />
  
</template>

<script setup lang="ts">
const value = ref("")
const list = ref<any[]>([]);
const loading = ref(false);
const finished = ref(false);

const getData = () : Promise<any[]>=> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const arr = []
      for (let i = 0; i < 10; i++) {
        arr.push(list.value.length + 1);
      }
      resolve(arr)
    }, 1000)
  })
}

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  getData().then((res) => {
    list.value.push(...res)
    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  })
};

const refreshing = ref(false);
const onRefresh = () => {
  list.value = [];
  finished.value = false;
  loading.value = true;
  setTimeout(() => {
    refreshing.value = false;
    onLoad();
  }, 1000);
};

const onSearch = () => {
  onRefresh()
}
</script>

<route lang="yaml">
meta:
  layout: default
</route>
