<template>
  <v-data-table-virtual
    :headers="headers"
    :items="data"
    item-value="userId"
    :search="search"
    filter-mode="some"
    hover
    :filter-keys="headers.map((header: any) => header.key)"
  >
    <template #item="{ item }">
      <tr
        class="cursor-pointer"
        :class="[current.dark ? 'hover:bg-zinc-700' : 'hover:bg-gray-100']"
        @click="$emit('onRowClick', item)"
      >
        <td>
          <UserAvatar :user="item" />
        </td>
        <td>
          <div class="flex justify-center">
            {{ item.name }}
          </div>
        </td>
        <td :class="{ hidden: mobile }">
          <div class="flex justify-center">
            {{ item.lastName }}
          </div>
        </td>
        <td :class="{ hidden: mobile }">
          <div class="flex justify-center">
            {{ item.email }}
          </div>
        </td>
        <td>
          <div class="flex justify-center">
            {{ item.roles?.name }}
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useDisplay, useTheme } from "vuetify";
import { UserAvatar } from "@/components";
import type { User } from "@/types";

defineProps<{
  data: User[];
  search: string;
}>();
const { mobile } = useDisplay();
const { current } = useTheme();

defineEmits(["onRowClick"]);

const headers = computed((): any[] => {
  return mobile.value
    ? [
        { title: "", key: "avatar", align: "center" },
        { title: "Nombre", key: "name", align: "center" },
        { title: "Rol", key: "role.name", align: "center" },
      ]
    : [
        { title: "", key: "avatar", align: "center" },
        { title: "Nombre", key: "name", align: "center" },
        { title: "Apellido", key: "lastName", align: "center" },
        { title: "Correo", key: "email", align: "center" },
        { title: "Rol", key: "role.name", align: "center" },
      ];
});
</script>
