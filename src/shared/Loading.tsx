import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRecoilValue } from 'recoil';

import { loadingState } from '../states/modalState';
import tw from 'tailwind-rn';

const Loading = () => {
  const isLoading = useRecoilValue(loadingState);

  if (!isLoading) {
    return <></>;
  }
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        source={require('../../assets/animations/loading-animation.json')}
        style={tw('w-48 h-48')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
