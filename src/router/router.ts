import { createWebHistory, createRouter } from "vue-router";
import * as Pages from "../pages";
import { MainLayout } from "../components";
import { useAuth } from "@/composables"; // Asegúrate de tener el hook de autenticación

const routes = [
  { path: "/login", component: Pages.Login },
  {
    path: "/",
    component: MainLayout,
    redirect: "/home",
    children: [
      { path: "home", component: Pages.Home },
      { path: "settings", component: Pages.Settings },
      {
        path: "administration",
        redirect: "administration/users",
        children: [
          { path: "users", component: Pages.Users },
          { path: "txt", component: Pages.Txt },
          { path: "roles", component: Pages.Roles },
        ],
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: Pages.NotFound }, // La ruta NotFound debe estar fuera de children
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Agregar guard de navegación
router.beforeEach((to, _from, next) => {
  const { user } = useAuth(); // Usar el hook de autenticación para acceder al estado del usuario

  // Verificar si la ruta es pública (login y NotFound)
  if (to.path === "/login" || to.path === "/:pathMatch(.*)*") {
    return next(); // Las rutas públicas no necesitan autenticación
  }

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (!user.value) {
    return next("/login"); // Redirigir a login si no está autenticado
  }

  // Si todo está bien, continuar con la navegación
  next();
});

export default router;
