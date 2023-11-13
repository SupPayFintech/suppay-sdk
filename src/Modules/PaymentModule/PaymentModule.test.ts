import { PaymentModule } from './index';
import Http from '../../Http';
import { createMockAxiosResponse } from '../../jest-helper';

import {
  PaymentCreate,
  PaymentCreateSimulate,
  PaymentParticipant,
} from './PaymentInterfaces.type';
import { PaymentProofType, PaymentType } from './PaymentTypes.type';
import { OrderBy } from '../../SupPayClient.type';

import { paymentCreateData } from './fixtures/response-payment-create';
import { paymentAllData } from './fixtures/response-payment-all';
import { paymentParticipantData } from './fixtures/response-payment-participant';
import { ApiResponseEmpty } from '../fixtures/response-api-empty';
import { paymentSimulateData } from './fixtures/response-payment-simulate';

jest.mock('../../Http');

describe('PaymentModule', () => {
  let httpMock: jest.Mocked<Http>;
  let authModule: PaymentModule;

  beforeEach(() => {
    httpMock = new Http() as jest.Mocked<Http>;
    authModule = new PaymentModule(httpMock);
  });

  it('Should call the payment creation API', async () => {
    const body: PaymentCreate = {
      type: PaymentType.INVOICE,
      identifier: 'example',
      installments: [
        {
          identifier: '1be6f66b-421b-407f-83bb-fcfa49885d98',
          due_date: '2023-11-30',
          value: 100000,
        },
      ],
      supplier_document: '27877314000123',
      commercial_establishment_document: '96175121000143',
    };

    const mockResponse = createMockAxiosResponse(paymentCreateData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.create(body);

    expect(httpMock.post).toHaveBeenCalledWith('/api/v3/payment/create', body);

    expect(result).toEqual(paymentCreateData);
  });

  it('should call the payment listing API', async () => {
    const search = 'example';
    const page = 1;
    const orderBy = OrderBy.DESC;
    const perPage = 15;

    const mockResponse = createMockAxiosResponse(paymentAllData);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await authModule.all(search, page, orderBy, perPage);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/payment/all?search=${search}&page=${page}&orderBy=${orderBy}&perPage=${perPage}`,
    );

    expect(result).toEqual(paymentAllData);
  });

  it('Should call the participant information API', async () => {
    const body: PaymentParticipant = {
      supplier_document: '31897225000116',
      commercial_establishment_document: '78436629000176',
    };

    const mockResponse = createMockAxiosResponse(paymentParticipantData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.participant(body);

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/payment/participant',
      body,
    );

    expect(result).toEqual(paymentParticipantData);
  });

  it('Should call the renotify payment confirmation API', async () => {
    const id = 'foo-bar';

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await authModule.renotifyAuthorization(id);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/payment/${id}/authorization/notify`,
    );

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should call the payment authorization API', async () => {
    const id = 'foo-bar';
    const code = 'foo-code';

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.authorizeWithCode(id, code);

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/payment/${id}/authorization/execute/with-code`,
      { code },
    );

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should call the API to change the payment amount', async () => {
    const id = 'foo-bar';
    const value = 1500;

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.changeValue(id, value);

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/payment/${id}/update/value`,
      { value },
    );

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should call the API to cancel the payment', async () => {
    const id = 'foo-bar';
    const reason = 'foo bar';

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.cancel(id, reason);

    expect(httpMock.post).toHaveBeenCalledWith(`/api/v3/payment/${id}/cancel`, {
      reason,
    });

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should call the API to simulate create payment', async () => {
    const body: PaymentCreateSimulate = {
      type: PaymentType.INVOICE,
      identifier: 'foo-identifier',
      installments: [
        {
          identifier: 'foo',
          due_date: 'foo-date',
          value: 123456,
        },
      ],
      supplier_document: '06144825000166',
      commercial_establishment_document: '73475815000109',
    };

    const mockResponse = createMockAxiosResponse(paymentSimulateData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.simulate(body);

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/payment/simulate`,
      body,
    );

    expect(result).toEqual(paymentSimulateData);
  });

  it('Should call the API to simulate create payment', async () => {
    const code = 'foo-code';

    const mockResponse = createMockAxiosResponse(paymentCreateData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.authorizeByCode(code);

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/authorization/execute/with-code`,
      {
        code,
      },
    );

    expect(result).toEqual(paymentCreateData);
  });

  it('Must call API to add proof of payment - INVOICE', async () => {
    const id = 'foo-id';
    const type = PaymentProofType.INVOICE;
    const amount = 1000;
    const value = 'foo-invoice-key';

    const mockResponse = createMockAxiosResponse(paymentCreateData);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.attachProof(id, type, value, amount);

    const formData = new FormData();
    formData.append('type', type);
    formData.append('key', value);

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/payment/${id}/proof/attach`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );

    expect(result).toEqual(paymentCreateData);
  });

  it('Should throw an error for PaymentProofType.FILE when amount is not specified', async () => {
    const id = 'foo-id';
    const type = PaymentProofType.FILE;
    const value = 'some-file-key';

    const mockResponse = createMockAxiosResponse({
      error: 'Amount is mandatory for FILE type',
    });

    httpMock.post.mockResolvedValue(mockResponse);

    await expect(authModule.attachProof(id, type, value)).rejects.toThrow(
      'The amount attribute is mandatory for the FILE type',
    );
  });

  it('Should call API correctly with a file for PaymentProofType.FILE', async () => {
    const id = 'foo-id';
    const type = PaymentProofType.FILE;
    const amount = 1000;

    const fileValue = new Blob(['dummy content'], { type: 'text/plain' });
    Object.defineProperty(fileValue, 'name', {
      value: 'test.txt',
    });

    const mockResponse = createMockAxiosResponse(paymentCreateData);
    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authModule.attachProof(
      id,
      type,
      fileValue as File,
      amount,
    );

    // Prepare os dados para a comparação
    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', fileValue);
    formData.append('value', amount.toString());

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/payment/${id}/proof/attach`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );

    expect(result).toEqual(paymentCreateData);
  });
});
