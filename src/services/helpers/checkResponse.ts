import { CustomError } from '../../types/CustomError';

export const checkResponse = (res: Response) => res.ok
    ? res.json()
    : res.json().then((error: Error & CustomError) => Promise.reject({
      data: error,
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      success: false,
      url: res.url
    }));