import Vue from "vue";
import store from "./store/store";
import App from "./App.vue";

import "./assets/main.css";

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
