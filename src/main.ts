import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import App from './App.vue';
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

export const vm = new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
