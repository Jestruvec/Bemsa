<template>
  <v-app>
    <RouterView />
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {
  console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("Supabase Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);
});
</script>
