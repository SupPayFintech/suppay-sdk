import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MiddlewareManager } from "./MiddlewareManager";

export default class Http extends MiddlewareManager {
  public readonly axiosInstance: AxiosInstance;
  private useAuth: boolean = false;
  private authToken: string | undefined;

  constructor(axiosConfig?: AxiosRequestConfig, token?: string) {
    super();
    this.axiosInstance = axios.create(axiosConfig);
    this.authToken = token;
  }

  auth(useAuth: boolean = false): Http {
    if (useAuth && !this.authToken) {
      throw new Error("No authentication token available");
    }

    this.useAuth = useAuth;

    return this;
  }

  setToken(token: string): void {
    this.authToken = token;
  }

  private getConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    if (this.useAuth) {
      const authConfig = {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${this.authToken}`,
        },
      };
      this.useAuth = false;
      return authConfig;
    }
    return config || {};
  }

  // Método GET
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, this.getConfig(config));
  }

  // Método POST
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, this.getConfig(config));
  }

  // Método PUT
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, this.getConfig(config));
  }

  // Método DELETE
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, this.getConfig(config));
  }
}
