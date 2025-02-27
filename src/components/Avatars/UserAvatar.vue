<template>
  <template v-if="user.avatarUrl">
    <v-avatar
      :image="user.avatarUrl"
      :color="user.roles?.name === 'admin' ? '#FFD700' : 'primary'"
    />
  </template>

  <template v-else>
    <v-avatar :color="user.roles?.name === 'admin' ? '#FFD700' : 'primary'">
      {{ getInitials(user.name) }}
    </v-avatar>
  </template>
</template>

<script lang="ts" setup>
import type { User } from "@/types";

defineProps<{ user: User }>();

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
</script>
