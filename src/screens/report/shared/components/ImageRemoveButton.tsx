import { View } from 'react-native';
import tw from 'tailwind-rn';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

const ImageRemoveButton = () => {
  return (
    <View
      style={tw('w-5 h-5 rounded-full bg-black justify-center items-center')}>
      <MCIcon name="close" size={18} color="white" />
    </View>
  );
};

export default ImageRemoveButton;
