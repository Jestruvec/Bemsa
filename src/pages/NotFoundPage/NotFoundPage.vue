<script setup lang="ts">
import { MainLayout } from "@/components";
import { cheems } from "@/assets/images";
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-2 justify-center items-center h-full">
      <div>
        <v-img :src="cheems" alt="not_found_page_img" cover />
        <span>Pagina no encontrada</span>
      </div>
    </div>
  </MainLayout>
</template>
