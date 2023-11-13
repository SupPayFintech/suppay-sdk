import { PaymentProofLabel, PaymentProofType } from './PaymentTypes.type';

type PaymentProofTypeToLabel = {
  [PaymentProofType.INVOICE]: PaymentProofLabel.INVOICE;
  [PaymentProofType.FILE]: PaymentProofLabel.FILE;
};

export interface PaymentProof<T extends PaymentProofType> {
  type: T;
  type_label: PaymentProofTypeToLabel[T];
  value: number;
  subtract: boolean;
  adjust?: null | boolean;
  content: {
    key: string;
  };
  created_at: string;
}

export type InvoicePaymentProof = PaymentProof<PaymentProofType.INVOICE>;
export type FilePaymentProof = PaymentProof<PaymentProofType.FILE>;
