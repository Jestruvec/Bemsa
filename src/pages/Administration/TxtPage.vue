<template>
  <div class="pa-4 h-100">
    <TxtModal
      v-model="showModal"
      ref="txtModal"
      :txt-for-edition="txtForEdition"
      @update:model-value="closeModal"
      @on-submit="closeModal"
    />

    <div class="flex justify-between mb-4 gap-1">
      <div class="flex gap-1 sm:gap-2 w-100">
        <NewRegisterButton @on-click="showModal = true" />

        <div
          class="sm:w-40 bg-surface"
          :class="selectedTxtIds.length ? ['w-28'] : ['w-60']"
        >
          <SearchBar
            @update="(searchQuery: string) => searchInput = searchQuery"
          />
        </div>
      </div>

      <template v-if="selectedTxtIds.length">
        <div class="flex gap-1 sm:gap-2">
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

    <div
      :class="
        mobile && showNavDrawer
          ? ['h-[calc(100vh-22.75rem)]']
          : mobile
          ? ['h-[calc(100vh-9.75rem)]']
          : ['h-[calc(100vh-9.5rem)]']
      "
      class="overflow-auto"
    >
      <TxtTable
        :data="TxtArray"
        :search="searchInput"
        :selected-txt-ids="selectedTxtIds"
        @on-row-click="openModalForEdition"
        @on-row-check="openApprovalOptions"
        @on-check-all="openApprovalOptions"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import {
  TxtModal,
  TxtTable,
  TooltipButton,
  SearchBar,
  NewRegisterButton,
} from "@/components";
import type { Txt } from "@/types";
import { TxtArray, Users } from "@/utils";
import { TxtStatusEnum } from "@/enums";
import { useNavDrawer } from "@/hooks";

const searchInput = ref("");
const txtForEdition = ref<Txt>();
const selectedTxtIds = ref<string[]>([]);
const showApprovalOptions = ref(false);
const showModal = ref(false);
const txtModal = ref();
const { mobile } = useDisplay();
const { showNavDrawer } = useNavDrawer();

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

  txtForUpdate.forEach((txt) => {
    txt.status = newStatus;
    txt.approved_at = new Date().toLocaleDateString("en-CA");
    txt.approved_by = Users.value[3];
  });

  selectedTxtIds.value = [];
};
</script>
