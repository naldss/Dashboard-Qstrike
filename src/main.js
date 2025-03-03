import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "uikit/dist/css/uikit.min.css";
import "uikit/dist/js/uikit.min.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);

// Debounce ResizeObserver workaround
const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

const originalResizeObserver = window.ResizeObserver;
window.ResizeObserver = class DebouncedResizeObserver extends originalResizeObserver {
    constructor(callback) {
        super(debounce(callback, 100)); // 100ms debounce
    }
};

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.use(Toast, {
    position: 'top-right',
    timeout: 2000,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false
});

app.mount("#app");
