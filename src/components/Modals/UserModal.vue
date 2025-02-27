<template>
  <v-dialog width="400" @click:outside="resetForm">
    <v-card
      prepend-icon="mdi-account-multiple"
      :title="userForEdition ? 'Editar usuario' : 'Crear usuario'"
    >
      <v-card-item>
        <UserForm v-model="user" ref="form" :is-edition="!!userForEdition" />
      </v-card-item>

      <v-card-actions>
        <DeleteButton
          v-if="userForEdition && userForEdition.id !== authUser.id"
          @on-confirm-delete="deleteUser"
        />
        <SubmitButton @on-click="handleSubmit" :loading="loading" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { DeleteButton, SubmitButton, UserForm } from "@/components";
import type { User } from "@/types";
import { useAuth, useUserProfilesCrud } from "@/composables";

const { user: authUser } = useAuth();
const { loading, error, postUserProfile, putUserProfile, deleteUserProfile } =
  useUserProfilesCrud();

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
    } else {
      user.value = {} as User;
    }
  }
);

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    props.userForEdition ? await putUser() : await postUser();

    if (error.value) {
      toast.error(error.value);
      return;
    }

    emits("onSubmit");
    toast.success(
      props.userForEdition
        ? "Usuario editado correctamente"
        : "Usuario creado correctamente"
    );
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};

const postUser = async () => {
  await postUserProfile(user.value);
};

const putUser = async () => {
  await putUserProfile(user.value.id, user.value, !!user.value.password);
};

const deleteUser = async () => {
  await deleteUserProfile(user.value.id);

  if (error.value) {
    toast.error(error.value);
    return;
  }

  toast.success("Usuario eliminado correctamente");
  emits("onSubmit");
};

const resetForm = () => {
  user.value = {} as User;
};

defineExpose({
  resetForm,
});
</script>
