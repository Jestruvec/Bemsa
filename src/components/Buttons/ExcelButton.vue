<template>
  <v-tooltip location="top" offset="5" text="Nuevo registro">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="success"
        class="cursor-pointer"
        @click="$emit('onClick')"
      >
        <div class="flex gap-1">
          <v-icon icon="mdi-microsoft-excel" color="white" />
          <span class="hidden sm:inline">Exportar a Excel</span>
        </div>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
defineEmits(["onClick"]);
</script>
