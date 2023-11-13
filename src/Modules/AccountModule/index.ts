import Http from '../../Http';
import { ApiResponse } from '../../SupPayClient.type';
import {
  RecoveryValidationData,
  RecoveryVerifyData,
  UserContextData,
} from './AccountModule.type';

export type RecoveryVerifyResponse = ApiResponse<RecoveryVerifyData>;
export type RecoveryValidationResponse = ApiResponse<RecoveryValidationData>;
export type UserContextResponse = ApiResponse<UserContextData>;

/**
 * AccountModule
 * This class provides methods for managing account-related functionalities such as recovery verification, validation, password reset, and retrieving user context.
 *
 * @class
 * @property {Http} http - An instance of Http for making API requests.
 */
export class AccountModule {
  private http: Http;

  /**
   * Creates an instance of AccountModule.
   *
   * @constructor
   * @param {Http} http - The HTTP client used for making API requests.
   */
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Verifies the recovery process for a user account.
   *
   * @async
   * @param {string} document - The document to be used for recovery verification.
   * @returns {Promise<RecoveryVerifyResponse>} A promise that resolves to the recovery verification response.
   */
  async verifyRecovery(document: string): Promise<RecoveryVerifyResponse> {
    const response = await this.http.post<RecoveryVerifyResponse>(
      '/api/v3/register/recovery/verify',
      { document },
    );
    return response.data;
  }

  /**
   * Validates the recovery code for a user account.
   *
   * @async
   * @param {string} code - The recovery code.
   * @param {string} document - The document associated with the account.
   * @returns {Promise<RecoveryValidationResponse>} A promise that resolves to the recovery validation response.
   */
  async validateRecovery(
    code: string,
    document: string,
  ): Promise<RecoveryValidationResponse> {
    const response = await this.http.post<RecoveryValidationResponse>(
      '/api/v3/register/recovery/validate',
      { code, document },
    );
    return response.data;
  }

  /**
   * Resets the password for a user account.
   *
   * @async
   * @param {string} identifier - The account identifier.
   * @param {string} password - The new password.
   * @param {string} passwordConfirmation - Confirmation of the new password.
   * @returns {Promise<ApiResponse>} A promise that resolves to the password reset response.
   */
  async resetPassword(
    identifier: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<ApiResponse> {
    const response = await this.http.post<ApiResponse>(
      '/api/v3/register/recovery/reset',
      {
        identifier,
        password,
        password_confirmation: passwordConfirmation,
      },
    );
    return response.data;
  }

  /**
   * Retrieves the context of the current user.
   *
   * @async
   * @returns {Promise<UserContextResponse>} A promise that resolves to the user context response.
   */
  async context(): Promise<UserContextResponse> {
    const response = await this.http
      .auth(true)
      .get<UserContextResponse>('/api/v3/user/profile');
    return response.data;
  }
}
