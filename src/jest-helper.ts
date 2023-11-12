import { AxiosResponse } from "axios";

export function createMockAxiosResponse<T>(
  data: T,
  status = 200,
  statusText = "OK"
): AxiosResponse<T> {
  return {
    data,
    status,
    statusText,
    headers: {},
    config: {},
  } as AxiosResponse<T>;
}
