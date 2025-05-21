import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchResetPassword } from '../../services/asyncThunk/resetPasswordThunk';
import { getPassword } from '../../services/helpers/getSelector';
import { PATH } from '../../utils/config';
import styles from './reset-password.module.css';

const ResetPasswordPage = () => {
  const { errors, handleChange, isValid, resetForm, values } = useForm();
  const dispatch = useAppDispatch();
  const { isEmailSubmitted, isPasswordChanged, resetPasswordRequest } = useAppSelector(getPassword);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onIconClick = useCallback(() => setIsVisiblePassword(!isVisiblePassword), [isVisiblePassword]);

  useEffect(() => {
    if (!isEmailSubmitted)  {
      const { pathname } = location;
      navigate((PATH.FORGOT_PASSWORD), { state: { background: pathname } });
    }

    if (isPasswordChanged) {
      const { pathname } = location;
      navigate(((PATH.LOGIN)), { state: { background: pathname } });
    }
  }, [isEmailSubmitted, isPasswordChanged, location, navigate]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password && values.token) {
      dispatch(fetchResetPassword({
        password: values.password.toString(),
        token: values.token.trim()
      }));
    }
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
        <Input
          error={!!errors.password}
          errorText={errors.password}
          extraClass={clsx(styles.input_error)}
          icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
          maxLength={20}
          minLength={8}
          name={'password'}
          onChange={handleChange}
          onIconClick={onIconClick}
          placeholder={'Введите новый пароль'}
          required
          size={'default'}
          type={isVisiblePassword ? 'text' : 'password'}
          value={values.password || ''}
        />
        <Input
          error={!!errors.token}
          errorText={errors.token}
          extraClass={clsx(styles.input_error)}
          name={'token'}
          onChange={handleChange}
          placeholder={'Введите код из письма'}
          size={'default'}
          type={'text'}
          value={values.token || ''}
        />
        <Button
          disabled={!isValid || resetPasswordRequest.fetch}
          htmlType="submit"
          size="medium"
          type="primary"
        >
          Сохранить
        </Button>
      </form>
      <ul className={clsx('page__list', styles.list)}>
        {
          resetPasswordRequest.errorMessage && (
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text, styles.error_text)}>
                {resetPasswordRequest.errorMessageContent}
              </span>
            </li>
          )
        }
        <li className={clsx('text', 'text_type_main-small', styles.item)}>
          <span className={clsx(styles.plain_text)}>Вспомнили пароль?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default ResetPasswordPage;
