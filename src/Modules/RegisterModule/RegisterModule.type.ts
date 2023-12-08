export interface DocumentAvailableData {
  available: boolean;
}

export interface VerifyMobileCodeData {
  identifier: string;
}

export interface AttachPictureData {
  identifier: string;
}

export enum RegisterDocumentType {
  CNH = 'cnh',
  RNE = 'rne',
  RG = 'rg',
  OTHER = 'other',
}

export enum RegisterDocumentAttachType {
  DOCUMENT_FRONT = 'document_front',
  DOCUMENT_BACK = 'document_back',
  SELFIE = 'selfie',
}

export interface CreateRegisterData {
  document: string;
  phone: string;
  password: string;
  password_confirmation: string;
  documents: {
    document_type: RegisterDocumentType;
    document_front: string;
    document_back: string;
    selfie: string;
  };
}

export interface RegisterAllData {
  id: string;
  role: string;
  role_label: string;
  status: string;
  status_label: string;
  payload: {
    phone: string;
    document: string;
    documents: {
      document_type: RegisterDocumentType;
      document_front_url: string;
      document_back_url: string;
      selfie_url: string;
      complement_url?: string;
    };
  };
  user: {
    name: string;
    document: string;
  };
  instance: {
    name: string;
    document: string;
  };
  created_at: string;
}

export interface ApproveRegisterData {
  user: { document: string; name: string };
  instance: { document: string; name: string };
  submittedDocumentsAreReliable: boolean;
  informationMatchesTheDocumentsSent: boolean;
}
