export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const EXPIRES_AT = 'expiresAt';
export const ACCESS_TOKEN_EXPIRES = 1200;
export const REFRESH_TOKEN_EXPIRES = 2000;
export const TOKEN_EXPIRES_NOW = 1;
// eslint-disable-next-line no-control-regex,regexp/no-dupe-characters-character-class
export const PATTERN_EMAIL = /(?:[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\v\f\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\v\f\x0e-\x7f])*")@(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z\d-]*[a-z\d]:(?:[\x01-\x08\v\f\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\v\f\x0e-\x7f])+)\])/;
export const MODAL_ID = '#modal';
export const ERROR_LOGIN = 'Неверное имя пользователя или пароль.';
export const ERROR_USER_EXISTS = 'Пользователь с таким Email уже существует.';
export const ERROR_DEFAULT = 'Ууупс! Что-то пошло не так!';
export const NOTIFICATION_USER_CREATED = 'Пользователь успешно создан.';
export const NOTIFICATION_LOGIN_SUCCESS = 'Вход выполнен успешно.';
export const NOTIFICATION_EMAIL_SUBMITTED = 'На указанную почту успешно отправлено письмо с кодом для сброса пароля.';
export const NOTIFICATION_PASSWORD_RESET = 'Пароль успешно обновлен.';
export const NOTIFICATION_LOGOUT_SUCCESS = 'Выход из профиля выполнен успешно.';
export const NOTIFICATION_INCORRECT_TOKEN = 'Код для восстановления пароля введен неверно.';
export const NOTIFICATION_USER_UPDATE_SUCCESS = 'Информация профиля успешно обновлена.';
export const NOTIFICATION_USER_UPDATE_ERROR = 'При обновлении профиля произошла ошибка.';
export const NOTIFICATION_ORDER_PENDING = 'Отправляем заказ на орбитальную станцию. Пожалуйста подождите.';
export const SERVER_RESPOND_USER_EXISTS = 'User already exists';
export const SERVER_RESPOND_INCORRECT_TOKEN = 'Incorrect reset token';
export const SERVER_RESPOND_INCORRECT_VALUES = 'email or password are incorrect';
export const WS_RESPOND_INCORRECT_TOKEN = 'Invalid or missing token';


export const TABS = {
  BUN: 'bun',
  MAIN: 'main',
  SAUCE: 'sauce'
}
