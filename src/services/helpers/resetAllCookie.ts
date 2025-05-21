import { ACCESS_TOKEN, EXPIRES_AT, REFRESH_TOKEN, TOKEN_EXPIRES_NOW } from '../../utils/constants';
import { setCookie } from './setCookie';

export const resetAllCookie = () => {
  setCookie({
    name: ACCESS_TOKEN,
    props: { expires: TOKEN_EXPIRES_NOW },
    value: 'expired',
  });
  setCookie({
    name: REFRESH_TOKEN,
    props: { expires: TOKEN_EXPIRES_NOW },
    value: 'expired',
  });
  setCookie({
    name: EXPIRES_AT,
    props: { expires: TOKEN_EXPIRES_NOW },
    value: 'expired',
  });
};
