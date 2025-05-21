import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Loader from '../../../components/loader/loader';
import { useForm } from '../../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { fetchUpdateUser } from '../../../services/asyncThunk/updateUserThunk';
import { getUser } from '../../../services/helpers/getSelector';
import styles from './profile-form.module.css';

const ProfileForm = () => {
  const { patchUserRequest, user } = useAppSelector(getUser);
  const { errors, handleChange, isValid, resetForm, values } = useForm();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState({ email: false, name: false, password: false });
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const inputEmailRef = useRef<HTMLInputElement | null>(null);
  const inputPasswordRef = useRef<HTMLInputElement | null>(null);
  const sameValues = (user !== null && (user.name !== values.name || user.email !== values.email || values.password));
  const { email, name, password } = values;

  const isButtonActive = useMemo(
    () => (
      isValid && sameValues
    ), [isValid, sameValues]);

  useEffect(() => {
    user && resetForm({ email: user.email, name: user.name, password: '' });
  }, [resetForm, user]);

  const onIconNameClick = () => {
    setIsEdit({ ...isEdit, name: !isEdit.name });
    setTimeout(() => (inputNameRef.current) && inputNameRef.current.focus(), 0);
  };

  const onIconEmailClick = () => {
    setIsEdit({ ...isEdit, email: !isEdit.email });
    setTimeout(() => (inputEmailRef.current) && inputEmailRef.current.focus(), 0);
  };

  const onIconPasswordClick = () => {
    setIsEdit({ ...isEdit, password: !isEdit.password });
    setTimeout(() => (inputPasswordRef.current) && inputPasswordRef.current.focus(), 0);
  };

  const handleBlur = () => {
    setIsEdit({ email: false, name: false, password: false });
  };

  const handleResetValue = useCallback(() => {
    user && resetForm({ email: user.email, name: user.name, password: '' });
  }, [resetForm, user]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password && password.length > 8) {
      dispatch(fetchUpdateUser({ email: email ?? user.email, name: name ?? user.name, password }));
    } else {
      dispatch(fetchUpdateUser({ email: email ?? user.email, name: name ?? user.name }));
    }
  };

  return (
    user && Object.values(user).length >= 2
      ? (
        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
          <Input
            disabled={!isEdit.name}
            error={!!errors.name}
            errorText={errors.name}
            icon={'EditIcon'}
            maxLength={20}
            minLength={2}
            name={'name'}
            onBlur={() => handleBlur()}
            onChange={(e) => handleChange(e)}
            onIconClick={onIconNameClick}
            placeholder={'Имя'}
            ref={inputNameRef}
            size={'default'}
            type={'text'}
            value={values.name || ''}
          />
          <Input
            disabled={!isEdit.email}
            error={!!errors.email}
            errorText={errors.email}
            icon={'EditIcon'}
            name={'email'}
            onBlur={() => handleBlur()}
            onChange={(e) => handleChange(e)}
            onIconClick={onIconEmailClick}
            placeholder={'Логин'}
            ref={inputEmailRef}
            size={'default'}
            type={'email'}
            value={values.email || ''}
          />
          <Input
            disabled={!isEdit.password}
            error={!!errors.password}
            errorText={errors.password}
            icon={'EditIcon'}
            maxLength={20}
            minLength={8}
            name={'password'}
            onBlur={() => handleBlur()}
            onChange={(e) => handleChange(e)}
            onIconClick={onIconPasswordClick}
            placeholder={'Пароль'}
            ref={inputPasswordRef}
            size={'default'}
            type={isEdit.password ? 'text' : 'password'}
            value={values.password || ''}
          />
          {sameValues && <div className={clsx(styles.button_container)}>
            <Button
              extraClass={styles.button_secondary}
              htmlType="button"
              onClick={() => handleResetValue()}
              size="medium"
              type="secondary"
            >
              Отмена
            </Button>
            <Button
              disabled={!isButtonActive || patchUserRequest.fetch || !values.email || (!!values.name && values.name.length < 2)}
              extraClass={styles.button}
              htmlType="submit"
              size="medium"
              type="primary"
            >
              {patchUserRequest.fetch ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>}
          {
            patchUserRequest.errorMessage
              ? (
                <span className={clsx('text', 'text_type_main-default', styles.errorMessage)}>
        {patchUserRequest.errorMessageContent}
          </span>
              )
              : <></>
          }
        </form>
      )
      : (
        <div className={styles.loader_wrapper}>
          <Loader/>
        </div>
      )
  );
};

export default ProfileForm;
