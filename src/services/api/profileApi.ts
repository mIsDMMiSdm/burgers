import { ForgotPasswordInput } from '../../types/ForgotPasswordInput';
import { ForgotPasswordPromise } from '../../types/ForgotPasswordPromise';
import { LoginInput } from '../../types/LoginInput';
import { LoginPromise } from '../../types/LoginPromise';
import { LogoutInput } from '../../types/LogoutInput';
import { LogoutPromise } from '../../types/LogoutPromise';
import { ResetPasswordInput } from '../../types/ResetPasswordInput';
import { ResetPasswordPromise } from '../../types/ResetPasswordPromise';
import { User } from '../../types/User';
import { UserPromise } from '../../types/UserPromise';
import { fetchUpdateUserInput } from '../../types/fetchUpdateUserInput';
import { authorizationRequest, request } from '../helpers/request';

export const registerUser = ({ email, name, password }: User) =>
  request('auth/register', {
    body: JSON.stringify({ email, name, password }),
    method: 'POST'
  }) as Promise<LoginPromise>;

export const loginUser = ({ email, password }: LoginInput) =>
  request('auth/login', {
    body: JSON.stringify({ email, password }),
    method: 'POST'
  }) as Promise<LoginPromise>;

export const logoutUser = ({ token }: LogoutInput) =>
  request('auth/logout', {
    body: JSON.stringify({ token }),
    method: 'POST'
  }) as Promise<LogoutPromise>;

export const forgotPassword = ({ email }: ForgotPasswordInput) =>
  request('password-reset', {
    body: JSON.stringify({ email }),
    method: 'POST'
  }) as Promise<ForgotPasswordPromise>;

export const resetPassword = ({ password, token }: ResetPasswordInput) =>
  request('password-reset/reset', {
    body: JSON.stringify({ password, token }),
    method: 'POST'
  }) as Promise<ResetPasswordPromise>;

export const getUser = () => authorizationRequest('auth/user') as Promise<UserPromise>;

export const patchUser = (userData: fetchUpdateUserInput) => authorizationRequest('auth/user', {
  body: JSON.stringify(userData),
  method: 'PATCH',
}) as Promise<UserPromise>;
