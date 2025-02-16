<template>
  <v-tooltip location="top" offset="5" text="Nuevo registro">
    <template #activator="{ props }">
      <v-btn v-bind="props" class="cursor-pointer" @click="$emit('onClick')">
        <div class="flex gap-1">
          <v-icon icon="mdi-plus" color="white" />
          <span class="hidden sm:inline">Nuevo registro</span>
        </div>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
defineEmits(["onClick"]);
</script>
