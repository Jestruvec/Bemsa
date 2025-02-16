<template>
  <div class="pa-4">
    <UserModal v-model="showModal" @user-created="showModal = false" />

    <div class="mb-4">
      <NewRegisterButton @on-click="showModal = true" />
    </div>

    <UsersTable @on-row-click="openModalForEdition" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UsersTable, UserModal, NewRegisterButton } from "../../components";

const userForEdition = ref();
const showModal = ref(false);

const openModalForEdition = (user: any) => {
  userForEdition.value = user;
  showModal.value = true;
};
</script>
