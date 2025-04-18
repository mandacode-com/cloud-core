export interface CustomResponse<T = any> {
  message: string;
  data: T;
}

export interface ErrorResponseData {
  name: string;
  path: string;
  timestamp: string;
}
