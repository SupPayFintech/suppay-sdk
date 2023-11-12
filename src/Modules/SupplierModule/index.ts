import { createQueryString } from "../../Helper/createQueryString";
import Http from "../../Http";
import {
  ApiResponse,
  ApiResponsePaginate,
  OrderBy,
  PerPage,
} from "../../SupPayClient.type";

import {
  SupplierAvailableData,
  SupplierIndicateCreate,
} from "./SupplierModule.type";

export type SupplierAvailableResponse =
  ApiResponsePaginate<SupplierAvailableData>;

export type SupplierIndicateResponse = ApiResponse;

export class SupplierModule {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  async available(
    search?: string,
    page: number = 1,
    orderBy: OrderBy = OrderBy.DESC,
    perPage: PerPage = 15
  ): Promise<SupplierAvailableResponse> {
    const query = createQueryString({ search, page, orderBy, perPage });

    const response = await this.http.get<SupplierAvailableResponse>(
      `/api/v3/supplier/available?${query}`
    );

    return response.data;
  }

  async indicate(
    body: SupplierIndicateCreate
  ): Promise<SupplierIndicateResponse> {
    const response = await this.http.post<SupplierIndicateResponse>(
      `/api/v3/supplier/indicate`,
      body
    );

    return response.data;
  }
}
