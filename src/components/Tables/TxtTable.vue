<template>
  <v-data-table-virtual
    v-model="localSelectedTxtIds"
    :headers="headers"
    :items="data"
    show-select
    :search="search"
    filter-mode="some"
    :filter-keys="headers.map((header: any) => header.key)"
    item-value="id"
    @update:model-value="$emit('onCheckAll', localSelectedTxtIds)"
  >
    <template #item="{ item }">
      <tr
        class="hover:bg-gray-100 cursor-pointer"
        @click="$emit('onRowClick', item)"
      >
        <td>
          <v-checkbox
            v-model="localSelectedTxtIds"
            :value="item.id"
            @click.stop
            @update:model-value="$emit('onRowCheck', localSelectedTxtIds)"
          />
        </td>

        <td>
          <div class="flex justify-center">
            <v-chip :color="getStatusData(item).color">
              {{ getStatusData(item).text }}
            </v-chip>
          </div>
        </td>

        <td>
          <div class="flex justify-center">
            {{ item.description }}
          </div>
        </td>

        <td>
          <div class="flex justify-center items-center gap-4">
            <UserAvatar class="flex-1" :user="item.created_by" />
            <span class="flex-1">
              {{ `${item.created_by.name} ${item.created_by.lastName}` }}
            </span>
          </div>
        </td>

        <td>
          <div class="flex justify-center items-center gap-4">
            <template v-if="item.approved_by">
              <UserAvatar class="flex-1" :user="item.approved_by" />
              <span class="flex-1">
                {{ `${item.approved_by.name} ${item.approved_by.lastName}` }}
              </span>
            </template>

            <template v-else>
              <span>N/A</span>
            </template>
          </div>
        </td>

        <td>
          <div class="flex justify-center">
            {{ item.created_at }}
          </div>
        </td>

        <td>
          <div class="flex justify-center">
            <span>
              {{ item.approved_at || "N/A" }}
            </span>
          </div>
        </td>

        <td>
          <v-tooltip text="Descargar Txt" location="top" offset="5">
            <template #activator="{ props }">
              <v-icon
                v-bind="props"
                class="hover:opacity-50"
                icon="mdi-download"
                @click="downloadTxt(item)"
                @click.stop
              />
            </template>
          </v-tooltip>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { UserAvatar } from "..";
import { TxtStatusEnum } from "../../enums";
import type { Txt, TxtDetail, TxtHeader } from "../../types";
import { TransferLayout } from "../../utils";

const props = defineProps<{
  data: Txt[];
  selectedTxtIds: string[];
  search: string;
}>();
defineEmits(["onRowClick", "onRowCheck", "onCheckAll"]);

const localSelectedTxtIds = ref<string[]>([]);
const headers: any = [
  { title: "Estado", key: "status", align: "center" },
  { title: "Descripcion", key: "description", align: "center" },
  { title: "Creado por", key: "created_by.name", align: "center" },
  { title: "Revisado por", key: "approved_by.name", align: "center" },
  { title: "Fecha de creacion", key: "date", align: "center" },
  { title: "Fecha de revision", key: "approved_at", align: "center" },
  {},
];

watch(
  () => props.selectedTxtIds,
  () => {
    localSelectedTxtIds.value = props.selectedTxtIds;
  }
);

const getStatusData = (txt: Txt) => {
  switch (txt.status) {
    case TxtStatusEnum.aproved:
      return { color: "success", text: "Aprobado" };
    case TxtStatusEnum.rejected:
      return { color: "error", text: "No aprobado" };
    default:
      return { color: "warning", text: "Esperando aprobacion" };
  }
};

const downloadTxt = (txt: Txt) => {
  // 1️⃣ Crear contenido del archivo
  const txtContent = getTxtContent(txt);

  // 2️⃣ Crear un Blob con el contenido
  const blob = new Blob([txtContent], { type: "text/plain" });

  // 3️⃣ Crear una URL para el Blob
  const url = URL.createObjectURL(blob);

  // 4️⃣ Crear un enlace temporal para descargarlo
  const link = document.createElement("a");
  link.href = url;
  link.download = "archivo.txt";

  // 5️⃣ Agregar el enlace al DOM, hacer clic y removerlo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 6️⃣ Liberar memoria eliminando la URL
  URL.revokeObjectURL(url);
};

const getTxtContent = (txt: Txt) => {
  const content: string[] = [];

  const header = getTxtHeaderContent(txt.header);
  const details = getTxtDetailsContent(txt.details);
  const summary = getTxtSummaryContent(txt);

  content.push(header);
  details.forEach((detail) => content.push(detail));
  content.push(summary);

  return content.join("\n"); // 🔹 Une los elementos con saltos de línea
};

const getTxtHeaderContent = (txtHeader: TxtHeader) => {
  const { type, sequencyNumber, date, consecutive } = txtHeader;
  const header = `${type}${sequencyNumber}${date
    .split("-")
    .join("")}${consecutive}`;

  return header;
};

const getTxtDetailsContent = (txtDetails: TxtDetail[]) => {
  return txtDetails.map((detail, index) => {
    const {
      type,
      emisorAccountType,
      emisorAccountNumber,
      currencyCode,
      receivingBank,
      amount,
      aplicationDate,
      paymentMethod,
      receiverAccountType,
      receiverAccountNumber,
      filler,
      alias,
      iva,
      reference,
      speiSpidReference,
      operationClass,
    } = detail;

    // Función auxiliar para simplificar el padding
    const pad = (value: string | number, length: number) =>
      padWithZeros(String(value), length);

    const sequenceNumber = pad(
      index + 2,
      TransferLayout.detailRecord.sequenceNumber.length
    );
    const senderAccountNumber = pad(
      emisorAccountNumber,
      TransferLayout.detailRecord.senderAccountNumber.length
    );
    const transactionAmount = pad(
      amount,
      TransferLayout.detailRecord.transactionAmount.length
    );
    const applicationDate = aplicationDate.split("-").join("");
    const receiverAccNumber = pad(
      receiverAccountNumber,
      TransferLayout.detailRecord.receiverAccountNumber.length
    );
    const aliasParsed = pad(alias, TransferLayout.detailRecord.alias.length);
    const vatTransactionAmount = pad(
      iva,
      TransferLayout.detailRecord.vatTransactionAmount.length
    );
    const speiSpidRef = pad(
      speiSpidReference,
      TransferLayout.detailRecord.speiSpidReference.length
    );

    return (
      `${type}${sequenceNumber}${emisorAccountType}${senderAccountNumber}` +
      `${currencyCode}${receivingBank}${transactionAmount}${applicationDate}` +
      `${paymentMethod}${receiverAccountType}${receiverAccNumber}${filler}` +
      `${aliasParsed}${vatTransactionAmount}${reference}${speiSpidRef}${operationClass}`
    );
  });
};

const getTxtSummaryContent = (txt: Txt) => {
  const { details, summary } = txt;
  const detailsLength = details.length;
  const totalTransactionAmount = details.reduce(
    (acc, detail) => acc + detail.amount,
    0
  );

  const sequenceNumber = padWithZeros(
    String(detailsLength + 2),
    TransferLayout.summary.sequenceNumber.length
  );
  const numberOfTransactions = padWithZeros(
    String(detailsLength),
    TransferLayout.summary.numberOfTransactions.length
  );
  const totalTransactionAmountParsed = padWithZeros(
    String(totalTransactionAmount),
    TransferLayout.summary.totalTransactionAmount.length
  );

  return `${summary.type}${sequenceNumber}${numberOfTransactions}${totalTransactionAmountParsed}`;
};

const padWithZeros = (str: string, length: number) => {
  return str.padStart(length, "0");
};
</script>
