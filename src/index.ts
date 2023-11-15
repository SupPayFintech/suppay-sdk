import Http from './Http';
import { AccountModule } from './Modules/AccountModule';
import { AuthenticationModule } from './Modules/AuthenticationModule';
import { AxiosRequestConfig } from 'axios';
import { SupplierModule } from './Modules/SupplierModule';
import { PaymentModule } from './Modules/PaymentModule';
import { RegisterModule } from './Modules/RegisterModule';

/**
 * SupPayClient
 * This class provides a client interface to interact with various modules such as Authentication, Account, Supplier, and Payment.
 * It is designed to simplify the process of making HTTP requests to these modules by encapsulating the necessary logic.
 *
 * @class
 * @property {AuthenticationModule} auth - The Authentication module for handling authentication-related operations.
 * @property {AccountModule} account - The Account module for account management operations.
 * @property {SupplierModule} supplier - The Supplier module for supplier-related operations.
 * @property {PaymentModule} payment - The Payment module for handling payment transactions.
 * @property {RegisterModule} payment - The Register module for handling registration requests.
 */
class SupPayClient {
  private http: Http;

  public readonly auth: AuthenticationModule;
  public readonly account: AccountModule;
  public readonly supplier: SupplierModule;
  public readonly payment: PaymentModule;
  public readonly register: RegisterModule;

  /**
   * Creates an instance of SupPayClient.
   *
   * @constructor
   * @param {AxiosRequestConfig} config - Axios request configuration object.
   * @param {string} [token] - Optional authentication token for initializing the HTTP client with authentication.
   */
  constructor(config: AxiosRequestConfig, token?: string) {
    this.http = new Http(config, token);

    this.auth = new AuthenticationModule(this.http);
    this.account = new AccountModule(this.http);
    this.supplier = new SupplierModule(this.http);
    this.payment = new PaymentModule(this.http);
    this.register = new RegisterModule(this.http);
  }

  /**
   * Sets a new authentication token for the HTTP client.
   *
   * @param {string} token - The new authentication token to be used for subsequent requests.
   * @returns {void}
   */
  setToken(token: string): void {
    this.http.setToken(token);
  }

  /**
   * Configures an authentication callback to be used for obtaining the authentication token.
   * The token obtained through the callback will be used for HTTP requests.
   *
   * @param {() => string} authCallback - The callback that returns the authentication token.
   * @returns {void}
   */
  setAuthCallback(authCallback: () => string): void {
    this.http.setAuthCallback(authCallback);
  }
}

export default SupPayClient;
