import { User } from './User';

export type LoginPromise = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: User
}