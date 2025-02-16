<template>
  <v-btn color="error" @click="handleDelete">
    <div class="flex gap-1">
      <v-icon icon="mdi-delete-outline" color="white" />
      <span v-if="!hideBtnTxt" class="hidden sm:inline">Eliminar</span>
    </div>
  </v-btn>
</template>

<script lang="ts" setup>
import { useSweetAlert } from "@/hooks";

defineProps<{ hideBtnTxt?: boolean }>();
const emits = defineEmits(["onConfirmDelete"]);
const { confirmation, deleted } = useSweetAlert();

const handleDelete = async () => {
  const result = await confirmation();

  if (result.isConfirmed) {
    emits("onConfirmDelete");
    deleted();
  }
};
</script>
