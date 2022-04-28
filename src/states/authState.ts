import { atom } from 'recoil';

export interface UserType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

export const userState = atom<UserType | null>({
  key: 'user',
  default: null,
});
