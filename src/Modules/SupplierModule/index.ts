import { createQueryString } from '../../Helper/createQueryString';
import Http from '../../Http';
import {
  ApiResponse,
  ApiResponsePaginate,
  OrderBy,
  PerPage,
} from '../../SupPayClient.type';

import {
  SupplierAvailableData,
  SupplierIndicateCreate,
} from './SupplierModule.type';

export type SupplierAvailableResponse =
  ApiResponsePaginate<SupplierAvailableData>;

export type SupplierIndicateResponse = ApiResponse;

/**
 * SupplierModule
 * This class provides functionalities related to supplier management, including listing available suppliers and indicating new suppliers.
 * It uses an HTTP client to communicate with supplier-related API endpoints.
 *
 * @class
 * @property {Http} http - An instance of Http for making API requests.
 */
export class SupplierModule {
  private http: Http;

  /**
   * Creates an instance of SupplierModule.
   *
   * @constructor
   * @param {Http} http - The HTTP client used for making API requests.
   */
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Retrieves a paginated list of available suppliers.
   *
   * @async
   * @param {string} [search] - Optional search query.
   * @param {number} [page=1] - Page number for pagination.
   * @param {OrderBy} [orderBy=OrderBy.DESC] - Order by ascending or descending.
   * @param {PerPage} [perPage=15] - Number of items per page.
   * @returns {Promise<SupplierAvailableResponse>} A promise that resolves to the paginated supplier available response.
   */
  async available(
    search?: string,
    page: number = 1,
    orderBy: OrderBy = OrderBy.DESC,
    perPage: PerPage = 15,
  ): Promise<SupplierAvailableResponse> {
    const query = createQueryString({ search, page, orderBy, perPage });

    const response = await this.http.get<SupplierAvailableResponse>(
      `/api/v3/supplier/available?${query}`,
    );

    return response.data;
  }

  /**
   * Indicates a new supplier.
   *
   * @async
   * @param {SupplierIndicateCreate} body - The supplier indication data.
   * @returns {Promise<SupplierIndicateResponse>} A promise that resolves to the supplier indicate response.
   */
  async indicate(
    body: SupplierIndicateCreate,
  ): Promise<SupplierIndicateResponse> {
    const response = await this.http.post<SupplierIndicateResponse>(
      `/api/v3/supplier/indicate`,
      body,
    );

    return response.data;
  }
}
