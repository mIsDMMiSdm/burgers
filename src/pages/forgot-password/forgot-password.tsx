import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FormEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchForgotPassword } from '../../services/asyncThunk/forgotPasswordThunk';
import { getPassword } from '../../services/helpers/getSelector';
import { PATH } from '../../utils/config';
import styles from './forgot-password.module.css';

const ForgotPasswordPage = () => {
  const { errors, handleChange, isValid, resetForm, values } = useForm();
  const dispatch = useAppDispatch();
  const { forgotPasswordRequest, isEmailSubmitted } = useAppSelector(getPassword);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmailSubmitted) navigate(PATH.RESET_PASSWORD);
  }, [navigate, isEmailSubmitted]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email) {
      dispatch(fetchForgotPassword({ email: values.email }));
    }
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Восстановление пароля</h1>
        <Input
          error={!!errors.email}
          errorText={errors.email}
          extraClass={clsx(styles.input_error)}
          name={'email'}
          onChange={handleChange}
          placeholder={'E-mail'}
          required
          size={'default'}
          type={'email'}
          value={values.email || ''}
        />
        <Button
          disabled={!isValid || forgotPasswordRequest.fetch}
          htmlType="submit"
          size="medium"
          type="primary"
        >
          Восстановить
        </Button>
      </form>
      <ul className={clsx('page__list', styles.list)}>
        {
          forgotPasswordRequest.errorMessage && (
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text, styles.error_text)}>{forgotPasswordRequest.errorMessageContent}</span>
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

export default ForgotPasswordPage;
