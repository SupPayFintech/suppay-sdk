import { AccountModule } from './index';
import Http from '../../Http';
import { createMockAxiosResponse } from '../../jest-helper';

import { recoveryVerifyData } from './fixtures/response-recovery-verify';
import { recoveryValidateData } from './fixtures/response-recovery-validate';
import { ApiResponseEmpty } from '../fixtures/response-api-empty';
import { userContextData } from './fixtures/response-user-context';

jest.mock('../../Http');

describe('AccountModule', () => {
  let httpMock: jest.Mocked<Http>;
  let accountModule: AccountModule;

  beforeEach(() => {
    httpMock = new Http() as jest.Mocked<Http>;
    accountModule = new AccountModule(httpMock);
  });

  it('Should call the verify recovery enpoint', async () => {
    const document = '123456789';
    const mockResponse = createMockAxiosResponse(recoveryVerifyData);
    httpMock.post.mockResolvedValue(mockResponse);

    const result = await accountModule.verifyRecovery(document);

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/register/recovery/verify',
      {
        document: '123456789',
      },
      { signal: undefined },
      expect.anything(),
    );

    expect(result).toEqual(recoveryVerifyData);
  });

  it('Should call the validate recovery enpoint', async () => {
    const code = '701792';
    const document = '123456789';
    const mockResponse = createMockAxiosResponse(recoveryValidateData);
    httpMock.post.mockResolvedValue(mockResponse);

    const result = await accountModule.validateRecovery(code, document);

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/register/recovery/validate',
      {
        code: '701792',
        document: '123456789',
      },
      { signal: undefined },
      expect.anything(),
    );

    expect(result).toEqual(recoveryValidateData);
  });

  it('Should call the reset password enpoint', async () => {
    const identifier = 'foo-bar';
    const password = 'example-1234';
    const passwordConfirmation = 'example-1234';

    const mockResponse = createMockAxiosResponse(ApiResponseEmpty);
    httpMock.post.mockResolvedValue(mockResponse);

    const result = await accountModule.resetPassword(
      identifier,
      password,
      passwordConfirmation,
    );

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/register/recovery/reset',
      {
        identifier: 'foo-bar',
        password: 'example-1234',
        password_confirmation: 'example-1234',
      },
      { signal: undefined },
      expect.anything(),
    );

    expect(result).toEqual(ApiResponseEmpty);
  });

  it('Should call the verify recovery endpoint with authentication', async () => {
    const mockResponse = createMockAxiosResponse(userContextData);

    httpMock.auth.mockImplementation(() => httpMock);

    httpMock.get.mockResolvedValue(mockResponse);

    const result = await accountModule.context();

    expect(httpMock.auth).toHaveBeenCalledWith(true);

    expect(httpMock.get).toHaveBeenCalledWith('/api/v3/user/profile', {
      signal: undefined,
    });

    expect(result).toEqual(userContextData);
  });
});
