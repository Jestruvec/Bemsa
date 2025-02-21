<template>
  <div class="pa-4">
    <UserModal
      ref="userModal"
      v-model="showModal"
      :user-for-edition="userForEdition"
      @update:model-value="closeModal"
      @on-submit="closeModal"
    />

    <div class="mb-4">
      <NewRegisterButton @on-click="showModal = true" />
    </div>

    <UsersTable @on-row-click="openModalForEdition" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UsersTable, UserModal, NewRegisterButton } from "../../components";

const userModal = ref();
const userForEdition = ref();
const showModal = ref(false);

const openModalForEdition = (user: any) => {
  userForEdition.value = user;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  userForEdition.value = undefined;
  userModal.value.resetForm();
};
</script>
