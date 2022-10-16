<template>
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

  <!-- back to top button -->
  <transition name="van-fade">
    <van-button
      v-show="y > 0"
      ref="root"
      class="back-top"
      type="primary"
      icon="arrow-up"
      @click="onBackTop"
    >
    </van-button>
  </transition>
</template>

<script setup lang="ts">
import { useScrollParent, useEventListener } from "@vant/use";
const list = ref<number[]>([]);
const loading = ref(false);
const finished = ref(false);
const count = ref(0);
const onLoad = () => {
  console.log("onLoad: count", count.value);
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;
    // 加载计数
    count.value++;

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
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

const root = ref();
const scrollParent = useScrollParent(root);
const { x, y, isScrolling, arrivedState, directions } = useScroll(scrollParent);
useEventListener("scroll", () => {}, { target: scrollParent });
const onBackTop = () => {
  y.value = 0;
};
</script>

<style>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 100px;
  z-index: 9999;
}

.btn {
  width: 10rem;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
