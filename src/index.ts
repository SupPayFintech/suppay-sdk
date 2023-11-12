import Http from "./Http";
import { AxiosRequestConfig } from "axios";

class SupPayClient {
  private http: Http;

  constructor(config: AxiosRequestConfig, token?: string) {
    this.http = new Http(config, token);
  }

  setToken(token: string): void {
    this.http.setToken(token);
  }
}

export default SupPayClient;
