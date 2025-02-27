<template>
  <div class="pa-4 h-100">
    <TxtModal
      v-model="showModal"
      ref="txtModal"
      :txt-for-edition="txtForEdition"
      @update:model-value="closeModal"
      @on-submit="updateData"
    />

    <template v-if="error">
      <span>{{ `Ha ocurrido un error: ${error}` }}</span>
    </template>

    <template v-if="loading">
      <v-skeleton-loader type="list-item" />
      <v-skeleton-loader type="table" />
    </template>

    <template v-else>
      <div class="flex justify-between mb-4 gap-1">
        <div class="flex gap-1 sm:gap-2 w-100">
          <NewRegisterButton @on-click="showModal = true" />

          <div
            class="sm:w-80 bg-surface"
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
          :data="txts"
          :search="searchInput"
          :selected-txt-ids="selectedTxtIds"
          :is-admin="isAdmin"
          @on-row-click="openModalForEdition"
          @on-row-check="openApprovalOptions"
          @on-check-all="openApprovalOptions"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import {
  TxtModal,
  TxtTable,
  TooltipButton,
  SearchBar,
  NewRegisterButton,
} from "@/components";
import type { Approval, Txt } from "@/types";
import { TxtStatusEnum } from "@/enums";
import {
  useApprovalsCrud,
  useAuth,
  useNavDrawer,
  useTxtsCrud,
  useUserProfilesCrud,
} from "@/composables";

const { mobile } = useDisplay();
const { showNavDrawer } = useNavDrawer();
const { loading, error, data: txts, fetch } = useTxtsCrud();
const { post: postApproval, put: putApproval } = useApprovalsCrud();
const { data: userProfile, fetchUserProfileById } = useUserProfilesCrud();
const { user } = useAuth();

const searchInput = ref("");
const txtForEdition = ref<Txt>();
const selectedTxtIds = ref<string[]>([]);
const showApprovalOptions = ref(false);
const showModal = ref(false);
const txtModal = ref();
const isAdmin = ref(false);

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

const updateTxtStatus = async (newStatus: TxtStatusEnum) => {
  for (const id of selectedTxtIds.value) {
    const txt: Txt = txts.value.find((txt) => txt.id === id);

    if (txt.approvals) {
      await putApproval(txt.approvals.id, newStatus);
    } else {
      await postApproval({
        txtId: id,
        userId: user.value.id,
        status: newStatus,
      } as Approval);
    }

    fetch();
    selectedTxtIds.value = [];
  }
};

const updateData = async () => {
  closeModal();
  await fetch();
};

onMounted(async () => {
  fetch();
  await fetchUserProfileById(user.value.id);
  isAdmin.value = userProfile.value[0].roles.name === "admin";
});
</script>
