import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import Icon from 'react-native-vector-icons/AntDesign';
import { TokenResponse } from '@react-native-seoul/naver-login';
import {
  K_CONSUMER_KEY,
  K_CONSUMER_SECRET,
  K_SERVICE_APP_NAME,
  K_SERVICE_APP_URL_SCHEME,
} from 'react-native-dotenv';
import Modal from 'react-native-modal';
import { StackNavigationProp } from '@react-navigation/stack';

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

const useLogin = ({ navigation }: any) => {
  const onClickNaverLogout = () => {
    naverLogout();
  };

  const onClickNaverLogin = async () => {
    try {
      const token: TokenResponse | undefined = await naverLogin(iosKeys);

      console.log(token);
      navigation.goBack();
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

interface LoginProps {
  navigation: StackNavigationProp<any>;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { models, operations } = useLogin({ navigation });

  return (
    <Modal
      isVisible={true}
      style={tw('flex justify-center items-center')}
      onBackdropPress={() => navigation.goBack()}>
      <ShadowContainer>
        <View style={tw('flex bg-white w-80 overflow-hidden p-2 rounded-xl')}>
          <View style={tw('flex items-center')}>
            <View style={tw('flex-row items-center justify-center w-full')}>
              <Text style={tw('text-3xl mb-1')}>로그인</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={tw('absolute right-0 pb-3')}>
                <Icon name="close" size={20} />
              </TouchableOpacity>
            </View>
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
    </Modal>
  );
};

export default Login;
