<template>
  <v-form ref="form" validate-on="submit">
    <div class="flex flex-col gap-2 py-1">
      <v-text-field
        v-model="data.type"
        :rules="validationRules.maxLength('recordType')"
        label="Tipo"
        disabled
      />
      <v-text-field
        v-model="data.sequencyNumber"
        :rules="validationRules.maxLength('sequenceNumber')"
        label="Numero de secuencia"
        type="number"
      />
      <v-text-field
        v-model="data.numberOfOperations"
        :rules="validationRules.maxLength('numberOfTransactions')"
        label="Numero de operaciones"
        type="number"
      />
      <v-text-field
        v-model="data.totalOperationsAmount"
        :rules="validationRules.maxLength('totalTransactionAmount')"
        label="Monto total de las operaciones"
        type="number"
      />
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import type { TxtSummary, SummaryKey } from "../../types";
import { FormRules } from "../../helpers";
import { TransferLayout } from "../../utils";

const props = defineProps<{ modelValue: TxtSummary }>();
const emit = defineEmits(["update:modelValue"]);
const form = ref();
const data = ref<TxtSummary>({ ...props.modelValue });

const validationRules = computed(() => ({
  maxLength: (field: SummaryKey) => [
    FormRules.required,
    FormRules.max_length(TransferLayout.summary[field].length || 0),
  ],
}));

watch(data, (newValue) => emit("update:modelValue", newValue), {
  deep: true,
});

defineExpose({ form });
</script>
