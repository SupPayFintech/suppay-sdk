import { createQueryString } from "../../Helper/createQueryString";
import Http from "../../Http";
import {
  ApiResponse,
  ApiResponsePaginate,
  OrderBy,
  PerPage,
} from "../../SupPayClient.type";
import {
  PaymentCreate,
  PaymentCreateSimulate,
  PaymentData,
  PaymentParticipant,
  PaymentParticipantData,
  PaymentSimulateData,
} from "./PaymentInterfaces.type";
import { PaymentProofType } from "./PaymentTypes.type";

export type PaymentCreateResponse = ApiResponse<PaymentData>;
export type PaymentAllResponse = ApiResponsePaginate<PaymentData>;
export type PaymentParticipantResponse = ApiResponse<PaymentParticipantData>;
export type PaymentRenotifyAuthorizationResponse = ApiResponse;
export type PaymentAuthorizeWithCodeResponse = ApiResponse;
export type PaymentChangeValueResponse = ApiResponse;
export type PaymentCancelResponse = ApiResponse;
export type PaymentSimulateResponse = ApiResponse<PaymentSimulateData>;
export type PaymentAuthorizeByCodeResponse = ApiResponse<PaymentData>;
export type PaymentAttachProofResponse = ApiResponse<PaymentData>;

export class PaymentModule {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  async create(body: PaymentCreate): Promise<PaymentCreateResponse> {
    const response = await this.http.post<PaymentCreateResponse>(
      `/api/v3/payment/create`,
      body
    );

    return response.data;
  }

  async all(
    search?: string,
    page: number = 1,
    orderBy: OrderBy = OrderBy.DESC,
    perPage: PerPage = 15
  ): Promise<PaymentAllResponse> {
    const query = createQueryString({ search, page, orderBy, perPage });

    const response = await this.http.get<PaymentAllResponse>(
      `/api/v3/payment/all?${query}`
    );

    return response.data;
  }

  async participant(
    body: PaymentParticipant
  ): Promise<PaymentParticipantResponse> {
    const response = await this.http.post<PaymentParticipantResponse>(
      `/api/v3/payment/participant`,
      body
    );

    return response.data;
  }

  async renotifyAuthorization(
    id: string
  ): Promise<PaymentRenotifyAuthorizationResponse> {
    const response = await this.http.get<PaymentRenotifyAuthorizationResponse>(
      `/api/v3/payment/${id}/authorization/notify`
    );

    return response.data;
  }

  async authorizeWithCode(
    id: string,
    code: string
  ): Promise<PaymentAuthorizeWithCodeResponse> {
    const response = await this.http.post<PaymentAuthorizeWithCodeResponse>(
      `/api/v3/payment/${id}/authorization/execute/with-code`,
      {
        code,
      }
    );

    return response.data;
  }

  async changeValue(
    id: string,
    value: number
  ): Promise<PaymentChangeValueResponse> {
    const response = await this.http.post<PaymentChangeValueResponse>(
      `/api/v3/payment/${id}/update/value`,
      {
        value,
      }
    );

    return response.data;
  }

  async cancel(id: string, reason: string): Promise<PaymentCancelResponse> {
    const response = await this.http.post<PaymentCancelResponse>(
      `/api/v3/payment/${id}/cancel`,
      {
        reason,
      }
    );

    return response.data;
  }

  async simulate(
    body: PaymentCreateSimulate
  ): Promise<PaymentSimulateResponse> {
    const response = await this.http.post<PaymentSimulateResponse>(
      `/api/v3/payment/simulate`,
      body
    );

    return response.data;
  }

  async authorizeByCode(code: string): Promise<PaymentAuthorizeByCodeResponse> {
    const response = await this.http.post<PaymentAuthorizeByCodeResponse>(
      `/api/v3/authorization/execute/with-code`,
      { code }
    );

    return response.data;
  }

  async attachProof(
    id: string,
    type: PaymentProofType,
    value: File | string,
    amount?: number
  ): Promise<PaymentAttachProofResponse> {
    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("type", type);

    if (PaymentProofType.FILE === type) {
      if (!amount)
        throw new Error("The amount attribute is mandatory for the FILE type");

      formData.append("file", value);
      formData.append("value", amount.toString());
    }

    if (PaymentProofType.INVOICE === type) {
      formData.append("key", value);
    }

    const response = await this.http.post<PaymentAttachProofResponse>(
      `/api/v3/payment/${id}/proof/attach`,
      formData,
      headers
    );

    return response.data;
  }
}
