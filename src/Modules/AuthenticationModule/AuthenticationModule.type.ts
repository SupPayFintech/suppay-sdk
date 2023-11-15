export interface CommercialEstablishment {
  id: string;
  name: string;
  document: string;
}

export interface SupplierSetting {
  fee_split_enabled: boolean;
  custom_balance_period_enabled: boolean;
  max_balance_period: number;
  custom_fee_enabled: boolean;
  calendar_limit: number;
}

export interface Supplier {
  id: string;
  name: string;
  document: string;
  settings: SupplierSetting;
}

export interface LoginData {
  name: string;
  document: string;
  email: string;
  phone: string;
  role: string;
  permissions: string[];
  token: string;
  token_expires_at: string;
  commercial_establishments: CommercialEstablishment[];
  suppliers: Supplier[];
}
