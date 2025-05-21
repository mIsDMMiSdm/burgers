export type CustomError = {
  data: Error;
  ok: boolean;
  status: number;
  statusText: string;
  success: boolean;
  url: string;
}