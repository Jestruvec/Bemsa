<template>
  <v-list>
    <v-list-item>
      <SearchBar @update="updateSearchQuery" />
    </v-list-item>

    <v-list-item
      v-for="detail in txtDetailsFiltered"
      :key="detail.id"
      :title="detail.alias"
      :subtitle="getSubtitle(detail)"
      @click="$emit('selectDetail', detail)"
    >
      <template #append>
        <div class="flex gap-2">
          <DeleteButton
            hide-btn-txt
            density="compact"
            @click.stop
            @on-confirm-delete="$emit('deleteDetail', detail)"
          />
        </div>
      </template>
    </v-list-item>

    <v-list-item v-if="!props.data.length">
      <span class="text-xs"> Ingrese uno o mas detalles para continuar </span>
    </v-list-item>

    <v-list-item v-else-if="!txtDetailsFiltered.length">
      <span class="text-xs"> No se encontraron resultados de busqueda </span>
    </v-list-item>
  </v-list>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { AccountTypeEnum } from "@/enums";
import type { TxtDetail } from "@/types";
import { SearchBar, DeleteButton } from "@/components";

const props = defineProps<{ data: TxtDetail[] }>();
const emits = defineEmits(["selectDetail", "deleteDetail"]);

const searchQuery = ref("");

const txtDetailsFiltered = computed(() => {
  return props.data.filter((detail) =>
    detail.alias.toLocaleLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const getSubtitle = (detail: TxtDetail) => {
  let subtitle = "";

  switch (detail.emisorAccountType) {
    case AccountTypeEnum.checkingAccount:
      subtitle += "Cuenta de cheques: ";
      break;
    case AccountTypeEnum.debitAccount:
      subtitle += "Cuenta de debito: ";
      break;
    case AccountTypeEnum.clabeAccount:
      subtitle += "Cuenta CLABE: ";
      break;
    default:
      break;
  }

  subtitle += detail.emisorAccountNumber;

  return subtitle;
};

const updateSearchQuery = (query: string) => {
  searchQuery.value = query;
};
</script>
