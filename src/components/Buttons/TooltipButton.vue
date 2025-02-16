<template>
  <v-tooltip location="top" offset="5" :text="tooltipTxt">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="cursor-pointer"
        :color="btnColor"
        @click="$emit('onClick')"
      >
        <v-icon :icon="icon" color="white" />
        <span v-if="btnTxt" class="hidden sm:inline">{{ btnTxt }}</span>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
defineEmits(["onClick"]);
defineProps<{
  tooltipTxt: string;
  icon: string;
  btnTxt?: string;
  btnColor?: "success" | "error" | "warning";
}>();
</script>
