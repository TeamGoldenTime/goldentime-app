import { NaverLogin, TokenResponse } from '@react-native-seoul/naver-login';

export interface naverLoginKeys {
  kConsumerKey: string;
  kConsumerSecret: string;
  kServiceAppName: string;
  kServiceAppUrlScheme?: string;
}

export const naverLogin = (
  loginKeys: naverLoginKeys,
): Promise<TokenResponse | undefined> => {
  return new Promise((resolve, reject) => {
    NaverLogin.login(
      loginKeys,
      (err: Error | undefined, token: TokenResponse | undefined) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      },
    );
  });
};

export const naverLogout = () => {
  NaverLogin.logout();
};
