import { useCallback } from 'react';

import { fetchLogout } from '../services/asyncThunk/logoutThunk';
import { getCookie } from '../services/helpers/getCookie';
import { getUser } from '../services/helpers/getSelector';
import { REFRESH_TOKEN } from '../utils/constants';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUser);

  const refreshToken = getCookie(REFRESH_TOKEN);
  const handleLogout = useCallback(() =>
      user.isLogin && refreshToken
      && dispatch(fetchLogout({ token: refreshToken })),
    [dispatch, user.isLogin, refreshToken]);

  return { handleLogout };
};
