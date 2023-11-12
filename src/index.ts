import Http from "./Http";
import { AccountModule } from "./Modules/AccountModule";
import { AuthenticationModule } from "./Modules/AuthenticationModule";
import { AxiosRequestConfig } from "axios";
import { SupplierModule } from "./Modules/SupplierModule";

class SupPayClient {
  private http: Http;

  public readonly auth: AuthenticationModule;
  public readonly account: AccountModule;
  public readonly supplier: SupplierModule;

  constructor(config: AxiosRequestConfig, token?: string) {
    this.http = new Http(config, token);

    this.auth = new AuthenticationModule(this.http);
    this.account = new AccountModule(this.http);
    this.supplier = new SupplierModule(this.http);
  }

  setToken(token: string): void {
    this.http.setToken(token);
  }
}

export default SupPayClient;
