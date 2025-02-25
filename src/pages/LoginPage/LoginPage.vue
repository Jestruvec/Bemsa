<template>
  <div class="h-screen flex justify-center items-center">
    <div class="w-[20rem]">
      <LoginForm @on-login-succesfully="$router.push('./')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoginForm } from "@/components";
</script>
