import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
const app = createApp(App);

app.use(router);
app.component("VueDatePicker", VueDatePicker);
app.use(bootstrap);

app.mount("#app");
