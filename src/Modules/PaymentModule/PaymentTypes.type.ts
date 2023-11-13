export enum PaymentType {
  SINGLE = "single",
  ORDER = "order",
  INVOICE = "invoice",
}

export enum PaymentStatus {
  AWAITING_AUTHORIZATION = "awaiting-authorization",
  PROCESSING = "processing",
  OPERATION_UNDER_REVIEW = "operation-under-review",
  DECLINING_FOR_INSUFFICIENT_BALANCE = "declining-for-insufficient-balance",
  DECLINED_FOR_INSUFFICIENT_BALANCE = "declined-for-insufficient-balance",
  SPLITTING = "splitting",
  AWAITING_PROOF = "awaiting-proof",
  AWAITING_SETTLEMENT = "awaiting-settlement",
  UPDATING_VALUE = "updating-value",
  AWAITING_CONTESTATION_RESULT = "awaiting-contestation-result",
  COMPLETED = "completed",
  CANCELING = "canceling",
  CANCELED = "canceled",
}

export enum PaymentProofType {
  INVOICE = "invoice",
  FILE = "file",
}

export enum PaymentProofLabel {
  FILE = "Arquivo",
  INVOICE = "Nota fiscal",
}
