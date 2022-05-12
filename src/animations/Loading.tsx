import React from 'react';
import LottieView from 'lottie-react-native';
import tw from 'tailwind-rn';

const Loading = () => {
  return (
    <LottieView
      source={require('../../assets/animations/loading-animation.json')}
      style={tw('w-48 h-48')}
      autoPlay
      loop
    />
  );
};

export default Loading;
