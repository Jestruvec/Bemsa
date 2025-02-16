<template>
  <v-layout>
    <MainHeader @toggle-nav-drawer="showNavDrawer = !showNavDrawer" />

    <MainSidebar v-model="showNavDrawer" />

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { MainHeader, MainSidebar } from "../";

const showNavDrawer = ref(true);
</script>
