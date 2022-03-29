import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';

const LoginButton = ({ image, onClick }: any) => {
  return (
    <TouchableOpacity style={tw('')} onPress={onClick}>
      <Image source={image} style={tw('w-full')} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default LoginButton;
