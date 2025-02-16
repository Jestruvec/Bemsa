<template>
  <v-dialog width="600">
    <v-card prepend-icon="mdi-account-multiple" title="Crear rol">
      <template #text>
        <v-form @submit.prevent @submit="handleSubmit">
          <div class="flex flex-col gap-4">
            <v-text-field label="Nombre del rol" />

            <v-table>
              <thead>
                <tr>
                  <th>Modulo</th>
                  <th>Todos</th>
                  <th>Ver</th>
                  <th>Crear</th>
                  <th>Actualizar</th>
                  <th>Borrar</th>
                </tr>
              </thead>
              <tbody v-for="item in UserSystemModules" :key="item.id">
                <tr>
                  <td>
                    <div class="flex items-center gap-2">
                      <v-icon
                        icon="mdi-chevron-down"
                        @click="expand = !expand"
                      />
                      <span class="font-bold">
                        {{ item.description }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                </tr>

                <tr v-show="expand" v-for="child in item.children">
                  <td>
                    {{ child.description }}
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                  <td>
                    <div class="flex justify-center">
                      <v-checkbox />
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <div class="flex justify-between">
              <v-btn class="cursor-pointer" text="Eliminar" color="error" />
              <v-btn class="cursor-pointer" text="Crear" type="submit" />
            </div>
          </div>
        </v-form>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UserSystemModules } from "../../utils";

const emits = defineEmits(["userCreated"]);
const expand = ref(false);

const handleSubmit = () => {
  emits("userCreated");
};
</script>
