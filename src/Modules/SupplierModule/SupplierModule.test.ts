import { SupplierModule } from "./index";
import Http from "../../Http";
import { createMockAxiosResponse } from "../../jest-helper";

import { avaliableData } from "./fixtures/response-avaliable";

import { OrderBy } from "../../SupPayClient.type";
import { SupplierIndicateCreate } from "./SupplierModule.type";

jest.mock("../../Http");

describe("SupplierModule", () => {
  let httpMock: jest.Mocked<Http>;
  let authModule: SupplierModule;

  beforeEach(() => {
    httpMock = new Http() as jest.Mocked<Http>;
    authModule = new SupplierModule(httpMock);
  });

  it("Should return the available suppliers", async () => {
    const search = "example";
    const page = 1;
    const orderBy = OrderBy.DESC;
    const perPage = 15;

    const mockResponse = createMockAxiosResponse(avaliableData);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await authModule.available(search, page, orderBy, perPage);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/supplier/available?search=${search}&page=${page}&orderBy=${orderBy}&perPage=${perPage}`
    );

    expect(result).toEqual(avaliableData);
  });

  it("Should call the supplier indication API", async () => {
    const body: SupplierIndicateCreate = {
      requester: {
        name: "example",
        phone: "example",
        email: "example@mail.com",
      },
      indicated: {
        name: "example",
        document: "example",
      },
      message: "example",
    };

    const mockResponse = createMockAxiosResponse(avaliableData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.indicate(body);

    expect(httpMock.post).toHaveBeenCalledWith(
      "/api/v3/supplier/indicate",
      body
    );

    expect(result).toEqual(avaliableData);
  });
});
