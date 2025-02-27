<template>
  <v-form ref="form" validate-on="submit">
    <div class="flex flex-col gap-4">
      <div
        class="border ma-auto overflow-hidden h-40 w-40 cursor-pointer bg-gray-100 hover:opacity-75 rounded-full my-4 flex items-center justify-center"
        @click="fileInput.click()"
      >
        <div class="-z-10 absolute hidden">
          <v-file-input ref="fileInput" accept="image/*" />
        </div>
        <v-img v-if="data.avatarUrl" :src="data.avatarUrl" cover />
        <v-icon v-else icon="mdi-account" size="80" />
      </div>

      <v-text-field
        v-model="data.name"
        label="Nombre"
        :rules="[FormRules.required]"
      />

      <v-text-field
        v-model="data.lastName"
        label="Apellido"
        :rules="[FormRules.required]"
      />

      <v-text-field
        v-model="data.email"
        label="Correo electronico"
        :rules="[FormRules.required, FormRules.emailFormat]"
      />

      <v-text-field
        v-model="data.password"
        label="Contrasena"
        :rules="
          isEdition
            ? []
            : [FormRules.required, FormRules.passwordMatch(data.password)]
        "
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-form-textbox-password"
        :append-inner-icon="
          showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
        "
        @click:append-inner="showPassword = !showPassword"
      />

      <template v-if="fetchRolesError">
        <span>Ha ocurrido un error al obtener los roles </span>
        <span class="text-bold" @click="fetch">Reintentar</span>
      </template>
      <template v-else>
        <v-select
          v-model="data.roleId"
          :items="roles"
          :rules="[FormRules.required]"
          :disabled="loading"
          prepend-inner-icon="mdi-account-cog"
          label="Rol"
          item-title="name"
          item-value="id"
        />
      </template>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import { FormRules } from "@/helpers";
import type { User } from "@/types";
import { useRolesCrud } from "@/composables";

const { loading, error: fetchRolesError, data: roles, fetch } = useRolesCrud();
const props = defineProps<{ modelValue: User; isEdition: boolean }>();
const emits = defineEmits(["update:modelValue"]);
const form = ref();
const fileInput = ref();
const data = ref<User>({ ...props.modelValue });
const showPassword = ref(false);

watch(data, (newValue) => emits("update:modelValue", newValue), { deep: true });

onMounted(() => {
  fetch();
});

defineExpose({
  validate: () => form.value?.validate(),
});
</script>
