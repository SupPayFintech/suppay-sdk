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
  ApproveRegisterData,
  AttachPictureData,
  CreateRegisterData,
  DocumentAvailableData,
  RegisterAllData,
  RegisterDocumentType,
  VerifyMobileCodeData,
} from './RegisterModule.type';
import {
  approveRegisterDataSchema,
  createRegisterDataSchema,
} from './RegisterModule.validator';

export type DocumentAvailableResponse = ApiResponse<DocumentAvailableData>;
export type SendMobileCodeResponse = ApiResponse;
export type VerifyMobileCodeResponse = ApiResponse<VerifyMobileCodeData>;
export type AttachPictureResponse = ApiResponse<AttachPictureData>;
export type CreateResponse = ApiResponse;
export type RegisterAllResponse = ApiResponsePaginate<RegisterAllData>;
export type RegisterResumeResponse = ApiResponse<RegisterAllData>;
export type RegisterApproveResponse = ApiResponse<RegisterAllData>;

/**
 * RegisterModule Class
 *
 * This class is responsible for handling various operations related to the registration of commercial establishments.
 */
export class RegisterModule {
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
   * Checks if a document is available.
   *
   * @async
   * @param {string} document - The document number to check.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<DocumentAvailableResponse>} - The response indicating if the document is available.
   */
  async documentAvailable(
    document: string,
    signal?: GenericAbortSignal,
  ): Promise<DocumentAvailableResponse> {
    const response = await this.http.get<DocumentAvailableResponse>(
      `/api/v3/register/verification/document/verify/${document}`,
      { signal },
    );

    return response.data;
  }

  /**
   * Sends a mobile verification code to a given phone number.
   *
   * @async
   * @param {string} phone - The phone number to send the verification code to.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<SendMobileCodeResponse>} - The response after sending the mobile code.
   */
  async sendMobileCode(
    phone: string,
    signal?: GenericAbortSignal,
  ): Promise<SendMobileCodeResponse> {
    const response = await this.http.get<SendMobileCodeResponse>(
      `/api/v3/register/verification/phone/send/${phone}`,
      { signal },
    );

    return response.data;
  }

  /**
   * Verifies the mobile code sent to a phone number.
   *
   * @async
   * @param {string} phone - The phone number to verify.
   * @param {string} code - The verification code sent to the phone.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<VerifyMobileCodeResponse>} - The response after verifying the mobile code.
   */
  async verifyMobileCode(
    phone: string,
    code: string,
    signal?: GenericAbortSignal,
  ): Promise<VerifyMobileCodeResponse> {
    const response = await this.http.get<VerifyMobileCodeResponse>(
      `/api/v3/register/verification/phone/verify/${phone}/${code}`,
      { signal },
    );

    return response.data;
  }

  /**
   * Attaches a picture to a document type.
   *
   * @async
   * @param {RegisterDocumentType} type - The type of document.
   * @param {File} file - The picture file to attach.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<AttachPictureResponse>} - The response after attaching the picture.
   */
  async attachPicture(
    type: RegisterDocumentType,
    file: File,
    signal?: GenericAbortSignal,
  ): Promise<AttachPictureResponse> {
    const headers = {
      signal,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const response = await this.http.post<AttachPictureResponse>(
      `/api/v3/register/verification/files/attach`,
      formData,
      headers,
    );

    return response.data;
  }

  /**
   * Creates a new register for a commercial establishment.
   *
   * @async
   * @param {CreateRegisterData} body - The data for creating the register.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<CreateResponse>} - The response after creating the register.
   */
  async create(
    body: CreateRegisterData,
    signal?: GenericAbortSignal,
  ): Promise<CreateResponse> {
    const response = await this.http.post<CreateResponse>(
      `/api/v3/register/commercial-establishment`,
      body,
      { signal },
      createRegisterDataSchema,
    );

    return response.data;
  }

  /**
   * Retrieves all registers with optional filters.
   *
   * @async
   * @param {string} [search] - Optional search query.
   * @param {number} [page=1] - The page number for pagination.
   * @param {OrderBy} [orderBy=OrderBy.DESC] - The order by which to sort the results.
   * @param {PerPage} [perPage=15] - The number of items per page.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<RegisterAllResponse>} - The paginated response of all registers.
   */
  async all(
    search?: string,
    page: number = 1,
    orderBy: OrderBy = OrderBy.DESC,
    perPage: PerPage = 15,
    signal?: GenericAbortSignal,
  ): Promise<RegisterAllResponse> {
    const query = createQueryString({ search, page, orderBy, perPage });

    const response = await this.http
      .auth(true)
      .get<RegisterAllResponse>(`/api/v3/register/all?${query}`, { signal });

    return response.data;
  }

  /**
   * Retrieves the resume of a specific register by its ID.
   *
   * @async
   * @param {string} id - The ID of the register.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<RegisterResumeResponse>} - The response containing the register's resume.
   */
  async resume(
    id: string,
    signal?: GenericAbortSignal,
  ): Promise<RegisterResumeResponse> {
    const response = await this.http
      .auth(true)
      .get<RegisterResumeResponse>(`/api/v3/register/${id}/resume`, { signal });

    return response.data;
  }

  /**
   * Approves a register for a commercial establishment.
   *
   * @async
   * @param {string} id - The ID of the register to approve.
   * @param {ApproveRegisterData} body - The data required to approve the register.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   *
   * @returns {Promise<RegisterApproveResponse>} - The response after approving the register.
   */
  async approve(
    id: string,
    body: ApproveRegisterData,
    signal?: GenericAbortSignal,
  ): Promise<RegisterApproveResponse> {
    const response = await this.http
      .auth(true)
      .post<RegisterApproveResponse>(
        `/api/v3/register/commercial-establishment/${id}/approve`,
        body,
        { signal },
        approveRegisterDataSchema,
      );

    return response.data;
  }
}
