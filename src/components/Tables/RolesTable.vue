<template>
  <v-data-table-virtual
    :headers="headers"
    :items="data"
    item-value="id"
    :search="search"
    filter-mode="some"
    hover
  >
    <template #item="{ item }">
      <tr
        class="cursor-pointer"
        :class="[current.dark ? 'hover:bg-zinc-700' : 'hover:bg-gray-100']"
        @click="$emit('onRowClick', item)"
      >
        <td>
          <div class="flex justify-center">
            {{ item.name }}
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script lang="ts" setup>
import type { Role } from "@/types";
import { useTheme } from "vuetify";

defineProps<{
  data: Role[];
  search: string;
}>();
defineEmits(["onRowClick"]);
const { current } = useTheme();

const headers: any = [{ title: "Rol", key: "role", align: "center" }];
</script>
