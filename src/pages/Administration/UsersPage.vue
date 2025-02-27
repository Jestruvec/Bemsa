<template>
  <div class="pa-4">
    <UserModal
      ref="userModal"
      v-model="showModal"
      :user-for-edition="userForEdition"
      @update:model-value="closeModal"
      @on-submit="updateData"
    />

    <template v-if="error">
      <span>{{ `Ha ocurrido un error: ${error}` }}</span>
    </template>

    <template v-if="loading">
      <v-skeleton-loader type="list-item" />
      <v-skeleton-loader type="table" />
    </template>

    <template v-else>
      <div class="flex gap-1 sm:gap-2 w-100 mb-4">
        <NewRegisterButton @on-click="showModal = true" />

        <div class="sm:w-40 bg-surface">
          <SearchBar
            @update="(searchQuery: string) => searchInput = searchQuery"
          />
        </div>
      </div>

      <UsersTable
        :data="users"
        :search="searchInput"
        @on-row-click="openModalForEdition"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  UsersTable,
  UserModal,
  NewRegisterButton,
  SearchBar,
} from "@/components";
import { useUserProfilesCrud } from "@/composables";

const {
  loading,
  error,
  data: users,
  fetchUserProfiles,
} = useUserProfilesCrud();

const userModal = ref();
const userForEdition = ref();
const showModal = ref(false);
const searchInput = ref("");

const openModalForEdition = (user: any) => {
  userForEdition.value = user;
  showModal.value = true;
};

const updateData = async () => {
  closeModal();
  await fetchUserProfiles();
};

const closeModal = () => {
  showModal.value = false;
  userForEdition.value = undefined;
  userModal.value.resetForm();
};

onMounted(() => {
  fetchUserProfiles();
});
</script>
