<template>
  <v-btn color="success" @click="$emit('onClick')">
    <div class="flex gap-1">
      <v-icon class="block sm:hidden" icon="mdi-check" color="white" />
      <span class="hidden sm:inline">Guardar</span>
    </div>
  </v-btn>
</template>

<script lang="ts" setup>
defineEmits(["onClick"]);
</script>
