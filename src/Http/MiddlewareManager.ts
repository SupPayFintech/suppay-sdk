import { AxiosRequestConfig, AxiosResponse } from "axios";

export class MiddlewareManager {
  private requestInterceptors: ((
    config: AxiosRequestConfig
  ) => AxiosRequestConfig)[] = [];
  private responseInterceptors: ((response: AxiosResponse) => AxiosResponse)[] =
    [];

  // Adiciona um middleware de requisição
  addRequestInterceptor(
    interceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
  ): void {
    this.requestInterceptors.push(interceptor);
  }

  // Adiciona um middleware de resposta
  addResponseInterceptor(
    interceptor: (response: AxiosResponse) => AxiosResponse
  ): void {
    this.responseInterceptors.push(interceptor);
  }

  // Aplica middlewares de requisição
  applyRequestInterceptors(config: AxiosRequestConfig): AxiosRequestConfig {
    return this.requestInterceptors.reduce(
      (accConfig, interceptor) => interceptor(accConfig),
      config
    );
  }

  // Aplica middlewares de resposta
  applyResponseInterceptors(response: AxiosResponse): AxiosResponse {
    return this.responseInterceptors.reduce(
      (accResponse, interceptor) => interceptor(accResponse),
      response
    );
  }
}
