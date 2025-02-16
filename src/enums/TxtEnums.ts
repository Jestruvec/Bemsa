export enum TxtStatusEnum {
  aproved,
  rejected,
  waiting,
}

export enum TxtTypeEnum {
  HEADER = "01",
  DETAIL = "02",
  SUMMARY = "09",
}

export enum OperationClassEnum {
  settlement_of_securities_operation = "01",
  settlement_of_derivative_operations = "02",
  settlement_of_exchange_operation = "03",
  services_payment = "04",
  payment_of_goods = "05",
  loan_granting = "06",
  loan_payment = "07",
  other = "08",
}

export enum PaymentMethodEnum {
  SPEI = "SPI",
  SPID = "SPD",
  TEF = "TEF",
  BCO = "BCO",
}

export enum CurrencyCodeEnum {
  pesos = "01",
  dolar = "02",
  euro = "03",
}

export enum ReceivingBank {
  ABC_CAPITAL = 40138,
  ACTINVER = 40133,
  AFIRME = 40062,
  ARCUS = 90706,
  ASP_INTEGRA_OPC = 90659,
  AUTOFIN = 40128,
  AZTECA = 40127,
  BABIEN = 37166,
  BAJIO = 40030,
  BANAMEX = 40002,
  BANCO_COVALTO = 40154,
  BANCO_S3 = 40160,
  BANCOMEXT = 37006,
  BANCOPPEL = 40137,
  BANCREA = 40152,
  BANJERCITO = 37019,
  BANK_OF_AMERICA = 40106,
  BANK_OF_CHINA = 40159,
  BANKAOOL = 40147,
  BANOBRAS = 37009,
  BANORTE = 40072,
  BANREGIO = 40058,
  BANSI = 40060,
  BARCLAYS = 40129,
  BBASE = 40145,
  BBVA_MEXICO = 40012,
  BMONEX = 40112,
  CAJA_POP_MEXICA = 90677,
  CAJA_TELEFONIST = 90683,
  CB_INTERCAM = 90630,
  CBM_BANCO = 40124,
  CI_BOLSA = 90631,
  CIBANCO = 40143,
  COMPARTAMOS = 40130,
  CONSUBANCO = 40140,
  CREDICAPITAL = 90652,
  CREDICLUB = 90688,
  CREDIT_SUISSE = 40126,
  CRISTOBAL_COLON = 90680,
  CUENCA = 90723,
  DONDE = 40151,
  FINAMEX = 90616,
  FINCOMUN = 90634,
  FOMPED = 90689,
  FONDEADORA = 90699,
  FONDO_FIRA = 90685,
  GBM = 90601,
  HDI_SEGUROS = 90636,
  HIPOTECARIA_FED = 37168,
  HSBC = 40021,
  ICBC = 40155,
  INBURSA = 40036,
  INDEVAL = 90902,
  INMOBILIARIO = 40150,
  INTERCAM_BANCO = 40136,
  INVERCAP = 90686,
  INVEX = 40059,
  JP_MORGAN = 40110,
  KLAR = 90661,
  KUSPIT = 90653,
  LIBERTAD = 90670,
  MASARI = 90602,
  MERCADO_PAGO_W = 90722,
  MIFEL = 40042,
  MIZUHO_BANK = 40158,
  MONEXCB = 90600,
  MUFG = 40108,
  MULTIVA_BANCO = 40132,
  MULTIVA_CBOLSA = 90613,
  NAFIN = 37135,
  NU_MEXICO = 90638,
  NVIO = 90710,
  OSKNDIA = 90649,
  PAGATODO = 40148,
  PROFUTURO = 90620,
  SABADELL = 40156,
  SANTANDER = 40014,
  SCOTIABANK = 40044,
  SHINHAN = 40157,
  SKANDIA = 90623,
  STP = 90646,
  TACTIV_CB = 90648,
  TESORED = 90703,
  TRANSFER = 90684,
  UNAGRA = 90656,
  VALMEX = 90617,
  VALUE = 90605,
  VE_POR_MAS = 40113,
  VECTOR = 90608,
  VOLKSWAGEN = 40141,
}
