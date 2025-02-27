<template>
  <v-menu>
    <template #activator="{ props }">
      <v-icon v-bind="props" icon="mdi-account" />
    </template>

    <v-card>
      <v-list>
        <v-list-item title="Conectado como" :subtitle="user.email" />

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
import { useAuth } from "@/composables";

interface UserMenuItem {
  id: string;
  description: string;
  icon: string;
  fn: () => void;
}

const router = useRouter();
const { logout, user } = useAuth();

const userMenuItems = ref<UserMenuItem[]>([
  {
    id: crypto.randomUUID(),
    description: "Configuracion de la cuenta",
    icon: "mdi-cog",
    fn: () => router.push("/settings"),
  },
  {
    id: crypto.randomUUID(),
    description: "Cerrar sesión",
    icon: "mdi-logout",
    fn: async () => {
      await logout();
      router.push("/login");
    },
  },
]);
</script>
