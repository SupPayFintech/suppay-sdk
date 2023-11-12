import Http from "./Http";
import { AccountModule } from "./Modules/AccountModule";
import { AuthenticationModule } from "./Modules/AuthenticationModule";
import { AxiosRequestConfig } from "axios";

class SupPayClient {
  private http: Http;

  public readonly auth: AuthenticationModule;
  public readonly account: AccountModule;

  constructor(config: AxiosRequestConfig, token?: string) {
    this.http = new Http(config, token);

    this.auth = new AuthenticationModule(this.http);
    this.account = new AccountModule(this.http);
  }

  setToken(token: string): void {
    this.http.setToken(token);
  }
}

export default SupPayClient;
