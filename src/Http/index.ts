import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { MiddlewareManager } from './MiddlewareManager';
import Yup from '../Helper/Yup';
import { AnyObject, Maybe } from 'yup';

export default class Http extends MiddlewareManager {
  public readonly axiosInstance: AxiosInstance;
  private useAuth: boolean = false;
  private authToken: string | undefined;
  private authType: 'Bearer' | 'Application' = 'Bearer';
  private authCallback?: () => string;

  constructor(axiosConfig?: AxiosRequestConfig, token?: string) {
    super();
    this.axiosInstance = axios.create({
      ...axiosConfig,
      headers: { 'Content-Type': 'application/json' },
    });
    this.authToken = token;
  }

  setAuthCallback(callback: () => string): void {
    this.authCallback = callback;
  }

  auth(useAuth: boolean = false): Http {
    if (useAuth && !this.getToken()) {
      throw new Error('No authentication token available');
    }

    this.useAuth = useAuth;

    return this;
  }

  private async validate<T extends Maybe<AnyObject> = any>(
    data: T,
    validationSchema: Yup.ObjectSchema<T>,
  ) {
    await validationSchema.validate(data, { abortEarly: false });

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
    const token = this.getToken();

    if (this.useAuth && token) {
      const authHeader =
        this.authType === 'Bearer'
          ? { Authorization: `Bearer ${token}` }
          : { 'x-auth-application': token };

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

  private getToken(): string | undefined {
    const callbackToken = this.authCallback ? this.authCallback() : undefined;

    return callbackToken || this.authToken;
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, this.getConfig(config));
  }

  async post<T = any, S extends Maybe<AnyObject> = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    validationSchema?: Yup.ObjectSchema<S>,
  ): Promise<AxiosResponse<T>> {
    if (validationSchema) {
      await this.validate(data, validationSchema);
    }

    return this.axiosInstance.post<T>(url, data, this.getConfig(config));
  }

  async put<T = any, S extends Maybe<AnyObject> = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    validationSchema?: Yup.ObjectSchema<S>,
  ): Promise<AxiosResponse<T>> {
    if (validationSchema) {
      await this.validate(data, validationSchema);
    }

    return this.axiosInstance.put<T>(url, data, this.getConfig(config));
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, this.getConfig(config));
  }
}
