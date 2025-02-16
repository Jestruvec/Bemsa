import { TxtTypeEnum } from "../enums";
import type { TransferLayoutType } from "../types";

export const TransferLayout: TransferLayoutType = {
  header: {
    recordType: { value: TxtTypeEnum.HEADER, type: "numeric", length: 2 },
    sequenceNumber: { value: "0000001", type: "numeric", length: 7 },
    submissionDate: { value: "", type: "numeric", length: 8 }, // YYYYMMDD
    consecutive: { value: "000", type: "numeric", length: 3 },
  },
  detailRecord: {
    recordType: { value: TxtTypeEnum.DETAIL, type: "numeric", length: 2 },
    sequenceNumber: { value: "", type: "numeric", length: 7 }, // Variable
    senderAccountType: { value: "", type: "numeric", length: 2 }, // 01, 40, 03
    senderAccountNumber: { value: "", type: "numeric", length: 20 },
    currencyCode: { value: "", type: "numeric", length: 2 }, // 01, 02, 03
    receivingBank: { value: "", type: "numeric", length: 5 },
    transactionAmount: { value: "", type: "numeric", length: 15 },
    applicationDate: { value: "", type: "numeric", length: 8 }, // YYYYMMDD
    paymentMethod: { value: "", type: "alphabetic", length: 3 }, // TEF/BCO/SPI/SPD
    receiverAccountType: { value: "", type: "numeric", length: 2 }, // 01, 40, 03
    receiverAccountNumber: { value: "", type: "numeric", length: 20 },
    filler: { value: "000000000", type: "numeric", length: 9 },
    alias: { value: "", type: "alphanumeric", length: 15 },
    vatTransactionAmount: { value: "", type: "numeric", length: 15 }, // If not applicable, 15 zeros
    reference: { value: "", type: "alphanumeric", length: 250 },
    speiSpidReference: { value: "", type: "numeric", length: 7 },
    transactionClassification: { value: "", type: "numeric", length: 2 }, // 01-08
  },
  summary: {
    recordType: { value: TxtTypeEnum.SUMMARY, type: "numeric", length: 2 },
    sequenceNumber: { value: "", type: "numeric", length: 7 },
    numberOfTransactions: { value: "", type: "numeric", length: 7 },
    totalTransactionAmount: { value: "", type: "numeric", length: 18 },
  },
};
