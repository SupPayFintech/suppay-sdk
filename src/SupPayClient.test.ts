import SupPayClient from './index';
import Http from './Http';
import { AxiosRequestConfig } from 'axios';

jest.mock('./Http');

describe('SupPayClient', () => {
  it('should correctly initialize with AxiosRequestConfig and token', () => {
    const config: AxiosRequestConfig = {
      baseURL: 'https://api.example.com',
      timeout: 1000,
    };
    const token = 'test-token';

    new SupPayClient(config, token);

    expect(Http).toHaveBeenCalledWith(config, token);
  });
});
