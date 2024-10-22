import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.js";
import { defineRule, validate } from "vee-validate";
const app = createApp(App);

defineRule("required", (value) => {
  if (!value || !value.length) {
    return "This field is required";
  }
  return true;
});
defineRule("minMax", (value, [min, max]) => {
  if (!value || !value.length) {
    return true;
  }
  const numericValue = Number(value.length);
  const minValue = Number(min);
  if (numericValue < minValue) {
    return `This field must be greater than ${min}`;
  }
  if (numericValue > max) {
    return `This field must be less than ${max}`;
  }
  return true;
});

defineRule("requiredYear", (value) => {
  if (!value || value.length) {
    return "This field is required";
  }
  return true;
});

app.use(router);
app.component("VueDatePicker", VueDatePicker);
app.use(bootstrap);
app.mount("#app");
