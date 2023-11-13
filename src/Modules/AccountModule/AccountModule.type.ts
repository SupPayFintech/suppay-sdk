import {
  CommercialEstablishment,
  Supplier,
} from '../AuthenticationModule/AuthenticationModule.type';

export interface RecoveryVerifyData {
  phone: string;
  document: string;
}

export interface RecoveryValidationData {
  identifier: string;
}

export interface UserContextData {
  name: string;
  email: string;
  phone: string;
  role: string;
  role_label: string;
  status: string;
  commercial_establishments: CommercialEstablishment[];
  suppliers: Supplier[];
}
