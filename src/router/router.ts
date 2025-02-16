import { createWebHistory, createRouter } from "vue-router";
import * as Pages from "../pages";
import { MainLayout } from "../components";

const routes = [
  { path: "/login", component: Pages.Login },
  {
    path: "/",
    redirect: "/home",
    component: MainLayout,
    children: [
      { path: "/home", component: Pages.Home },
      { path: "/settings", component: Pages.Settings },
      {
        path: "/administration",
        redirect: "/administration/users",
        children: [
          {
            path: "/administration/users",
            component: Pages.Users,
          },
          {
            path: "/administration/roles",
            component: Pages.Roles,
          },
          {
            path: "/administration/txt",
            component: Pages.Txt,
          },
        ],
      },
      { path: "/:pathMatch(.*)*", component: Pages.NotFound }, // Para manejar 404
    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // Usa WebHistory para navegación en el navegador
  routes,
});

export default router;
