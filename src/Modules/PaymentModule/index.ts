import { GenericAbortSignal } from 'axios';
import { createQueryString } from '../../Helper/createQueryString';
import Http from '../../Http';
import {
  ApiResponse,
  ApiResponsePaginate,
  OrderBy,
  PerPage,
} from '../../SupPayClient.type';
import {
  PaymentCreate,
  PaymentCreateSimulate,
  PaymentData,
  PaymentParticipant,
  PaymentParticipantData,
  PaymentSimulateData,
} from './PaymentInterfaces.type';
import { PaymentProofType } from './PaymentTypes.type';

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

/**
 * PaymentModule
 * This class provides functionalities related to payment processing, including creation, retrieval, modification, and simulation of payments.
 * It uses an HTTP client to communicate with payment-related API endpoints.
 *
 * @class
 * @property {Http} http - An instance of Http for making API requests.
 */
export class PaymentModule {
  private http: Http;

  /**
   * Creates an instance of PaymentModule.
   *
   * @constructor
   * @param {Http} http - The HTTP client used for making API requests.
   */
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Creates a new payment.
   *
   * @async
   * @param {PaymentCreate} body - The payment creation data.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentCreateResponse>} A promise that resolves to the payment creation response.
   */
  async create(
    body: PaymentCreate,
    signal?: GenericAbortSignal,
  ): Promise<PaymentCreateResponse> {
    const response = await this.http
      .auth(true)
      .post<PaymentCreateResponse>(`/api/v3/payment/create`, body, { signal });

    return response.data;
  }

  /**
   * Retrieves a paginated list of all payments.
   *
   * @async
   * @param {string} [search] - Optional search query.
   * @param {number} [page=1] - Page number for pagination.
   * @param {OrderBy} [orderBy=OrderBy.DESC] - Order by ascending or descending.
   * @param {PerPage} [perPage=15] - Number of items per page.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentAllResponse>} A promise that resolves to the paginated payment response.
   */
  async all(
    search?: string,
    page: number = 1,
    orderBy: OrderBy = OrderBy.DESC,
    perPage: PerPage = 15,
    signal?: GenericAbortSignal,
  ): Promise<PaymentAllResponse> {
    const query = createQueryString({ search, page, orderBy, perPage });

    const response = await this.http
      .auth(true)
      .get<PaymentAllResponse>(`/api/v3/payment/all?${query}`, { signal });

    return response.data;
  }

  /**
   * Adds a participant to a payment.
   *
   * @async
   * @param {PaymentParticipant} body - The payment participant data.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentParticipantResponse>} A promise that resolves to the payment participant response.
   */
  async participant(
    body: PaymentParticipant,
    signal?: GenericAbortSignal,
  ): Promise<PaymentParticipantResponse> {
    const response = await this.http
      .auth(true)
      .post<PaymentParticipantResponse>(`/api/v3/payment/participant`, body, {
        signal,
      });

    return response.data;
  }

  /**
   * Notifies the authorization of a payment again.
   *
   * @async
   * @param {string} id - The payment ID.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentRenotifyAuthorizationResponse>} A promise that resolves to the renotification response.
   */
  async renotifyAuthorization(
    id: string,
    signal?: GenericAbortSignal,
  ): Promise<PaymentRenotifyAuthorizationResponse> {
    const response = await this.http
      .auth(true)
      .get<PaymentRenotifyAuthorizationResponse>(
        `/api/v3/payment/${id}/authorization/notify`,
        { signal },
      );

    return response.data;
  }

  /**
   * Authorizes a payment with a given code.
   *
   * @async
   * @param {string} id - The payment ID.
   * @param {string} code - The authorization code.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentAuthorizeWithCodeResponse>} A promise that resolves to the payment authorization response.
   */
  async authorizeWithCode(
    id: string,
    code: string,
    signal?: GenericAbortSignal,
  ): Promise<PaymentAuthorizeWithCodeResponse> {
    const response = await this.http
      .auth(true)
      .post<PaymentAuthorizeWithCodeResponse>(
        `/api/v3/payment/${id}/authorization/execute/with-code`,
        {
          code,
        },
        { signal },
      );

    return response.data;
  }

  /**
   * Changes the value of an existing payment.
   *
   * @async
   * @param {string} id - The payment ID.
   * @param {number} value - The new value of the payment.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentChangeValueResponse>} A promise that resolves to the payment change value response.
   */
  async changeValue(
    id: string,
    value: number,
    signal?: GenericAbortSignal,
  ): Promise<PaymentChangeValueResponse> {
    const response = await this.http
      .auth(true)
      .post<PaymentChangeValueResponse>(
        `/api/v3/payment/${id}/update/value`,
        {
          value,
        },
        { signal },
      );

    return response.data;
  }

  /**
   * Cancels a payment.
   *
   * @async
   * @param {string} id - The payment ID.
   * @param {string} reason - The reason for cancellation.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentCancelResponse>} A promise that resolves to the payment cancellation response.
   */
  async cancel(
    id: string,
    reason: string,
    signal?: GenericAbortSignal,
  ): Promise<PaymentCancelResponse> {
    const response = await this.http.auth(true).post<PaymentCancelResponse>(
      `/api/v3/payment/${id}/cancel`,
      {
        reason,
      },
      { signal },
    );

    return response.data;
  }

  /**
   * Simulates a payment.
   *
   * @async
   * @param {PaymentCreateSimulate} body - The payment simulation data.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentSimulateResponse>} A promise that resolves to the payment simulation response.
   */
  async simulate(
    body: PaymentCreateSimulate,
    signal?: GenericAbortSignal,
  ): Promise<PaymentSimulateResponse> {
    const response = await this.http
      .auth(true)
      .post<PaymentSimulateResponse>(`/api/v3/payment/simulate`, body, {
        signal,
      });

    return response.data;
  }

  /**
   * Authorizes a payment by a given code.
   *
   * @async
   * @param {string} code - The authorization code.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<PaymentAuthorizeByCodeResponse>} A promise that resolves to the payment authorization response.
   */
  async authorizeByCode(
    code: string,
    signal?: GenericAbortSignal,
  ): Promise<PaymentAuthorizeByCodeResponse> {
    const response = await this.http
      .auth(true)
      .post<PaymentAuthorizeByCodeResponse>(
        `/api/v3/authorization/execute/with-code`,
        { code },
        { signal },
      );

    return response.data;
  }

  /**
   * Attaches a proof to a payment.
   *
   * @async
   * @param {string} id - The payment ID.
   * @param {PaymentProofType} type - The type of proof to attach.
   * @param {File|string} value - The proof file or key.
   * @param {number} [amount] - The amount, required if the proof type is FILE.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   * @throws {Error} if the required 'amount' attribute is missing for FILE type.
   *
   * @returns {Promise<PaymentAttachProofResponse>} A promise that resolves to the payment attach proof response.
   */
  async attachProof(
    id: string,
    type: PaymentProofType,
    value: File | string,
    amount?: number,
    signal?: GenericAbortSignal,
  ): Promise<PaymentAttachProofResponse> {
    const headers = {
      signal,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('type', type);

    if (PaymentProofType.FILE === type) {
      if (!amount)
        throw new Error('The amount attribute is mandatory for the FILE type');

      formData.append('file', value);
      formData.append('value', amount.toString());
    }

    if (PaymentProofType.INVOICE === type) {
      formData.append('key', value);
    }

    const response = await this.http
      .auth(true)
      .post<PaymentAttachProofResponse>(
        `/api/v3/payment/${id}/proof/attach`,
        formData,
        headers,
      );

    return response.data;
  }
}
