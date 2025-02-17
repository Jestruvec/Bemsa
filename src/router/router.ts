import { createWebHistory, createRouter } from "vue-router";
import * as Pages from "../pages";
import { MainLayout } from "../components";

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
          { path: "roles", component: Pages.Roles },
          { path: "txt", component: Pages.Txt },
        ],
      },
      { path: "/:pathMatch(.*)*", component: Pages.NotFound },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usar BASE_URL de Vite
  routes,
});

export default router;
