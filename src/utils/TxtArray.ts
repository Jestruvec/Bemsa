import { ref } from "vue";
import {
  AccountTypeEnum,
  CurrencyCodeEnum,
  OperationClassEnum,
  PaymentMethodEnum,
  ReceivingBank,
  TxtStatusEnum,
  TxtTypeEnum,
} from "../enums";
import type { Txt } from "../types";
import { Users } from "./";

export const TxtArray = ref<Txt[]>([
  {
    id: new Date().toString(),
    approved_at: null,
    created_at: "2025-02-12",
    description: `Test 1`,
    status: TxtStatusEnum.waiting,
    approved_by: null,
    created_by: Users[2],
    header: {
      id: new Date().toString(),
      type: TxtTypeEnum.HEADER,
      consecutive: "000",
      date: "2025-02-20",
      sequencyNumber: "0000001",
    },
    details: Array.from({ length: 10 }, (_, detailIndex) => ({
      id: new Date().toString(),
      type: TxtTypeEnum.DETAIL,
      sequencyNumber: detailIndex + 1,
      alias: `Prueba ${detailIndex + 1}`,
      amount: 1000,
      currencyCode: CurrencyCodeEnum.pesos,
      emisorAccountType: AccountTypeEnum.clabeAccount,
      receiverAccountType: AccountTypeEnum.clabeAccount,
      emisorAccountNumber: 1234,
      receiverAccountNumber: 5678,
      iva: "000000000000000",
      filler: "000000000",
      aplicationDate: "2025-02-28",
      operationClass: OperationClassEnum.other,
      paymentMethod: PaymentMethodEnum.SPEI,
      receivingBank: ReceivingBank.BANAMEX,
      reference: "reference",
      speiSpidReference: 1234,
    })),
    summary: {
      id: new Date().toString(),
      type: TxtTypeEnum.SUMMARY,
      numberOfOperations: 10,
      totalOperationsAmount: 10000,
      sequencyNumber: 1,
    },
  },
]);
