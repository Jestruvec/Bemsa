<template>
  <div class="h-full pa-4">
    <RoleModal v-model="showModal" @role-created="showModal = false" />

    <div class="mb-4">
      <NewRegisterButton @on-click="showModal = true" />
    </div>

    <RolesTable @on-row-click="openModalForEdition" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RolesTable, RoleModal, NewRegisterButton } from "../../components";

const roleForEdition = ref();
const showModal = ref(false);

const openModalForEdition = (role: any) => {
  roleForEdition.value = role;
  showModal.value = true;
};
</script>
