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
        <v-img v-if="data.imgUrl" :src="data.imgUrl" cover />
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
        :rules="[FormRules.required, FormRules.passwordMatch(data.password)]"
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-form-textbox-password"
        :append-inner-icon="
          showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
        "
        @click:append-inner="showPassword = !showPassword"
      />
      <v-text-field
        v-model="confirmationPassword"
        label="Confirmar contrasena"
        :rules="[
          FormRules.required,
          FormRules.passwordMatch(confirmationPassword),
        ]"
        :type="showConfirmationPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-form-textbox-password"
        :append-inner-icon="
          showConfirmationPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
        "
        @click:append-inner="
          showConfirmationPassword = !showConfirmationPassword
        "
      />
      <v-select
        v-model="data.roleId"
        :items="roles"
        :rules="[FormRules.required]"
        prepend-inner-icon="mdi-account-cog"
        label="Rol"
        item-title="name"
        item-value="id"
      />
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { watch, ref } from "vue";
import { FormRules } from "@/helpers";
import type { Role, User } from "@/types";

const props = defineProps<{ modelValue: User }>();
const emits = defineEmits(["update:modelValue"]);
const roles = ref<Role[]>([]);
const form = ref();
const fileInput = ref();
const data = ref<User>({ ...props.modelValue });
const confirmationPassword = ref();
const showConfirmationPassword = ref(false);
const showPassword = ref(false);

watch(data, (newValue) => emits("update:modelValue", newValue), { deep: true });

defineExpose({
  validate: () => form.value?.validate(), // Exponemos directamente `validate()`
});
</script>
