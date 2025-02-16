<template>
  <v-btn @click="$emit('onClick')">
    <div class="flex gap-1">
      <v-icon :icon="icon" color="white" />
      <span class="hidden sm:inline">{{ text }}</span>
    </div>
  </v-btn>
</template>

<script lang="ts" setup>
import { computed } from "vue";

defineEmits(["onClick"]);
const props = defineProps<{ prev?: boolean }>();

const icon = computed(() =>
  props.prev ? "mdi-chevron-left" : "mdi-chevron-right"
);
const text = computed(() => (props.prev ? "Anterior" : "Siguiente"));
</script>
