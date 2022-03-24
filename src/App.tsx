import React, { useState } from 'react';
import { Button, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { TokenResponse } from '@react-native-seoul/naver-login';
import {
  K_CONSUMER_KEY,
  K_CONSUMER_SECRET,
  K_SERVICE_APP_NAME,
  K_SERVICE_APP_URL_SCHEME,
} from 'react-native-dotenv';

import { naverLogin, naverLoginKeys, naverLogout } from './oauth/naver';

const iosKeys: naverLoginKeys = {
  kConsumerKey: K_CONSUMER_KEY,
  kConsumerSecret: K_CONSUMER_SECRET,
  kServiceAppName: K_SERVICE_APP_NAME,
  kServiceAppUrlScheme: K_SERVICE_APP_URL_SCHEME,
};

const App = () => {
  const [naverToken, setNaverToken]: [TokenResponse | null, any] =
    useState(null);

  const onClickLogin = async () => {
    try {
      const token: TokenResponse | undefined = await naverLogin(iosKeys);
      setNaverToken(token);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickLogout = () => {
    naverLogout();
    setNaverToken(null);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onClickLogin}>
        <Image
          style={{ width: '60%', resizeMode: 'contain' }}
          source={require('../assets/image/naver_login.png')}
        />
      </TouchableOpacity>

      {!!naverToken && <Button title="로그아웃하기" onPress={onClickLogout} />}
    </SafeAreaView>
  );
};

export default App;
