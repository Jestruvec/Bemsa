<template>
  <v-data-table-virtual
    v-model="localSelectedTxtIds"
    :headers="headers"
    :items="data"
    :show-select="isAdmin"
    :search="search"
    filter-mode="some"
    hover
    :filter-keys="headers.map((header: any) => header.key)"
    item-value="id"
    @update:model-value="$emit('onCheckAll', localSelectedTxtIds)"
  >
    <template #item="{ item }">
      <tr class="cursor-pointer" @click="$emit('onRowClick', item)">
        <td v-if="isAdmin">
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

        <td :class="{ hidden: mobile }">
          <div class="flex justify-center items-center gap-4">
            <UserAvatar class="flex-1" :user="item.user_profiles" />
            <span class="flex-1">
              {{
                `${item.user_profiles?.name} ${item.user_profiles?.lastName}`
              }}
            </span>
          </div>
        </td>

        <td :class="{ hidden: mobile }">
          <div class="flex justify-center items-center gap-4">
            <template v-if="item.approvals">
              <UserAvatar class="flex-1" :user="item.approvals.user_profiles" />
              <span class="flex-1">
                {{
                  `${item.approvals.user_profiles.name} ${item.approvals.user_profiles.lastName}`
                }}
              </span>
            </template>

            <template v-else>
              <span>N/A</span>
            </template>
          </div>
        </td>

        <td :class="{ hidden: mobile }">
          <div class="flex justify-center">
            {{ new Date(item.created_at).toLocaleString() }}
          </div>
        </td>

        <td :class="{ hidden: mobile }">
          <div class="flex justify-center">
            <template v-if="item.approvals">
              <span>
                {{ new Date(item.approvals.created_at).toLocaleString() }}
              </span>
            </template>
            <template v-else>
              <span> N/A </span>
            </template>
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
import { ref, watch, computed } from "vue";
import { useDisplay } from "vuetify";
import type { Txt, TxtDetail, TxtHeader } from "@/types";
import { UserAvatar } from "@/components";
import { TransferLayout } from "@/utils";
import { TxtStatusEnum } from "@/enums";

const props = defineProps<{
  data: Txt[];
  selectedTxtIds: string[];
  search: string;
  isAdmin: boolean;
}>();
defineEmits(["onRowClick", "onRowCheck", "onCheckAll"]);

const localSelectedTxtIds = ref<string[]>([]);
const { mobile } = useDisplay();

const headers = computed((): any[] => {
  return mobile.value
    ? [
        { title: "Estado", key: "status", align: "center" },
        { title: "Descripcion", key: "description", align: "center" },
        {},
      ]
    : [
        { title: "Estado", key: "status", align: "center" },
        { title: "Descripcion", key: "description", align: "center" },
        {
          title: "Creado por",
          key: "created_by.name",
          align: "center",
        },
        {
          title: "Revisado por",
          key: "approved_by.name",
          align: "center",
        },
        { title: "Fecha de creacion", key: "created_at", align: "center" },
        { title: "Fecha de revision", key: "approved_at", align: "center" },
        {},
      ];
});

watch(
  () => props.selectedTxtIds,
  () => {
    localSelectedTxtIds.value = props.selectedTxtIds;
  }
);

const getStatusData = (txt: Txt) => {
  if (txt.approvals?.status === TxtStatusEnum.aproved) {
    return { color: "success", text: "Aprobado" };
  } else if (txt.approvals?.status === TxtStatusEnum.rejected) {
    return { color: "error", text: "No aprobado" };
  } else {
    return { color: "warning", text: "Esperando" };
  }
};

const downloadTxt = (txt: Txt) => {
  const txtContent = getTxtContent(txt);
  const blob = new Blob([txtContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "archivo.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const getTxtContent = (txt: Txt) => {
  const content: string[] = [];
  const header = getTxtHeaderContent(txt.txt_headers);
  const details = getTxtDetailsContent(txt.txt_details);
  const summary = getTxtSummaryContent(txt);
  content.push(header);
  details.forEach((detail) => content.push(detail));
  content.push(summary);
  return content.join("\n");
};
const getTxtHeaderContent = (txtHeader: TxtHeader) => {
  const { type, sequenceNumber, date, consecutive } = txtHeader;
  return `${type}${sequenceNumber}${date
    .split("T")[0]
    .split("-")
    .join("")}${consecutive}`;
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
      // iva,
      reference,
      speiSpidReference,
      operationClass,
    } = detail;

    const pad = (value: string | number, length: number, spaces?: boolean) =>
      String(value).padStart(length, spaces ? " " : "0");

    const sequenceNumber = pad(
      index + 2,
      TransferLayout.detailRecord.sequenceNumber.length
    );
    const senderAccountNumber = pad(
      emisorAccountNumber,
      TransferLayout.detailRecord.senderAccountNumber.length
    );
    const transactionAmount = pad(
      String(amount).replace(".", ""),
      TransferLayout.detailRecord.transactionAmount.length
    );
    const applicationDate = aplicationDate.split("T")[0].split("-").join("");
    const receiverAccNumber = pad(
      receiverAccountNumber,
      TransferLayout.detailRecord.receiverAccountNumber.length
    );
    const aliasParsed = pad(
      alias,
      TransferLayout.detailRecord.alias.length,
      true
    );
    const vatTransactionAmount = pad(
      String(0).replace(".", ""),
      TransferLayout.detailRecord.vatTransactionAmount.length
    );
    const parsedReference = pad(
      reference,
      TransferLayout.detailRecord.reference.length,
      true
    );
    const speiSpidRef = pad(
      speiSpidReference ?? "",
      TransferLayout.detailRecord.speiSpidReference.length
    );

    return (
      `${type}${sequenceNumber}${emisorAccountType}${senderAccountNumber}` +
      `${currencyCode}${receivingBank}${transactionAmount}${applicationDate}` +
      `${paymentMethod}${receiverAccountType}${receiverAccNumber}${filler}` +
      `${aliasParsed}${vatTransactionAmount}${parsedReference}${speiSpidRef}${operationClass}`
    );
  });
};
const getTxtSummaryContent = (txt: Txt) => {
  const { txt_details, txt_summaries } = txt;
  const detailsLength = txt_details.length;
  const totalTransactionAmount = txt_details.reduce(
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
    String(totalTransactionAmount).replace(".", ""),
    TransferLayout.summary.totalTransactionAmount.length
  );

  return `${txt_summaries.type}${sequenceNumber}${numberOfTransactions}${totalTransactionAmountParsed}`;
};
const padWithZeros = (str: string, length: number) => {
  return str.padStart(length, "0");
};
</script>
