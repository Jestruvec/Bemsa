<template>
  <v-data-table-virtual :headers="headers" :items="roles" item-value="id">
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
        <td>
          <div class="flex justify-center">
            <v-tooltip location="top" :text="item.permissions.join(', ')">
              <template #activator="{ props }">
                <span v-bind="props">
                  {{ item.permissions.length }}
                </span>
              </template>
            </v-tooltip>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script lang="ts" setup>
import type { Role } from "@/types";
import { ref } from "vue";
import { useTheme } from "vuetify";

defineEmits(["onRowClick"]);
const { current } = useTheme();

const roles = ref<Role[]>([]);
const headers: any = [
  { title: "Rol", key: "role", align: "center" },
  { title: "Permisos", key: "permissions", align: "center" },
];
</script>
