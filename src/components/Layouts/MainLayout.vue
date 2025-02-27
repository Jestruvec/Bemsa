<template>
  <v-layout>
    <MainHeader @toggle-nav-drawer="toggleNavDrawer" />

    <MainSidebar v-model="showNavDrawer" />

    <v-main class="pb-0">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { MainHeader, MainSidebar } from "@/components";
import { useNavDrawer } from "@/composables";

const { showNavDrawer, toggleNavDrawer } = useNavDrawer();
</script>
