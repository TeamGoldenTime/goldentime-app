import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';

interface FullButtonProps {
  onClickNextButton: any;
}

const FullButton: React.FC<FullButtonProps> = ({ onClickNextButton }) => (
  <TouchableOpacity
    style={[
      { backgroundColor: '#EEB015' },
      tw('mt-3 self-center w-full h-14 rounded-xl justify-center items-center'),
    ]}
    onPress={onClickNextButton}>
    <Text style={tw('text-xl text-white font-bold')}>다음</Text>
  </TouchableOpacity>
);

export default FullButton;
