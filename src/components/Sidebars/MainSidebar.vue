<template>
  <v-navigation-drawer
    permanent
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <template v-if="error">
      <span>{{ `Ha ocurrido un error: ${error}` }}</span>
    </template>

    <template v-if="loading">
      <v-skeleton-loader type="list-item-three-line" />
    </template>

    <template v-else>
      <v-list>
        <v-list-group
          v-for="item in appModules"
          :key="item.id"
          :value="item.id"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.name"
            />
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.id"
            :prepend-icon="child.icon"
            :title="child.description"
            :value="child.id"
            link
            :to="child.url"
          />
        </v-list-group>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useAppModulesCrud, useAuth, useUserProfilesCrud } from "@/composables";

const {
  loading,
  error,
  data: userModules,
  fetchAppModules,
} = useAppModulesCrud();
const { user } = useAuth();
const { fetchUserProfileById, data: userProfile } = useUserProfilesCrud();

const appModules = computed(() => {
  return [
    {
      id: crypto.randomUUID(),
      name: "Administracion",
      description: "",
      url: "/administration",
      icon: "mdi-table",
      children:
        userProfile.value[0].roles.name === "admin"
          ? userModules.value
          : userModules.value?.filter(
              (userModule) => userModule.name === "Txts"
            ),
    },
  ];
});

onMounted(async () => {
  await fetchUserProfileById(user.value.id);
  await fetchAppModules();
});
</script>
