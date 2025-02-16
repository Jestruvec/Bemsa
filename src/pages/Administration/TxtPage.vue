<template>
  <div class="pa-4">
    <TxtModal
      v-model="showModal"
      ref="txtModal"
      :txt-for-edition="txtForEdition"
      @update:model-value="closeModal"
      @on-submit="closeModal"
    />

    <div class="flex justify-between mb-4">
      <div class="flex flex-wrap gap-2">
        <NewRegisterButton @on-click="showModal = true" />
        <!-- <ExcelButton @on-click="toast.warning('Funcion en desarrollo')" /> -->

        <div class="w-48 bg-surface">
          <SearchBar
            variant="outlined"
            @update="(searchQuery: string) => searchInput = searchQuery"
          />
        </div>
      </div>

      <template v-if="selectedTxtIds.length">
        <div class="flex gap-2">
          <TooltipButton
            btnColor="success"
            icon="mdi-check"
            tooltip-txt="Aprobar"
            @on-click="updateTxtStatus(TxtStatusEnum.aproved)"
          />
          <TooltipButton
            btnColor="error"
            icon="mdi-cancel"
            tooltip-txt="Rechazar"
            @on-click="updateTxtStatus(TxtStatusEnum.rejected)"
          />
          <TooltipButton
            btnColor="warning"
            icon="mdi-alert-outline"
            tooltip-txt="Dejar en espera"
            @on-click="updateTxtStatus(TxtStatusEnum.waiting)"
          />
        </div>
      </template>
    </div>

    <TxtTable
      :data="TxtArray"
      :search="searchInput"
      :selected-txt-ids="selectedTxtIds"
      @on-row-click="openModalForEdition"
      @on-row-check="openApprovalOptions"
      @on-check-all="openApprovalOptions"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  TxtModal,
  TxtTable,
  TooltipButton,
  SearchBar,
  NewRegisterButton,
} from "../../components";
import type { Txt } from "../../types";
import { TxtArray } from "../../utils";
import { TxtStatusEnum } from "../../enums";

const searchInput = ref("");
const txtForEdition = ref<Txt>();
const selectedTxtIds = ref<string[]>([]);
const showApprovalOptions = ref(false);
const showModal = ref(false);
const txtModal = ref();

const openModalForEdition = (txt: Txt) => {
  txtForEdition.value = txt;
  showModal.value = true;
};

const openApprovalOptions = (TxtIds: string[]) => {
  selectedTxtIds.value = TxtIds;
  showApprovalOptions.value = true;
};

const closeModal = () => {
  txtForEdition.value = undefined;
  txtModal.value.resetForm();
  showModal.value = false;
};

const updateTxtStatus = (newStatus: TxtStatusEnum) => {
  const txtForUpdate = TxtArray.value.filter((txt) =>
    selectedTxtIds.value.includes(txt.id)
  );

  txtForUpdate.forEach((txt) => (txt.status = newStatus));

  selectedTxtIds.value = [];
};
</script>
