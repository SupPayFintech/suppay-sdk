export interface SupplierAvailableData {
  id: string;
  name: string;
  document: string;
  address: {
    city: string;
    state: string;
  };
}

export interface SupplierIndicateCreate {
  requester: {
    name: string;
    phone: string;
    email: string;
  };
  indicated: {
    name: string;
    document: string;
  };
  message: string;
}
