<template>
  <v-dialog width="800">
    <v-card
      prepend-icon="mdi-text"
      :title="txtForEdition ? 'Editar Txt' : 'Crear Txt'"
    >
      <v-card-item>
        <v-form ref="form" class="mt-1" validate-on="submit">
          <v-text-field
            v-model="txt.description"
            label="Descripcion"
            :rules="[FormRules.required]"
          />
        </v-form>

        <v-stepper
          v-model="e1"
          :items="['ENCABEZADO', 'DETALLE', 'SUMARIO']"
          flat
        >
          <template #item.1>
            <TxtHeaderForm v-model="txt.header" ref="headerForm" />
          </template>

          <template #item.2>
            <v-row>
              <v-col cols="12" sm="8">
                <TxtDetailForm
                  ref="detailForm"
                  :detail-for-edition="detailForEdition"
                  @add-detail="addDetail"
                  @edit-detail="editDetail"
                />
              </v-col>

              <v-col cols="12" sm="4">
                <div
                  class="h-[26.5rem] overflow-auto border rounded border-gray-300 border-dashed"
                >
                  <TxtDetailList
                    :data="txt.details"
                    @select-detail="selectDetail"
                    @delete-detail="deleteDetail"
                  />
                </div>
              </v-col>
            </v-row>
          </template>

          <template #item.3>
            <TxtSummaryForm v-model="txt.summary" ref="summaryForm" />
          </template>

          <template #actions>
            <div class="flex justify-between px-6">
              <div class="flex gap-2">
                <DeleteButton
                  v-if="!!txtForEdition"
                  @on-confirm-delete="deleteTxt"
                />
                <NextPrevButton
                  prev
                  :disabled="e1 === 1"
                  @on-click="onPrevStep"
                />
              </div>

              <div class="flex gap-2">
                <NextPrevButton
                  v-if="e1 < 3"
                  :disabled="e1 === 3"
                  @click="onNextStep"
                />

                <SubmitButton v-if="e1 === 3" @click="handleSubmit" />
              </div>
            </div>
          </template>
        </v-stepper>
      </v-card-item>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import {
  TxtHeaderForm,
  TxtDetailForm,
  TxtSummaryForm,
  TxtDetailList,
  DeleteButton,
  SubmitButton,
  NextPrevButton,
} from "@/components";
import type { Txt, TxtDetail } from "@/types";
import { TxtArray, TransferLayout } from "@/utils";
import { FormRules } from "@/helpers";
import { TxtTypeEnum } from "@/enums";

const props = defineProps<{ txtForEdition?: Txt }>();
const emits = defineEmits(["onSubmit"]);
const toast = useToast();
const txt = ref<Txt>({
  header: {
    type: TransferLayout.header.recordType.value,
    sequencyNumber: TransferLayout.header.sequenceNumber.value,
    consecutive: TransferLayout.header.consecutive.value,
  },
  details: [] as TxtDetail[],
  summary: {
    type: TransferLayout.summary.recordType.value,
  },
} as Txt);
const detailForEdition = ref<TxtDetail>();
const e1 = ref(1);
const form = ref();

const headerForm = ref();
const detailForm = ref();
const summaryForm = ref();

watch(
  () => props.txtForEdition,
  (newValue) => {
    if (newValue) {
      txt.value = { ...newValue };
    }
  }
);

const getDetailIndex = (detail: TxtDetail) => {
  return txt.value.details.findIndex((e) => e.id === detail.id);
};
const getTxtIndex = (txt: Txt) => {
  return TxtArray.value.findIndex((e) => e.id === txt.id);
};

const selectDetail = (detail: TxtDetail) => {
  detailForEdition.value = detail;
};
const addDetail = (detail: TxtDetail) => {
  txt.value.details.push(detail);
};
const editDetail = (detail: TxtDetail) => {
  const index = getDetailIndex(detail);
  txt.value.details[index] = detail;
  detailForEdition.value = undefined;
};
const deleteDetail = (detail: TxtDetail) => {
  const index = getDetailIndex(detail);
  txt.value.details.splice(index, 1);
};

const onPrevStep = () => {
  e1.value > 1 && e1.value--;
};
const onNextStep = async () => {
  let isValid: any = {};
  let toastMsg = "El formulario no es válido. Por favor, revisa los campos.";

  switch (e1.value) {
    case 1:
      isValid = await headerForm.value.form.validate();
      break;
    case 2:
      isValid.valid = !!txt.value.details.length;
      toastMsg = "Es necesario agregar al menos un detalle";
      break;
    case 3:
      isValid = await summaryForm.value.form.validate();
      break;
  }

  if (isValid.valid) {
    e1.value++;
  } else {
    toast.warning(toastMsg);
  }
};

const handleSubmit = async () => {
  const { valid: txtHasDescription } = await form.value.validate();
  const isSummaryFormValid = await summaryForm.value.form.validate();

  if (isSummaryFormValid.valid && txtHasDescription) {
    props.txtForEdition ? putTxt() : postTxt();
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};
const postTxt = () => {
  TxtArray.value.push(txt.value);
  toast.success("Txt creado correctamente");
  emits("onSubmit");
};
const putTxt = () => {
  const txtIndex = getTxtIndex(txt.value);
  TxtArray.value[txtIndex] = txt.value;
  toast.success("Txt editado correctamente");
  emits("onSubmit");
};
const deleteTxt = () => {
  const txtIndex = getTxtIndex(txt.value);
  TxtArray.value.splice(txtIndex, 1);

  toast.success("Txt eliminado correctamente");
  emits("onSubmit");
};

defineExpose({
  resetForm: () => {
    e1.value = 1;
    txt.value = {
      header: {
        type: TxtTypeEnum.HEADER,
        sequencyNumber: "0000001",
        consecutive: "000",
      },
      details: [] as TxtDetail[],
      summary: {
        type: TxtTypeEnum.SUMMARY,
      },
    } as Txt;
  },
});
</script>
