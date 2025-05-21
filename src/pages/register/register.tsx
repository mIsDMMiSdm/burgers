import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FormEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchRegister } from '../../services/asyncThunk/registerThunk';
import { getRegister } from '../../services/helpers/getSelector';
import { PATH } from '../../utils/config';
import styles from './register.module.css';

const RegisterPage = () => {
  const { errors, handleChange, isValid, resetForm, values } = useForm();
  const dispatch = useAppDispatch();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { errorMessage, errorMessageContent, fetch } = useAppSelector(getRegister);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => setIsVisiblePassword(!isVisiblePassword);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password && values.name) {
      dispatch(fetchRegister({
        email: values.email,
        name: values.name,
        password: values.password,
      }));
    }
  };

  return (
    <section className={clsx(styles.container)}>
      <form className={clsx(styles.login_form)} onSubmit={handleSubmit}>
        <h1 className={clsx('text', 'text_type_main-medium')}>Регистрация</h1>
        <Input
          error={!!errors.name}
          errorText={errors.name}
          extraClass={clsx(styles.input_error)}
          maxLength={20}
          minLength={2}
          name={'name'}
          onChange={handleChange}
          placeholder={'Имя'}
          required
          size={'default'}
          type={'text'}
          value={values.name || ''}
        />
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
          minLength={8}
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
          Зарегистрироваться
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
          <span className={clsx(styles.plain_text)}>Уже зарегистрированы?</span>
          <NavLink className={clsx(styles.app_link)} to={PATH.LOGIN}>Войти</NavLink>
        </li>
      </ul>
    </section>
  );
};

export default RegisterPage;
