<template>
  <v-text-field
    v-model="searchQuery"
    label="Buscar"
    clearable
    variant="outlined"
    prepend-inner-icon="mdi-magnify"
    @update:model-value="$emit('update', searchQuery)"
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineEmits(["update"]);

const searchQuery = ref("");
</script>
