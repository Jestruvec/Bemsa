<template>
  <v-form
    ref="form"
    @submit.prevent
    @submit="handleSubmit"
    validate-on="submit"
    class="border border-dashed rounded border-gray-300"
  >
    <div class="flex flex-col gap-4 pa-4">
      <h1>Iniciar sesion en PLATFORM_NAME</h1>
      <v-text-field
        v-model="email"
        label="Correo electronico"
        prepend-inner-icon="mdi-account"
        :rules="[FormRules.required]"
      />
      <v-text-field
        v-model="password"
        label="Contrasena"
        :rules="[FormRules.required]"
        :type="showPassword ? 'text' : 'password'"
        prepend-inner-icon="mdi-form-textbox-password"
        :append-inner-icon="
          showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
        "
        @click:append-inner="showPassword = !showPassword"
      />

      <span class="text-xs text-gray-500 cursor-pointer hover:opacity-75">
        ¿Credenciales olvidadas?
      </span>

      <v-btn type="submit" class="cursor-pointer" :loading="loading"
        >Iniciar sesion</v-btn
      >
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { FormRules } from "@/helpers/FormRules";
import { useAuth } from "@/composables";

const router = useRouter();
const toast = useToast();
const emits = defineEmits(["onLoginSuccesfully"]);
const { loading, error, login } = useAuth();
const form = ref();
const email = ref("");
const password = ref("");
const showPassword = ref(false);

const handleSubmit = async () => {
  const formIsValid = await validateForm();

  if (formIsValid) {
    await login(email.value, password.value);

    if (error.value) {
      toast.error(error.value);
      return;
    }

    router.push("/home");
  }
};

const validateForm = async () => {
  const { valid } = await form.value.validate();
  return valid as boolean;
};
</script>
