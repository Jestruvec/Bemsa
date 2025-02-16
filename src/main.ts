import { createApp } from "vue";
import "./assets/styles/main.css";
import App from "./App.vue";
import router from "./router/router";
//plugins
import { Toast, options, vuetify, vueSweetAlert } from "./plugins";

const app = createApp(App);

app.use(vuetify);
app.use(vueSweetAlert);
app.use(Toast, options);

app.use(router);
app.mount("#app");
