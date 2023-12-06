import { GenericAbortSignal } from 'axios';
import Http from '../../Http';
import { ApiResponse } from '../../SupPayClient.type';
import { LoginData } from './AuthenticationModule.type';

export type LoginResponse = ApiResponse<LoginData>;

/**
 * AuthenticationModule
 * This class provides functionalities related to user authentication, such as logging in.
 * It utilizes an HTTP client to communicate with the authentication API endpoints.
 *
 * @class
 * @property {Http} http - An instance of Http for making API requests.
 */
export class AuthenticationModule {
  private http: Http;

  /**
   * Creates an instance of AuthenticationModule.
   *
   * @constructor
   * @param {Http} http - The HTTP client used for making API requests.
   */
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Logs in a user with the provided username and password.
   * On successful login, the user's authentication token is set for future HTTP requests.
   *
   * @async
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<LoginResponse>} A promise that resolves to the login response. This response includes the authentication token if the login is successful.
   * @param {GenericAbortSignal} [signal] - Optional Axios CancelToken for request cancellation and control.
   */
  async login(
    username: string,
    password: string,
    signal?: GenericAbortSignal,
  ): Promise<LoginResponse> {
    const response = await this.http.post<LoginResponse>(
      '/api/v3/tokens/create',
      { username, password },
      { signal },
    );

    if (response.data.success && response.data.data?.token) {
      this.http.setToken(response.data.data.token);
    }

    return response.data;
  }
}
