import React from 'react';
import LottieView from 'lottie-react-native';

const AlarmAnimation = () => {
  return (
    <LottieView
      source={require('../../assets/animations/alarm-animation.json')}
      autoPlay
      loop
    />
  );
};

export default AlarmAnimation;
