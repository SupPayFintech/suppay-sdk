import { SupplierSetting } from '../AuthenticationModule/AuthenticationModule.type';
import {
  FilePaymentProof,
  InvoicePaymentProof,
} from './PaymentProofTypes.type';
import { PaymentStatus, PaymentType } from './PaymentTypes.type';

export interface PaymentCreate {
  type: PaymentType;
  identifier: string;
  installments: [
    {
      identifier: string;
      due_date: string;
      value: number;
    },
  ];
  supplier_document: string;
  commercial_establishment_document: string;
  balance_period?: number;
  fee?: number;
  fee_split?: number;
}

export interface PaymentCreateSimulateInstallment {
  identifier: string;
  due_date: string;
  value: number;
}

export interface PaymentCreateSimulate {
  type: PaymentType;
  identifier: string;
  installments: PaymentCreateSimulateInstallment[];
  supplier_document: string;
  commercial_establishment_document: string;
  balance_period?: number;
  fee?: number;
}

export interface PaymentParticipant {
  supplier_document?: string;
  commercial_establishment_document?: string;
}

export interface PaymentStatusHistory {
  status: string;
  createdAt: string;
}

export interface PaymentInstallment {
  value: number;
  due_date: string;
  identifier: string;
}

export interface PaymentExpectedSettlements {
  date: string;
  acquirer: string;
  arrangement_code: string;
  amount: number;
  type: string;
  paid: boolean;
}

export type PaymentDataProof = (InvoicePaymentProof | FilePaymentProof)[];

export interface PaymentDataCommercialEstablishment {
  name: string;
  document: string;
}

export interface PaymentDataSupplier {
  name: string;
  document: string;
}

export interface PaymentData {
  id: string;
  identifier: string;
  installments: PaymentInstallment[];
  expected_settlements: PaymentExpectedSettlements[];
  total: number;
  subtotal: number;
  fee: number;
  fee_split: number;
  prevention_increase: number;
  proven_amount: number;
  status: PaymentStatus;
  status_label: string;
  type: PaymentType;
  type_label: string;
  commercial_establishment: PaymentDataCommercialEstablishment;
  supplier: PaymentDataSupplier;
  proofs: PaymentDataProof;
  can_operate: boolean;
  created_at: string;
  status_history: PaymentStatusHistory[];
}

export interface PaymentParticipantData {
  name: string;
  document: string;
  status: boolean;
  settings?: SupplierSetting;
}

export interface PaymentSimulateInstallmentData {
  total: number;
  fee: number;
  fee_split: number;
  prevention_increase: number;
  subtotal: number;
  value: number;
  due_date: string;
}

export interface PaymentSimulateData {
  installments: PaymentSimulateInstallmentData[];
  total: number;
  subtotal: number;
  fee: number;
  fee_split: number;
  prevention_increase: number;
  type: PaymentType;
  commercial_establishment: PaymentDataCommercialEstablishment;
  supplier: PaymentDataSupplier;
}
