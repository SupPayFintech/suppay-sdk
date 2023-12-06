import { AuthenticationModule } from './index';
import Http from '../../Http';
import { createMockAxiosResponse } from '../../jest-helper';

import { loginResponseData } from './fixtures/response-login';

jest.mock('../../Http');

describe('AuthenticationModule', () => {
  let httpMock: jest.Mocked<Http>;
  let authenticationModule: AuthenticationModule;

  beforeEach(() => {
    httpMock = new Http() as jest.Mocked<Http>;
    authenticationModule = new AuthenticationModule(httpMock);
  });

  it('Should call the login enpoint', async () => {
    const username = 'user@example.com';
    const password = 'password123';
    const mockResponse = createMockAxiosResponse(loginResponseData);
    httpMock.post.mockResolvedValue(mockResponse);

    const result = await authenticationModule.login(username, password);

    expect(httpMock.post).toHaveBeenCalledWith(
      '/api/v3/tokens/create',
      {
        username,
        password,
      },
      { signal: undefined },
    ),
      expect(httpMock.setToken).toHaveBeenCalledWith(
        loginResponseData.data.token,
      );

    expect(result).toEqual(loginResponseData);
  });
});
