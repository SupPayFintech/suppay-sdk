import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MiddlewareManager } from './MiddlewareManager';

describe('MiddlewareManager', () => {
  it('should add request interceptor', () => {
    const manager = new MiddlewareManager();
    const interceptor = (config: AxiosRequestConfig) => ({
      ...config,
      test: true,
    });
    manager.addRequestInterceptor(interceptor);

    const result = manager.applyRequestInterceptors({});
    expect(result).toHaveProperty('test', true);
  });

  it('should add response interceptor', () => {
    const manager = new MiddlewareManager();
    const interceptor = (response: AxiosResponse) => ({
      ...response,
      test: true,
    });
    manager.addResponseInterceptor(interceptor);

    const result = manager.applyResponseInterceptors({} as AxiosResponse);
    expect(result).toHaveProperty('test', true);
  });
});
