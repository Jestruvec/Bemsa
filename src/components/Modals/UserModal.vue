<template>
  <v-dialog width="400">
    <v-card prepend-icon="mdi-account-multiple" title="Crear usuario">
      <template #text>
        <v-form @submit.prevent @submit="handleSubmit">
          <div class="flex flex-col gap-4">
            <div
              class="border h-40 w-40 cursor-pointer bg-gray-100 hover:opacity-75 rounded-full m-auto my-4 flex items-center justify-center"
            >
              <v-icon icon="mdi-account" size="80" />
            </div>

            <v-text-field label="Nombre de usuario" />
            <v-text-field label="Correo electronico" />
            <v-text-field label="Contrasena" />
            <v-text-field label="Confirmar contrasena" />
            <v-select prepend-inner-icon="mdi-account-cog" label="Rol" />

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
const emits = defineEmits(["userCreated"]);

const handleSubmit = () => {
  emits("userCreated");
};
</script>
