import { ChangeEvent, useCallback, useState } from 'react';

import { PATTERN_EMAIL } from '../utils/constants';

type Values = {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
};

type Errors = Record<string, string>;

export const useForm = () => {
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  const [isValid, setIsValid] = useState(false);

  const checkIsEmailValid = useCallback((value: string) => PATTERN_EMAIL.test(value), []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {target} = e;
    const {name} = target;
    const {value} = target;
    const form = target.closest('form');
    setValues({ ...values, [name]: value });
    if (name === 'email') {
      (!target.validationMessage && !checkIsEmailValid(value))
        ? setErrors({ ...errors, [name]: 'Введите валидный e-mail.' })
        : setErrors({ ...errors, [name]: target.validationMessage });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }

    form && setIsValid(form.checkValidity());
  }, [errors, checkIsEmailValid, values]);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { errors, handleChange, isValid, resetForm, setValues, values };
};
