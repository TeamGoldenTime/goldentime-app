import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-rn';
import Icon from 'react-native-vector-icons/AntDesign';
import { TokenResponse } from '@react-native-seoul/naver-login';
import {
  K_CONSUMER_KEY,
  K_CONSUMER_SECRET,
  K_SERVICE_APP_NAME,
  K_SERVICE_APP_URL_SCHEME,
} from 'react-native-dotenv';

import { naverLogin, naverLoginKeys, naverLogout } from '../../oauth/naver';
import ShadowContainer from '../../shared/ShadowContainer';
import LoginButton from './components/LoginButton';
import NaverLoginImage from '../../../assets/image/naver_login.png';
import KakaoLoginImage from '../../../assets/image/kakao_login.png';
import GoogleLoginImage from '../../../assets/image/google_login.png';

const iosKeys: naverLoginKeys = {
  kConsumerKey: K_CONSUMER_KEY,
  kConsumerSecret: K_CONSUMER_SECRET,
  kServiceAppName: K_SERVICE_APP_NAME,
  kServiceAppUrlScheme: K_SERVICE_APP_URL_SCHEME,
};

const useLogin = () => {
  const onClickNaverLogout = () => {
    naverLogout();
  };

  const onClickNaverLogin = async () => {
    try {
      const token: TokenResponse | undefined = await naverLogin(iosKeys);

      // TODO : token으로 서버에 로그인 요청
    } catch (err) {
      console.error(err);
    }
  };

  return {
    models: {},
    operations: {
      onClickNaverLogin,
      onClickNaverLogout,
    },
  };
};

const Login = () => {
  const { models, operations } = useLogin();

  return (
    <ShadowContainer>
      <View style={tw('flex bg-white w-80 overflow-hidden p-2 rounded-xl')}>
        <View style={tw('absolute top-0 right-0 mr-3 mt-3')}>
          <Icon name="close" size={20} />
        </View>
        <View style={tw('flex items-center')}>
          <Text style={tw('text-3xl mb-1')}>로그인</Text>
          <Text style={tw('text-lg mb-1')}>
            로그인 후 이용이 가능한 서비스 입니다.
          </Text>
        </View>
        <View style={tw('p-3 h-52 justify-between')}>
          <LoginButton
            image={NaverLoginImage}
            onClick={operations.onClickNaverLogin}
          />
          <LoginButton image={KakaoLoginImage} />
          <LoginButton image={GoogleLoginImage} />
        </View>
      </View>
    </ShadowContainer>
  );
};

export default Login;
