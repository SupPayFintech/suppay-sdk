import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MiddlewareManager } from './MiddlewareManager';

export default class Http extends MiddlewareManager {
  public readonly axiosInstance: AxiosInstance;
  private useAuth: boolean = false;
  private authToken: string | undefined;
  private authType: 'Bearer' | 'Application' = 'Bearer';

  constructor(axiosConfig?: AxiosRequestConfig, token?: string) {
    super();
    this.axiosInstance = axios.create({
      ...axiosConfig,
      headers: { 'Content-Type': 'application/json' },
    });
    this.authToken = token;
  }

  auth(useAuth: boolean = false): Http {
    if (useAuth && !this.authToken) {
      throw new Error('No authentication token available');
    }

    this.useAuth = useAuth;

    return this;
  }

  setToken(token: string, authType: 'Bearer' | 'Application' = 'Bearer'): void {
    this.authToken = token;
    this.authType = authType;
  }

  setApplicationAuth(token: string): void {
    this.setToken(token, 'Application');
  }

  private getConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (this.useAuth && this.authToken) {
      const authHeader =
        this.authType === 'Bearer'
          ? { Authorization: `Bearer ${this.authToken}` }
          : { 'x-auth-application': this.authToken };

      return {
        ...config,
        headers: {
          ...config?.headers,
          ...authHeader,
        },
      };
    }
    return config || {};
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, this.getConfig(config));
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, this.getConfig(config));
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, this.getConfig(config));
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, this.getConfig(config));
  }
}
