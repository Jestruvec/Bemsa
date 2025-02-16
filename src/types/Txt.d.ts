import {
  TxtStatusEnum,
  AccountTypeEnum,
  TxtDetailTypeEnum,
  TxtTypeEnum,
  TxtSummaryTypeEnum,
  CurrencyCodeEnum,
  OperationClassEnum,
  PaymentMethodEnum,
  ReceivingBank,
} from "../enums";
import type { User } from "./";

export interface Txt {
  id: string;
  description: string;
  status: TxtStatusEnum;
  created_at: string;
  approved_at: string | null;
  header: TxtHeader;
  details: TxtDetail[];
  summary: TxtSummary;
  created_by: User;
  approved_by: User | null;
}

interface TxtHeader {
  id: string;
  type: TxtTypeEnum;
  sequencyNumber: string;
  date: string; // Mantengo string si el backend lo espera en AAAAMMDD
  consecutive: string; // Se mantiene como string para formateo
}

interface TxtDetail {
  id: string;
  alias: string; // maximo 15 caracteres
  type: TxtDetailTypeEnum;
  sequencyNumber: number;
  emisorAccountType: AccountTypeEnum;
  emisorAccountNumber: number;
  currencyCode: CurrencyCodeEnum;
  receivingBank: ReceivingBank;
  amount: number; // sin punto decimal, los ultimos 2 digitos son los decimales
  aplicationDate: string; // aaaammdd
  paymentMethod: PaymentMethodEnum;
  receiverAccountType: AccountTypeEnum;
  receiverAccountNumber: number;
  filler: string; // 9 ceros
  iva: string; // si no aplica, 15 de longitud
  reference: string;
  speiSpidReference: number;
  operationClass: OperationClassEnum;
}

interface TxtSummary {
  id: string;
  type: TxtSummaryTypeEnum;
  sequencyNumber: number;
  numberOfOperations: number;
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
