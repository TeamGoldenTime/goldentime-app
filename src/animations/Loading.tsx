import React from 'react';
import LottieView from 'lottie-react-native';
import tw from 'tailwind-rn';
import { View } from 'react-native';

const Loading = () => {
  return (
    <View style={tw('flex-1 justify-center items-center')}>
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
