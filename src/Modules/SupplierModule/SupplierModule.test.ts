import { SupplierModule } from './index';
import Http from '../../Http';
import { createMockAxiosResponse } from '../../jest-helper';

import { avaliableData } from './fixtures/response-avaliable';

import { OrderBy } from '../../SupPayClient.type';
import { SupplierIndicateCreate } from './SupplierModule.type';

jest.mock('../../Http');

describe('SupplierModule', () => {
  let httpMock: jest.Mocked<Http>;
  let supplierModule: SupplierModule;

  beforeEach(() => {
    httpMock = new Http() as jest.Mocked<Http>;
    supplierModule = new SupplierModule(httpMock);
  });

  it('Should return the available suppliers', async () => {
    const search = 'example';
    const page = 2;
    const orderBy = OrderBy.ASC;
    const perPage = 20;

    const mockResponse = createMockAxiosResponse(avaliableData);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await supplierModule.available(
      search,
      page,
      orderBy,
      perPage,
    );

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/supplier/available?search=${search}&page=${page}&orderBy=${orderBy}&perPage=${perPage}`,
      {
        signal: undefined,
      },
    );

    expect(result).toEqual(avaliableData);
  });

  it('Should call the supplier indication API', async () => {
    const body: SupplierIndicateCreate = {
      requester: {
        name: 'example',
        phone: 'example',
        email: 'example@mail.com',
      },
      indicated: {
        name: 'example',
        document: 'example',
      },
      message: 'example',
    };

    const mockResponse = createMockAxiosResponse(avaliableData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await supplierModule.indicate(body);

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/supplier/indicate',
      body,
      {
        signal: undefined,
      },
      expect.anything(),
    );

    expect(result).toEqual(avaliableData);
  });
});
