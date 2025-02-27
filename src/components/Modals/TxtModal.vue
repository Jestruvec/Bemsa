<template>
  <v-dialog width="800">
    <v-card
      prepend-icon="mdi-text"
      :title="txtForEdition ? 'Editar Txt' : 'Crear Txt'"
    >
      <v-card-item>
        <div class="flex gap-2 mt-2 px-2">
          <div class="flex-1">
            <v-form ref="form" :disabled="loading">
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
              <span class="font-bold text-xs">{{
                txt.txt_details?.length
              }}</span>
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
            :loading="loading"
            @add-detail="addDetail"
            @edit-detail="editDetail"
          />
        </div>

        <div
          v-if="txt.txt_details?.length"
          class="max-h-[15rem] mt-2 overflow-auto border rounded border-gray-300 border-dashed"
        >
          <TxtDetailList
            :data="txt.txt_details"
            :loading="loading"
            @select-detail="selectDetail"
            @delete-detail="deleteDetail"
          />
        </div>
      </v-card-item>

      <v-card-actions>
        <DeleteButton
          v-if="!!txtForEdition"
          :disabled="loading"
          @on-confirm-delete="deleteTxt"
        />
        <SubmitButton @on-click="handleSubmit" :disabled="loading" />
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
import { TransferLayout } from "@/utils";
import { FormRules } from "@/helpers";
import { useAuth, useTxtDetailsCrud, useTxtsCrud } from "@/composables";

const { user } = useAuth();
const { deleteTxtDetail } = useTxtDetailsCrud();
const { loading, error, post, put, remove } = useTxtsCrud();

const props = defineProps<{ txtForEdition?: Txt }>();
const emits = defineEmits(["onSubmit"]);
const toast = useToast();
const txt = ref<Txt>({
  description: "",
  userId: user.value.id,
  txt_headers: {
    type: TransferLayout.header.recordType.value,
    sequenceNumber: TransferLayout.header.sequenceNumber.value,
    date: new Date().toDateString(),
    consecutive: TransferLayout.header.consecutive.value,
  },
  txt_details: [] as TxtDetail[],
  txt_summaries: {
    type: TransferLayout.summary.recordType.value,
  },
} as Txt);
const detailForEdition = ref<TxtDetail>();
const form = ref();
const detailForm = ref();

const totalAmount = computed(() =>
  txt.value.txt_details?.reduce((acc, detail) => {
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

const selectDetail = (detail: TxtDetail) => {
  detailForEdition.value = detail;
};
const addDetail = (detail: TxtDetail) => {
  txt.value.txt_details?.push(detail);
};
const editDetail = (detail: TxtDetail) => {
  const index = txt.value.txt_details.findIndex((e) => e.id === detail.id);

  if (txt.value.txt_details && index >= 0) {
    txt.value.txt_details[index] = detail;
    detailForEdition.value = undefined;
  }
};
const deleteDetail = async (detail: TxtDetail) => {
  await deleteTxtDetail(detail.id);

  txt.value.txt_details = txt.value.txt_details.filter(
    (e) => e.id !== detail.id
  );
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    if (txt.value.txt_details?.length) {
      txt.value.txt_summaries = {
        ...txt.value.txt_summaries,
        totalOperations: txt.value.txt_details.length,
        totalOperationsAmount: totalAmount.value,
        sequenceNumber: txt.value.txt_details.length + 2,
      };

      props.txtForEdition
        ? await put(txt.value.id, txt.value)
        : await post(txt.value);

      if (error.value) {
        toast.error(error.value);
        return;
      }

      emits("onSubmit");
      toast.success(
        props.txtForEdition
          ? "Txt editado correctamente"
          : "Txt creado correctamente"
      );
    } else {
      toast.warning("Agregue al menos un detalle para contiunar.");
    }
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};
const deleteTxt = async () => {
  await remove(txt.value.id);

  if (error.value) {
    toast.error(error.value);
    return;
  }

  toast.success("Txt eliminado correctamente");
  emits("onSubmit");
};

defineExpose({
  resetForm: () => {
    txt.value = {
      description: "",
      userId: user.value.id,
      txt_headers: {
        type: TransferLayout.header.recordType.value,
        sequenceNumber: TransferLayout.header.sequenceNumber.value,
        date: new Date().toISOString(),
        consecutive: TransferLayout.header.consecutive.value,
      },
      txt_details: [] as TxtDetail[],
      txt_summaries: {
        type: TransferLayout.summary.recordType.value,
      },
    } as Txt;
  },
});
</script>
