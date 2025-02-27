import {
  AccountTypeEnum,
  TxtDetailTypeEnum,
  TxtTypeEnum,
  TxtSummaryTypeEnum,
  CurrencyCodeEnum,
  OperationClassEnum,
  PaymentMethodEnum,
  ReceivingBank,
} from "@/enums";
import { Approval, User } from "@/types";

export interface Txt {
  id: string;
  created_at: string;
  description: string;
  userId: string;
  txt_headers: TxtHeader;
  txt_details: TxtDetail[];
  txt_summaries: TxtSummary;
  user_profiles: User;
  approvals?: Approval;
}

interface TxtHeader {
  id: string;
  type: TxtTypeEnum;
  sequenceNumber: string;
  date: string;
  consecutive: string;
}

interface TxtDetail {
  id: string;
  alias: string; // maximo 15 caracteres
  type: TxtDetailTypeEnum;
  sequenceNumber: number;
  emisorAccountType: AccountTypeEnum;
  emisorAccountNumber: string;
  currencyCode: CurrencyCodeEnum;
  receivingBank: ReceivingBank;
  amount: number; // sin punto decimal, los ultimos 2 digitos son los decimales
  aplicationDate: string; // aaaammdd
  paymentMethod: PaymentMethodEnum;
  receiverAccountType: AccountTypeEnum;
  receiverAccountNumber: string;
  filler: string; // 9 ceros
  iva: string; // si no aplica, 15 de longitud
  reference: string;
  speiSpidReference: number;
  operationClass: OperationClassEnum;
  txtId: string;
}

interface TxtSummary {
  id: string;
  type: TxtSummaryTypeEnum;
  sequenceNumber: number;
  totalOperations: number;
  totalOperationsAmount: number;
}

type HeaderKey =
  | "recordType"
  | "sequenceNumber"
  | "submissionDate"
  | "consecutive";

type SummaryKey =
  | "recordType"
  | "sequenceNumber"
  | "numberOfTransactions"
  | "totalTransactionAmount";

type DetailRecordKey =
  | "recordType"
  | "sequenceNumber"
  | "senderAccountType"
  | "senderAccountNumber"
  | "currencyCode"
  | "receivingBank"
  | "transactionAmount"
  | "applicationDate"
  | "paymentMethod"
  | "receiverAccountType"
  | "receiverAccountNumber"
  | "filler"
  | "alias"
  | "vatTransactionAmount"
  | "reference"
  | "speiSpidReference"
  | "transactionClassification";

interface TransferLayoutType {
  header: Record<HeaderKey, any>;
  detailRecord: Record<DetailRecordKey, any>;
  summary: Record<SummaryKey, any>;
}
