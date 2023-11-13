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

export class AccountModule {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  async verifyRecovery(document: string): Promise<RecoveryVerifyResponse> {
    const response = await this.http.post<RecoveryVerifyResponse>(
      '/api/v3/register/recovery/verify',
      { document },
    );
    return response.data;
  }

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

  async context(): Promise<UserContextResponse> {
    const response = await this.http
      .auth(true)
      .get<UserContextResponse>('/api/v3/user/profile');
    return response.data;
  }
}
