<template>
  <v-form ref="form" validate-on="submit">
    <div class="flex flex-col gap-2 py-1">
      <v-text-field
        v-model="data.type"
        :rules="validationRules.maxLength('recordType')"
        label="tipo de registro"
        disabled
      />
      <v-text-field
        v-model="data.sequencyNumber"
        :rules="validationRules.maxLength('sequenceNumber')"
        label="numero de secuencia"
        disabled
      />
      <v-text-field
        v-model="data.date"
        :rules="[FormRules.required]"
        label="fecha de presentacion"
        type="date"
      />
      <v-text-field
        v-model="data.consecutive"
        :rules="validationRules.maxLength('consecutive')"
        label="Consecutivo"
        disabled
      />
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import type { TxtHeader, HeaderKey } from "@/types";
import { FormRules } from "@/helpers";
import { TransferLayout } from "@/utils";

const props = defineProps<{ modelValue: TxtHeader }>();
const emit = defineEmits(["update:modelValue"]);
const data = ref<TxtHeader>({ ...props.modelValue });
const form = ref();

const validationRules = computed(() => ({
  maxLength: (field: HeaderKey) => [
    FormRules.required,
    FormRules.max_length(TransferLayout.header[field].length || 0),
  ],
}));

watch(data, (newValue) => emit("update:modelValue", newValue), { deep: true });

defineExpose({ form });
</script>
