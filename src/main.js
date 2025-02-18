import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// UIkit
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";

// Vue Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(Toast);

app.mount("#app");
