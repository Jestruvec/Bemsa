<template>
  <v-dialog width="400">
    <v-card
      prepend-icon="mdi-account-multiple"
      :title="userForEdition ? 'Editar usuario' : 'Crear usuario'"
    >
      <v-card-item>
        <UserForm v-model="user" ref="form" />
      </v-card-item>

      <v-card-actions>
        <DeleteButton v-if="!!userForEdition" @on-confirm-delete="deleteUser" />
        <SubmitButton @on-click="handleSubmit" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { DeleteButton, SubmitButton, UserForm } from "@/components";
import type { User } from "@/types";
import { RolesArray, Users } from "@/utils";

const toast = useToast();
const props = defineProps<{ userForEdition?: User }>();
const emits = defineEmits(["onSubmit"]);
const user = ref<User>({} as User);
const form = ref();

watch(
  () => props.userForEdition,
  (newValue) => {
    if (newValue) {
      user.value = { ...newValue };
    }
  }
);

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    props.userForEdition ? putUser() : postUser();
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};
const postUser = () => {
  const role = RolesArray.value.find((role) => role.id === user.value.roleId);

  if (role) {
    Users.value.push({ ...user.value, role });
    toast.success("Usuario creado correctamente");
    emits("onSubmit");
  }
};
const putUser = () => {
  const txtIndex = getUserIndex(user.value);
  Users.value[txtIndex] = user.value;
  toast.success("Usuario editado correctamente");
  emits("onSubmit");
};
const deleteUser = () => {
  const txtIndex = getUserIndex(user.value);
  Users.value.splice(txtIndex, 1);

  toast.success("Txt eliminado correctamente");
  emits("onSubmit");
};

const getUserIndex = (user: User) => {
  return Users.value.findIndex((e) => e.id === user.id);
};

defineExpose({
  resetForm: () => {
    user.value = {} as User;
  },
});
</script>
