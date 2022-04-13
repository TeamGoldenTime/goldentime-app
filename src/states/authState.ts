import { atom } from 'recoil';

export interface UserTypes {
  //TODO : 유저 정보 타입 정의
  any: any;
}

export const userState = atom<any>({
  key: 'user',
  default: null,
});
