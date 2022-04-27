import { atom } from 'recoil';

export const loginModalState = atom({
  key: 'LOGIN_MODAL',
  default: false,
});

export const abandonedModalState = atom({
  key: 'ABANDONED_MODAL',
  default: false,
});
