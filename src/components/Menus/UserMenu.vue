<template>
  <v-menu>
    <template #activator="{ props }">
      <v-icon v-bind="props" icon="mdi-account" />
    </template>

    <v-card>
      <v-list>
        <v-list-item title="Conectado como" subtitle="Administrador" />

        <v-list-item
          v-for="item in userMenuItems"
          :key="item.id"
          :title="item.description"
          :prepend-icon="item.icon"
          @click="item.fn"
        />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

interface UserMenuItem {
  id: string;
  description: string;
  icon: string;
  fn: () => void;
}

const router = useRouter();

const userMenuItems = ref<UserMenuItem[]>([
  {
    id: new Date().toString().randomUUID(),
    description: "Configuracion de la cuenta",
    icon: "mdi-cog",
    fn: () => router.push("/settings"),
  },
  {
    id: new Date().toString().randomUUID(),
    description: "Cerrar sesion",
    icon: "mdi-logout",
    fn: () => logout(),
  },
]);

const logout = () => {
  console.log("cerrar sesion");
  router.push("/login");
};
</script>
