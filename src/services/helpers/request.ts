import { SERVER_CONFIG } from '../../utils/config';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRES,
  EXPIRES_AT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRES,
} from '../../utils/constants';
import { checkResponse } from './checkResponse';
import { checkSuccess } from './checkSuccess';
import { getCookie } from './getCookie';
import { setCookie } from './setCookie';

export const request = (endpoint: string, options?: RequestInit, token?: string): Promise<unknown> => {
  const accessToken = getCookie(ACCESS_TOKEN);
  return fetch(`${SERVER_CONFIG.BASE_URL}${endpoint}`, {
    headers: {
      ...SERVER_CONFIG.HEADERS,
      authorization: token ?? accessToken ?? '',
    },
    ...options,
  })
    .then(checkResponse)
    .then(checkSuccess);
};

export const authorizationRequest = async (endpoint: string, options?: RequestInit) => {
  const tokenUrl = `auth/token`;
  const access = getCookie(ACCESS_TOKEN);
  const token = getCookie(REFRESH_TOKEN);
  if (access) {
    return await request(endpoint, options, access);
  }

  if (!access && token) {
    const res = await request(tokenUrl, {
      body: JSON.stringify({ token }),
      method: 'POST',
    }) as { accessToken: string, refreshToken: string };
    const {
      accessToken,
      refreshToken,
    } = res;
    const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES * 1000;
    setCookie({
      name: ACCESS_TOKEN,
      props: { expires: ACCESS_TOKEN_EXPIRES },
      value: accessToken,
    });
    setCookie({
      name: REFRESH_TOKEN,
      props: { expires: REFRESH_TOKEN_EXPIRES },
      value: refreshToken,
    });
    setCookie({
      name: EXPIRES_AT,
      props: { expires: REFRESH_TOKEN_EXPIRES },
      value: expiresAt,
    });
    return request(endpoint, options, getCookie(ACCESS_TOKEN));
  }
};
