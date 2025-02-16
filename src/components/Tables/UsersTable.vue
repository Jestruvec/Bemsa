<template>
  <v-data-table-virtual :headers="headers" :items="Users" item-value="id">
    <template #item="{ item }">
      <tr class="cursor-pointer" @click="$emit('onRowClick', item)">
        <td>
          <UserAvatar :user="item" />
        </td>
        <td>
          <div class="flex justify-center">
            {{ item.name }}
          </div>
        </td>
        <td>
          <div class="flex justify-center">
            {{ item.lastName }}
          </div>
        </td>
        <td>
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
import { UserAvatar } from "..";
import { Users } from "../../utils";

defineEmits(["onRowClick"]);
const headers: any = [
  { title: "", key: "avatar", align: "center" },
  { title: "Nombre", key: "name", align: "center" },
  { title: "Apellido", key: "lastName", align: "center" },
  { title: "Correo", key: "email", align: "center" },
  { title: "Rol", key: "role.name", align: "center" },
];
</script>
