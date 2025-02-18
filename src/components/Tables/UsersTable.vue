<template>
  <v-data-table-virtual :headers="headers" :items="Users" item-value="id">
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
            {{ item.role.name }}
          </div>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useDisplay, useTheme } from "vuetify";
import { UserAvatar } from "..";
import { Users } from "@/utils";

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
