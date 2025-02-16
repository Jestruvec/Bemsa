<template>
  <v-form
    ref="form"
    @submit.prevent
    @submit="handleSubmit"
    validate-on="submit"
    class="border border-dashed rounded border-gray-300"
  >
    <div class="flex flex-col gap-4 p-4">
      <h1>Iniciar sesion en PLATFORM_NAME</h1>
      <v-text-field
        v-model="username"
        label="Usuario"
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
import { useToast } from "vue-toastification";
import { FormRules } from "../../helpers/FormRules";

const toast = useToast();
const emits = defineEmits(["onLoginSuccesfully"]);
const form = ref();
const username = ref();
const password = ref();
const showPassword = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);

const handleSubmit = async () => {
  const formIsValid = await validateForm();

  if (formIsValid) {
    try {
      loading.value = true;
      error.value = null;

      const loginResponse = await login();
      console.log(loginResponse);
      emits("onLoginSuccesfully", loginResponse);
    } catch (err) {
      error.value = err as string;
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  }
};

const validateForm = async () => {
  const { valid } = await form.value.validate();
  return valid as boolean;
};

const login = async (): Promise<{ username: string; token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username.value === "admin" && password.value === "123") {
        resolve({ username: username.value, token: crypto.randomUUID() });
      } else {
        reject("Credenciales invalidas");
      }
    }, 1000);
  });
};
</script>
