import React from 'react';
import LottieView from 'lottie-react-native';

const SearchLoading = () => {
  return (
    <LottieView
      source={require('../../assets/animations/serach-animation.json')}
      autoPlay
      loop
    />
  );
};

export default SearchLoading;
