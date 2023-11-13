export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiResponsePaginate<T> {
  success: boolean;
  message: string;
  data: T[];
  complements: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export enum OrderBy {
  DESC = 'desc',
  ASC = 'asc',
}

export type PerPage = number;
