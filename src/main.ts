import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import "vant/es/toast/style";
import "amfe-flexible";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const app = createApp(App);
app.use(router);
app.mount("#app");
