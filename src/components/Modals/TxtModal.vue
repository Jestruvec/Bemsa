<template>
  <v-dialog width="800">
    <v-card
      prepend-icon="mdi-text"
      :title="txtForEdition ? 'Editar Txt' : 'Crear Txt'"
    >
      <v-card-item>
        <div class="flex gap-2 mt-2 px-2">
          <div class="flex-1">
            <v-form ref="form">
              <v-text-field
                v-model="txt.description"
                label="Descripcion"
                :rules="[FormRules.required]"
                variant="underlined"
              />
            </v-form>
          </div>

          <div class="flex-1 flex items-end flex-col justify-end">
            <div>
              <span class="text-xs">Total de operaciones: </span>
              <span class="font-bold text-xs">{{ txt.details.length }}</span>
            </div>

            <div>
              <span class="text-xs">Importe total: </span>
              <span class="font-bold text-xs">{{ totalAmount }}</span>
            </div>
          </div>
        </div>
      </v-card-item>

      <v-card-item>
        <div class="pa-4 border rounded border-gray-300 border-dashed">
          <TxtDetailForm
            ref="detailForm"
            :detail-for-edition="detailForEdition"
            @add-detail="addDetail"
            @edit-detail="editDetail"
          />
        </div>

        <template v-if="txt.details.length">
          <div
            class="max-h-[15rem] mt-2 overflow-auto border rounded border-gray-300 border-dashed"
          >
            <TxtDetailList
              :data="txt.details"
              @select-detail="selectDetail"
              @delete-detail="deleteDetail"
            />
          </div>
        </template>
      </v-card-item>

      <v-card-actions>
        <DeleteButton @on-confirm-delete="deleteTxt" />
        <SubmitButton @on-click="handleSubmit" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import {
  DeleteButton,
  SubmitButton,
  TxtDetailForm,
  TxtDetailList,
} from "@/components";
import type { Txt, TxtDetail } from "@/types";
import { TxtArray, TransferLayout, Users } from "@/utils";
import { FormRules } from "@/helpers";
import { TxtStatusEnum, TxtTypeEnum } from "@/enums";

const props = defineProps<{ txtForEdition?: Txt }>();
const emits = defineEmits(["onSubmit"]);
const toast = useToast();
const txt = ref<Txt>({
  id: crypto.randomUUID(),
  approved_at: "",
  created_at: new Date().toLocaleDateString("en-CA"),
  approved_by: Users[0],
  created_by: Users[1],
  status: TxtStatusEnum.waiting,
  header: {
    type: TransferLayout.header.recordType.value,
    sequencyNumber: TransferLayout.header.sequenceNumber.value,
    date: new Date().toLocaleDateString("en-CA"),
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

const detailForm = ref();

const totalAmount = computed(() =>
  txt.value.details.reduce((acc, detail) => {
    acc += detail.amount;

    return acc;
  }, 0)
);

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

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    if (txt.value.details.length) {
      props.txtForEdition ? putTxt() : postTxt();
    } else {
      toast.warning("Agregue al menos un detalle para contiunar.");
    }
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};
const postTxt = () => {
  TxtArray.value.push(txt.value);
  console.log(txt.value);
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
