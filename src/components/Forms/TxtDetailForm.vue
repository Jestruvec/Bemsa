<template>
  <v-form
    ref="form"
    validate-on="submit"
    @submit.prevent
    @submit="handleSubmit"
  >
    <v-row>
      <v-col cols="12" sm="6">
        <div class="flex-1 flex flex-col gap-2 py-1">
          <v-text-field
            v-model="data.alias"
            :rules="validationRules.maxLength('alias')"
            label="Alias"
          />

          <v-text-field
            v-model="data.type"
            :rules="validationRules.maxLength('recordType')"
            label="Tipo de registro"
            disabled
          />

          <v-text-field
            v-model="data.sequencyNumber"
            :rules="validationRules.maxLength('sequenceNumber')"
            label="Numero de secuencia"
            type="number"
            disabled
          />

          <v-select
            v-model="data.emisorAccountType"
            :items="AccountTypes"
            :rules="validationRules.maxLength('senderAccountType')"
            item-title="description"
            item-value="value"
            label="Tipo de cuenta del emisor"
          />

          <v-text-field
            v-model="data.emisorAccountNumber"
            :rules="validationRules.maxLength('senderAccountNumber')"
            label="Numero de cuenta del emisor"
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
            label="Monto a transferir"
            type="number"
          />

          <v-text-field
            v-model="data.aplicationDate"
            :rules="[FormRules.required]"
            label="Fecha de aplicacion"
            type="date"
          />
        </div>
      </v-col>

      <v-col cols="12" sm="6">
        <div class="flex-1 flex flex-col gap-2 py-1">
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
            v-model="data.filler"
            :rules="validationRules.maxLength('filler')"
            label="Filler"
            disabled
          />

          <v-text-field
            v-model="data.iva"
            :rules="validationRules.maxLength('vatTransactionAmount')"
            hint="Si no aplica, rellenar con 15 ceros"
            label="IVA"
          />

          <v-text-field
            v-model="data.reference"
            :rules="validationRules.maxLength('reference')"
            label="Referencia"
          />

          <v-text-field
            v-model="data.speiSpidReference"
            :rules="validationRules.maxLength('speiSpidReference')"
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

          <v-btn type="submit"> {{ isEditing ? "Guardar" : "Agregar" }} </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useToast } from "vue-toastification";
import type { TxtDetail, DetailRecordKey } from "../../types";
import { FormRules } from "../../helpers";
import {
  AccountTypes,
  Banks,
  CurrencyCodes,
  OperationClasses,
  PaymentMethods,
  TransferLayout,
} from "../../utils";
import { TxtTypeEnum } from "../../enums";

const toast = useToast();
const emits = defineEmits(["addDetail", "editDetail"]);
const props = defineProps<{ detailForEdition?: TxtDetail }>();
const form = ref();
const data = ref<TxtDetail>({
  id: new Date().toString(),
  type: TxtTypeEnum.DETAIL,
  sequencyNumber: 2,
  filler: "000000000",
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
      data.value = { ...newValue };
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
      id: new Date().toString(),
      type: "02",
      sequencyNumber: 2,
      filler: "000000000",
    } as TxtDetail;
  } else {
    toast.warning("El formulario no es válido. Por favor, revisa los campos.");
  }
};

defineExpose({ form });
</script>
