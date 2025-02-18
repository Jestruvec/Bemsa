<template>
  <v-layout>
    <MainHeader @toggle-nav-drawer="showNavDrawer = !showNavDrawer" />

    <MainSidebar v-model="showNavDrawer" />

    <v-main class="pb-0">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { MainHeader, MainSidebar } from "@/components";
import { useNavDrawer } from "@/hooks";

const { showNavDrawer } = useNavDrawer();
</script>
