import Http from "./Http";
import { AuthenticationModule } from "./Modules/AuthenticationModule";
import { AxiosRequestConfig } from "axios";

class SupPayClient {
  private http: Http;

  public readonly auth: AuthenticationModule;

  constructor(config: AxiosRequestConfig, token?: string) {
    this.http = new Http(config, token);

    this.auth = new AuthenticationModule(this.http);
  }

  setToken(token: string): void {
    this.http.setToken(token);
  }
}

export default SupPayClient;
