// jshint esversion:6

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Axios
import axios from "axios";
import VueAxios from "vue-axios";

// Vue SweetAlert2
import VueSweetalert2 from "vue-sweetalert2";
// To style sweetalert2, scss files
import "sweetalert2/dist/sweetalert2.min.css";
// SweetAlert2 customize options
const options = {
  confirmButtonColor: "#ea4150",
  icon: "info"
};

// BootstrapVue & IconPlugin
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// css code for bootstrap & bootstrap-vue
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// main.scss MAIN styles
import "./scss/main.scss";

// BootstrapVue & Icon Plugin Activations
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, axios);
Vue.use(VueSweetalert2, options);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
