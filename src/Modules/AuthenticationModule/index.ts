import Http from '../../Http';
import { ApiResponse } from '../../SupPayClient.type';
import { LoginData } from './AuthenticationModule.type';

export type LoginResponse = ApiResponse<LoginData>;

export class AuthenticationModule {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.http.post<LoginResponse>(
      '/api/v3/tokens/create',
      { username, password },
    );

    if (response.data.success && response.data.data?.token) {
      this.http.setToken(response.data.data.token);
    }

    return response.data;
  }
}
