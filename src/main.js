import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.use(Toast, {
    position: 'top-right',
    timeout: 2500,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
});

app.mount("#app");
