import Toast, { type PluginOptions, POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // You can set your default options here
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

export { Toast, options };
