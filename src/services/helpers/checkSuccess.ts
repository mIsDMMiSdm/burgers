import { CustomError } from '../../types/CustomError';

export const checkSuccess = (res: { success: boolean } & Promise<unknown> | CustomError) =>
  res.success
    ? res
    : Promise
      .reject(res)
      .then((r: Response) => r.json());
