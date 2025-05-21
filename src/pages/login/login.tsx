import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchLogin } from '../../services/asyncThunk/loginThunk';
import { getLogin } from '../../services/helpers/getSelector';
import { PATH } from '../../utils/config';
import styles from './login.module.css';

const LoginPage = () => {
  const { errors, handleChange, isValid, resetForm, values } = useForm();
  const dispatch = useAppDispatch();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { errorMessage, errorMessageContent, fetch } = useAppSelector(getLogin);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password) {
      dispatch(fetchLogin({
        email: values.email,
        password: values.password
      }));
    }
  }, [dispatch, values.email, values.password]);

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Вход</h1>
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
        <Input
          error={!!errors.password}
          errorText={errors.password}
          extraClass={clsx(styles.input_error)}
          icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
          maxLength={20}
          minLength={1}
          name={'password'}
          onChange={handleChange}
          onIconClick={onIconClick}
          placeholder={'Пароль'}
          required
          size={'default'}
          type={isVisiblePassword ? 'text' : 'password'}
          value={values.password || ''}
        />
        <Button
          disabled={!isValid || fetch}
          htmlType="submit"
          size="medium"
          type="primary"
        >
          Войти
        </Button>
      </form>
      <ul className={clsx('page__list', styles.list)}>
        {
          errorMessage && (
            <li className={clsx('text', 'text_type_main-small', styles.item)}>
              <span className={clsx(styles.plain_text, styles.error_text)}>{errorMessageContent}</span>
            </li>
          )
        }
        <li className={clsx('text', 'text_type_main-small', styles.item)}>
          <span className={clsx(styles.plain_text)}>Вы — новый пользователь?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.REGISTER}>Зарегистрироваться</NavLink>
        </li>
        <li className={clsx('text', 'text_type_main-small', styles.item)}>
          <span className={clsx(styles.plain_text)}>Забыли пароль?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.FORGOT_PASSWORD}>Восстановить пароль</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default LoginPage;
