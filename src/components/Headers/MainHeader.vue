<template>
  <v-app-bar>
    <template #prepend>
      <div class="w-[55px] flex justify-center">
        <v-icon icon="mdi-menu" @click="$emit('toggleNavDrawer')" />
      </div>
    </template>

    <template #title>
      <RouterLink to="/">
        <h1>PLATFORM_NAME</h1>
      </RouterLink>
    </template>

    <template #append>
      <div class="flex gap-4">
        <v-icon icon="mdi-theme-light-dark" @click="toggleTheme" />
        <UserMenu />
      </div>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { UserMenu } from "../";
import { vuetify } from "../../plugins/vuetify";

defineEmits(["toggleNavDrawer"]);

// Función para cambiar el tema
const toggleTheme = () => {
  const theme = vuetify.theme; // Obtiene el tema actual
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>
