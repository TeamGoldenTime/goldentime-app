import { atom } from 'recoil';

export const loginModalState = atom({
  key: 'LOGIN_MODAL',
  default: false,
});

export const loadingState = atom({
  key: 'LOADING',
  default: false,
});
