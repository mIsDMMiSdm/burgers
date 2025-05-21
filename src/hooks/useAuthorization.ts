import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { getCookie } from '../services/helpers/getCookie';
import { EXPIRES_AT } from '../utils/constants';

const useAuthorization = () => {
  const location = useLocation();

  const isTokenExpired = useMemo(() => {
    const expiresAt = getCookie(EXPIRES_AT);
    return (expiresAt)
      ? Date.now() >= +expiresAt
      : true;
  }, []);
  const previousUrl = useMemo(() => {
      const state = location.state as { background: string } | null;
      if (state?.background) {
        return state.background;
      }
    },
    [location.state]);

  return {
    isTokenExpired,
    previousUrl,
  };
};

export default useAuthorization;
