<template>
  <v-form
    ref="form"
    validate-on="submit"
    :disabled="loading"
    @submit.prevent
    @submit="handleSubmit"
  >
    <div class="flex flex-col gap-4">
      <h1 class="font-bold text-xl">Agregar nuevo detalle</h1>

      <v-row>
        <v-col cols="12" sm="4">
          <div class="flex-1 flex flex-col gap-2 py-1">
            <v-select
              v-model="data.emisorAccountType"
              :items="AccountTypes"
              :rules="validationRules.maxLength('senderAccountType')"
              disabled
              item-title="description"
              item-value="value"
              label="Tipo de cuenta del emisor"
            />

            <v-text-field
              v-model="data.emisorAccountNumber"
              :rules="validationRules.maxLength('senderAccountNumber')"
              label="Numero de cuenta del emisor"
              disabled
              type="number"
            />

            <v-select
              v-model="data.currencyCode"
              :items="CurrencyCodes"
              item-title="description"
              item-value="value"
              :rules="validationRules.maxLength('currencyCode')"
              label="Codigo de divisa"
            />

            <v-autocomplete
              v-model="data.receivingBank"
              :items="Banks"
              item-title="description"
              item-value="value"
              :rules="validationRules.maxLength('receivingBank')"
              label="Banco receptor"
            />

            <v-text-field
              v-model="data.amount"
              :rules="validationRules.maxLength('transactionAmount')"
              @update:model-value="setIva"
              label="Monto a transferir"
              type="number"
            />
          </div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="flex-1 flex flex-col gap-2 py-1">
            <v-text-field
              v-model="data.aplicationDate"
              :rules="[FormRules.required]"
              label="Fecha de aplicacion"
              type="date"
            />

            <v-select
              v-model="data.paymentMethod"
              :items="PaymentMethods"
              item-title="description"
              item-value="value"
              :rules="validationRules.maxLength('paymentMethod')"
              label="Metodo de pago"
            />

            <v-select
              v-model="data.receiverAccountType"
              :items="AccountTypes"
              item-title="description"
              item-value="value"
              :rules="validationRules.maxLength('receiverAccountType')"
              label="Tipo de cuenta del receptor"
            />

            <v-text-field
              v-model="data.receiverAccountNumber"
              :rules="validationRules.maxLength('receiverAccountNumber')"
              label="Numero de cuenta del receptor"
            />

            <v-text-field
              v-model="data.alias"
              :rules="validationRules.maxLength('alias')"
              label="Alias"
              hint="Alias registrado del proveedor"
            />
          </div>
        </v-col>

        <v-col cols="12" sm="4">
          <div class="flex-1 flex flex-col gap-2 py-1">
            <v-text-field
              v-model="data.iva"
              type="number"
              disabled
              label="IVA"
            />

            <v-text-field
              v-model="data.reference"
              :rules="validationRules.maxLength('reference')"
              label="Referencia"
            />

            <v-text-field
              v-model="data.speiSpidReference"
              :rules="[
                FormRules.max_length(
                  TransferLayout.detailRecord.speiSpidReference.length
                ),
              ]"
              label="Referencia SPEI / SPID"
              type="number"
            />

            <v-autocomplete
              v-model="data.operationClass"
              :items="OperationClasses"
              item-title="description"
              item-value="value"
              :rules="validationRules.maxLength('transactionClassification')"
              label="Clasificacion de la operacion"
            />

            <v-btn type="submit" :disabled="loading">
              {{ isEditing ? "Guardar" : "Agregar" }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import type { TxtDetail, DetailRecordKey } from "@/types";
import { FormRules } from "@/helpers";
import {
  AccountTypes,
  Banks,
  CurrencyCodes,
  OperationClasses,
  PaymentMethods,
  TransferLayout,
} from "@/utils";
import { AccountTypeEnum, TxtTypeEnum } from "@/enums";

const toast = useToast();
const emits = defineEmits(["addDetail", "editDetail"]);
const props = defineProps<{ detailForEdition?: TxtDetail; loading: boolean }>();
const form = ref();
const data = ref<TxtDetail>({
  type: TxtTypeEnum.DETAIL,
  sequenceNumber: 2,
  filler: "000000000",
  emisorAccountType: AccountTypeEnum.clabeAccount,
  emisorAccountNumber: "030180900027236863",
} as TxtDetail);

const isEditing = computed(() => !!props.detailForEdition);

const validationRules = {
  maxLength: (field: DetailRecordKey) => [
    FormRules.required,
    FormRules.max_length(TransferLayout.detailRecord[field].length || 0),
  ],
};

watch(
  () => props.detailForEdition,
  (newValue) => {
    if (newValue) {
      data.value = {
        ...newValue,
        aplicationDate: newValue.aplicationDate.split("T")[0],
      };
    }
  }
);

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    isEditing.value
      ? emits("editDetail", data.value)
      : emits("addDetail", data.value);

    data.value = {
      type: TxtTypeEnum.DETAIL,
      sequenceNumber: 2,
      filler: "000000000",
      amount: 0,
      emisorAccountType: AccountTypeEnum.clabeAccount,
      emisorAccountNumber: "030180900027236863",
    } as TxtDetail;
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};

const setIva = () => {
  const amount = data.value.amount / 100;
  const base = amount / 1.16;
  const iva = base * 0.16;

  data.value.iva = Number(iva.toFixed(2));
};

defineExpose({ form });
</script>
