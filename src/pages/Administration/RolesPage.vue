<template>
  <div class="h-full pa-4">
    <template v-if="error">
      <span>{{ `Ha ocurrido un error: ${error}` }}</span>
    </template>

    <template v-if="loading">
      <v-skeleton-loader type="list-item" />
      <v-skeleton-loader type="table" />
    </template>

    <template v-else>
      <div class="flex gap-1 sm:gap-2 w-100 mb-4">
        <div class="sm:w-80 bg-surface">
          <SearchBar
            @update="(searchQuery: string) => searchInput = searchQuery"
          />
        </div>
      </div>

      <RolesTable :data="roles" :search="searchInput" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { RolesTable, SearchBar } from "@/components";
import { useRolesCrud } from "@/composables";

const { loading, error, data: roles, fetch } = useRolesCrud();

const searchInput = ref("");

onMounted(() => {
  fetch();
});
</script>
