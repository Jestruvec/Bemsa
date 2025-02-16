// import 'vuetify/styles'
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
// import colors from "vuetify/util/colors";

export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VNavigationDrawer: {
      color: "surface",
    },
    VBtn: {
      color: "primary",
    },
    VChip: {
      density: "compact",
    },
    VIcon: {
      color: "primary",
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
    },
    VFileInput: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VTextarea: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VSelect: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
    },
    VCombobox: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VAutocomplete: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
    },
    VRadio: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VSwitch: {
      density: "compact",
      variant: "outlined",
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VSlider: {
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VRangeSlider: {
      hideDetails: "auto",
      baseColor: "primary",
      color: "primary",
    },
    VCheckbox: {
      hideDetails: "auto",
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#1976D2", // Azul intenso
          secondary: "#424242", // Gris oscuro
          accent: "#FF4081", // Rosa brillante
          error: "#D32F2F", // Rojo fuerte
          warning: "#FFA000", // Ámbar oscuro
          info: "#0288D1", // Azul cielo
          success: "#388E3C", // Verde oscuro
          background: "#F5F5F5", // Fondo claro
          surface: "#FFFFFF", // Superficie blanca
        },
      },
      dark: {
        colors: {
          primary: "#90CAF9", // Azul claro
          secondary: "#BDBDBD", // Gris medio
          accent: "#F50057", // Rosa vibrante
          error: "#FF5252", // Rojo suave
          warning: "#FFC107", // Amarillo dorado
          info: "#29B6F6", // Azul celeste
          success: "#66BB6A", // Verde claro
          background: "#121212", // Fondo negro
          surface: "#1E1E1E", // Superficie oscura
        },
      },
    },
  },
});
