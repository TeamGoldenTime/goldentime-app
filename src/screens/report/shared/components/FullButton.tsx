import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';

interface FullButtonProps {
  onClickNextButton: any;
  name: string;
}

const FullButton: React.FC<FullButtonProps> = ({ onClickNextButton, name }) => (
  <TouchableOpacity
    style={[
      { backgroundColor: '#EEB015' },
      tw('mt-3 self-center w-full h-14 rounded-xl justify-center items-center'),
    ]}
    onPress={onClickNextButton}>
    <Text style={tw('text-xl text-white font-bold')}>{name}</Text>
  </TouchableOpacity>
);

export default FullButton;
