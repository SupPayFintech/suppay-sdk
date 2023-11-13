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
   * @returns {Promise<DocumentAvailableResponse>} - The response indicating if the document is available.
   */
  async documentAvailable(
    document: string,
  ): Promise<DocumentAvailableResponse> {
    const response = await this.http.get<DocumentAvailableResponse>(
      `/api/v3/register/verification/document/verify/${document}`,
    );

    return response.data;
  }

  /**
   * Sends a mobile verification code to a given phone number.
   *
   * @async
   * @param {string} phone - The phone number to send the verification code to.
   * @returns {Promise<SendMobileCodeResponse>} - The response after sending the mobile code.
   */
  async sendMobileCode(phone: string): Promise<SendMobileCodeResponse> {
    const response = await this.http.get<SendMobileCodeResponse>(
      `/api/v3/register/verification/phone/send/${phone}`,
    );

    return response.data;
  }

  /**
   * Verifies the mobile code sent to a phone number.
   *
   * @async
   * @param {string} phone - The phone number to verify.
   * @param {string} code - The verification code sent to the phone.
   * @returns {Promise<VerifyMobileCodeResponse>} - The response after verifying the mobile code.
   */
  async verifyMobileCode(
    phone: string,
    code: string,
  ): Promise<VerifyMobileCodeResponse> {
    const response = await this.http.get<VerifyMobileCodeResponse>(
      `/api/v3/register/verification/phone/verify/${phone}/${code}`,
    );

    return response.data;
  }

  /**
   * Attaches a picture to a document type.
   *
   * @async
   * @param {RegisterDocumentType} type - The type of document.
   * @param {File} file - The picture file to attach.
   * @returns {Promise<AttachPictureResponse>} - The response after attaching the picture.
   */
  async attachPicture(
    type: RegisterDocumentType,
    file: File,
  ): Promise<AttachPictureResponse> {
    const headers = {
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
   * @returns {Promise<CreateResponse>} - The response after creating the register.
   */
  async create(body: CreateRegisterData): Promise<CreateResponse> {
    const response = await this.http.post<CreateResponse>(
      `/api/v3/register/commercial-establishment`,
      body,
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
   * @returns {Promise<RegisterAllResponse>} - The paginated response of all registers.
   */
  async all(
    search?: string,
    page: number = 1,
    orderBy: OrderBy = OrderBy.DESC,
    perPage: PerPage = 15,
  ): Promise<RegisterAllResponse> {
    const query = createQueryString({ search, page, orderBy, perPage });

    const response = await this.http
      .auth(true)
      .get<RegisterAllResponse>(`/api/v3/register/all?${query}`);

    return response.data;
  }

  /**
   * Retrieves the resume of a specific register by its ID.
   *
   * @async
   * @param {string} id - The ID of the register.
   * @returns {Promise<RegisterResumeResponse>} - The response containing the register's resume.
   */
  async resume(id: string): Promise<RegisterResumeResponse> {
    const response = await this.http
      .auth(true)
      .get<RegisterResumeResponse>(`/api/v3/register/${id}/resume`);

    return response.data;
  }

  /**
   * Approves a register for a commercial establishment.
   *
   * @async
   * @param {string} id - The ID of the register to approve.
   * @param {ApproveRegisterData} body - The data required to approve the register.
   * @returns {Promise<RegisterApproveResponse>} - The response after approving the register.
   */
  async approve(
    id: string,
    body: ApproveRegisterData,
  ): Promise<RegisterApproveResponse> {
    const response = await this.http
      .auth(true)
      .post<RegisterApproveResponse>(
        `/api/v3/register/commercial-establishment/${id}/approve`,
        body,
      );

    return response.data;
  }
}
