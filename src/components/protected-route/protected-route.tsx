import { JSX, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useRedux';
import { getUser } from '../../services/helpers/getSelector';
import { PATH } from '../../utils/config';

type Props = {
  anonymous?: boolean;
  children?: ReactNode;
}

const ProtectedRoute = ({
  anonymous = false,
  children,
}: Props): JSX.Element => {
  const { user } = useAppSelector(getUser);
  const location = useLocation();
  const from = location?.state?.from || PATH.HOME;

  if (anonymous && user.isLogin) {
    return <Navigate replace={true} to={from} />;
  }

  if (!anonymous && !user.isLogin && user.isLogout) {
    return <Navigate to={PATH.HOME} />;
  }

  if (!anonymous && !user.isLogin) {
    return <Navigate replace={true} state={{ from: location }} to={PATH.LOGIN} />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute;
