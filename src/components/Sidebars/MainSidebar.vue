<template>
  <v-navigation-drawer
    permanent
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
  >
    <v-list>
      <v-list-group
        v-for="item in UserSystemModules"
        :key="item.id"
        :value="item.id"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="item.icon"
            :title="item.description"
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
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { UserSystemModules } from "../../utils";
</script>
