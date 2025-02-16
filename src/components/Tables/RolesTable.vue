<template>
  <v-data-table-virtual :headers="headers" :items="roles" item-value="id">
    <template #item="{ item }">
      <tr class="cursor-pointer" @click="$emit('onRowClick', item)">
        <td>
          <div class="flex justify-center">
            {{ item.role }}
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
defineEmits(["onRowClick"]);

const headers: any = [
  { title: "Rol", key: "role", align: "center" },
  { title: "Permisos", key: "permissions", align: "center" },
];

const roles = [
  {
    role: "Administrador",
    permissions: ["Leer", "Crear", "Actualizar", "Borrar"],
  },
  {
    role: "Dinamico",
    permissions: ["Leer", "Crear"],
  },
];
</script>
