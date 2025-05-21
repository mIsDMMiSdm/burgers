import clsx from 'clsx';
import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import useAuthorization from '../../hooks/useAuthorization';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  ConstructorPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  OrderPage,
  ProfileFormPage,
  ProfileLayout,
  ProfileOrdersPage,
  RegisterPage, ResetPasswordPage,
} from '../../pages';
import FeedPage from '../../pages/feed/feed';
import { fetchGetUser } from '../../services/asyncThunk/getUserThunk';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk';
import {
  getIngredients,
  getLoading,
  getModal,
  getOrder,
  getUser,
} from '../../services/helpers/getSelector';
import { setLoading } from '../../services/slices/loadingSlice';
import { closeAllModal } from '../../services/slices/modalSlice';
import { PATH } from '../../utils/config';
import Header from '../header/header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import Notification from '../notification/notification';
import OrderDetails from '../order-details/order-details';
import OrderModal from '../order-modal/order-modal';
import ProtectedRoute from '../protected-route/protected-route';
import styles from './app.module.css';

const App = () => {
  const {
    modalIngredient,
    modalNotification,
    modalOrder,
    modalOrderSuccess,
  } = useAppSelector(getModal);
  const {
    ingredients,
    ingredientsFetchRequest,
  } = useAppSelector(getIngredients);
  const { loading } = useAppSelector(getLoading);
  const { orderNumber } = useAppSelector(getOrder);
  const { user } = useAppSelector(getUser);
  const { isTokenExpired } = useAuthorization();
  const location = useLocation();
  const background = modalIngredient || modalOrder
    ? location?.state?.background
    : null;
  const { previousUrl } = useAuthorization();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading({ loading: ingredientsFetchRequest }));
  }, [dispatch, ingredientsFetchRequest]);

  useEffect(() => {
    if (ingredients && ingredients.length === 0) {
      dispatch(fetchIngredients());
    }

    if ((!user.isLogout && !user.isLogin && isTokenExpired && user?.token?.refreshToken)
      || (user.isLogin && (!user.name || !user.email))) {
      dispatch(fetchGetUser());
    }
  }, [dispatch, isTokenExpired, user, ingredients, user?.token?.refreshToken]);

  const handleModalClose = useCallback(() => {
    dispatch(closeAllModal());
    ((modalIngredient || modalOrder) && previousUrl) &&
    navigate(previousUrl, {
      replace: true,
      state: { background: null },
    });
  }, [dispatch, modalIngredient, modalOrder, navigate, previousUrl]);

  return (
    <>
      <Header />
      <main className={clsx(styles.main)}>
        {
          loading
            ? (<Loader />)
            : (
              <Routes location={background || location}>
                <Route
                  element={
                    ingredients.length > 0
                    && !ingredientsFetchRequest
                    && <ConstructorPage />
                  }
                  path={PATH.HOME}
                />
                <Route
                  element={
                    <ProtectedRoute
                      anonymous={true}
                    >
                      <LoginPage />
                    </ProtectedRoute>
                  }
                  path={PATH.LOGIN}
                />
                <Route
                  element={
                    <ProtectedRoute
                      anonymous={true}
                    >
                      <RegisterPage />
                    </ProtectedRoute>
                  }
                  path={PATH.REGISTER}
                />
                <Route
                  element={
                    <ProtectedRoute
                      anonymous={true}
                    >
                      <ForgotPasswordPage />
                    </ProtectedRoute>
                  }
                  path={PATH.FORGOT_PASSWORD}
                />
                <Route
                  element={
                    <ProtectedRoute
                      anonymous={true}
                    >
                      <ResetPasswordPage />
                    </ProtectedRoute>
                  }
                  path={PATH.RESET_PASSWORD}
                />
                <Route
                  element={
                    <ProtectedRoute
                      anonymous={false}
                    >
                      <ProfileLayout />
                    </ProtectedRoute>
                  }
                  path={PATH.PROFILE}>
                  <Route
                    element={<ProfileFormPage />}
                    index
                  />
                  <Route
                    element={<ProfileOrdersPage />}
                    path={PATH.ORDERS}
                  />
                </Route>
                <Route
                  element={<FeedPage />}
                  path={PATH.FEED}
                />
                <Route
                  element={<OrderPage />}
                  path={PATH.FEED_ORDER}
                />
                <Route
                  element={
                    <ProtectedRoute>
                      <OrderPage />
                    </ProtectedRoute>
                  }
                  path={PATH.ORDER}
                />
                <Route
                  element={<IngredientPage />}
                  path={PATH.INGREDIENT}
                />
                <Route
                  element={<NotFoundPage />}
                  path="*"
                />
              </Routes>)
        }
      </main>


      {
        modalNotification && (
          <Notification handleModalClose={handleModalClose} title={modalNotification} />
        )
      }

      <Modal
        ariaTitle={
          modalOrder
            ? 'Идентификатор заказа'
            : ''
        }
        title={
          modalIngredient
            ? 'Детали ингредиента'
            : ''
        }
        handleModalClose={handleModalClose}

        isModalOpen={!!modalIngredient || !!modalOrder || !!modalOrderSuccess}
      >
        {background && modalIngredient && (
          <IngredientDetails ingredient={modalIngredient} />
        )}

        {background && modalOrder && (
          <OrderDetails order={modalOrder} />
        )}

        {orderNumber && modalOrderSuccess && (
          <OrderModal />
        )}
      </Modal>
    </>
  );
};

export default App;
