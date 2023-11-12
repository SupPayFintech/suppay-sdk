export interface CommercialEstablishment {
  id: string;
  name: string;
  document: string;
}

export interface Supplier {
  id: string;
  name: string;
  document: string;
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
