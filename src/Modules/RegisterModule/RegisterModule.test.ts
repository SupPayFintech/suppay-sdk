import { RegisterModule } from './index';
import Http from '../../Http';
import { createMockAxiosResponse } from '../../jest-helper';

import { documentAvaliableData } from './fixtures/response-document-avaliable';
import { registerAllData } from './fixtures/response-register-all';
import { attachPictureData } from './fixtures/response-attach-picture';
import { ApiResponseEmpty } from '../fixtures/response-api-empty';
import {
  ApproveRegisterData,
  RegisterDocumentAttachType,
  RegisterDocumentType,
} from './RegisterModule.type';
import { OrderBy } from '../../SupPayClient.type';

jest.mock('../../Http');

describe('RegisterModule', () => {
  let httpMock: jest.Mocked<Http>;
  let registerModule: RegisterModule;

  beforeEach(() => {
    httpMock = new Http() as jest.Mocked<Http>;
    registerModule = new RegisterModule(httpMock);
  });

  it("Should call the CB's document availability check API", async () => {
    const document = '20949579009';

    const mockResponse = createMockAxiosResponse(documentAvaliableData);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await registerModule.documentAvailable(document);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/register/verification/document/verify/${document}`,
      {
        signal: undefined,
      },
    );

    expect(result).toEqual(documentAvaliableData);
  });

  it('Should call the API that sends an SMS code to the phone for confirmation', async () => {
    const phone = '20949579009';

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await registerModule.sendMobileCode(phone);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/register/verification/phone/send/${phone}`,
      {
        signal: undefined,
      },
    );

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should call the API that confirms the SMS code to confirm the phone', async () => {
    const phone = '20949579009';
    const code = 'foo-bar-123';

    const mockResponse = createMockAxiosResponse(attachPictureData);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await registerModule.verifyMobileCode(phone, code);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/register/verification/phone/verify/${phone}/${code}`,
      {
        signal: undefined,
      },
    );

    expect(result).toEqual(attachPictureData);
  });

  it('Should call the API that adds the document photos to the registry', async () => {
    const mockResponse = createMockAxiosResponse(attachPictureData);

    httpMock.post.mockResolvedValue(mockResponse);

    const type = RegisterDocumentAttachType.DOCUMENT_BACK;
    const file = new Blob(['dummy content'], { type: 'text/plain' });
    Object.defineProperty(file, 'name', {
      value: 'test.txt',
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const result = await registerModule.attachPicture(type, file as any);

    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/register/verification/files/attach`,
      formData,
      { signal: undefined, headers: { 'Content-Type': 'multipart/form-data' } },
    );

    expect(result).toEqual(attachPictureData);
  });

  it('Should call the API that creates the user registration request', async () => {
    const body = {
      document: '36427256009',
      phone: '07b2feef-0270-4ae1-81f0-5b1b4c58b794',
      password: 'foo-bar-password',
      password_confirmation: 'foo-bar-password',
      documents: {
        document_type: RegisterDocumentType.CNH,
        document_front: 'c3e23809-72f3-4cd8-bdd0-132c077bd978',
        document_back: '32171293-7127-49b5-96b3-c6c4098d840c',
        selfie: '77d3b643-7a86-4f07-b0e0-6628453a62da',
      },
    };
    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.post.mockResolvedValue(mockResponse);

    const result = await registerModule.create(body);

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/register/commercial-establishment',
      body,
      {
        signal: undefined,
      },
    );

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should return the EC register ', async () => {
    const search = 'example';
    const page = 2;
    const orderBy = OrderBy.ASC;
    const perPage = 20;

    httpMock.auth.mockImplementation(() => httpMock);
    const mockResponse = createMockAxiosResponse(registerAllData);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await registerModule.all(search, page, orderBy, perPage);

    expect(httpMock.get).toHaveBeenCalledWith(
      `/api/v3/register/all?search=${search}&page=${page}&orderBy=${orderBy}&perPage=${perPage}`,
      {
        signal: undefined,
      },
    );
    expect(httpMock.auth).toHaveBeenCalledWith(true);

    expect(result).toEqual(registerAllData);
  });

  it('Should call the API that retrieves a single registration request', async () => {
    const id = 'foo-id';

    const mockResponse = createMockAxiosResponse(registerAllData);

    httpMock.auth.mockImplementation(() => httpMock);
    httpMock.get.mockResolvedValue(mockResponse);

    const result = await registerModule.resume(id);

    expect(httpMock.auth).toHaveBeenCalledWith(true);

    expect(httpMock.get).toHaveBeenCalledWith(`/api/v3/register/${id}/resume`, {
      signal: undefined,
    });

    expect(result).toEqual(registerAllData);
  });

  it('Should call the API that approves a registration request', async () => {
    const id = 'foo-bar-id';
    const body: ApproveRegisterData = {
      user: {
        document: '54481775200',
        name: 'Example name User',
      },
      instance: {
        document: '37653885939',
        name: 'Example name EC',
      },
      submittedDocumentsAreReliable: true,
      informationMatchesTheDocumentsSent: true,
    };

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);

    httpMock.auth.mockImplementation(() => httpMock);
    httpMock.post.mockResolvedValue(mockResponse);

    const result = await registerModule.approve(id, body);

    expect(httpMock.auth).toHaveBeenCalledWith(true);
    expect(httpMock.post).toHaveBeenCalledWith(
      `/api/v3/register/commercial-establishment/${id}/approve`,
      body,
      {
        signal: undefined,
      },
    );

    expect(result).toEqual(ApiResponseEmpty);
  });
});
