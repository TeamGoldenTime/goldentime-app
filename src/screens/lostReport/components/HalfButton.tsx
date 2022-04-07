import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';

interface HalfButtonProps {
  textColor: string;
  color: string;
  title: string;
  onClick: any;
}

const HalfButton: React.FC<HalfButtonProps> = ({
  textColor,
  color,
  title,
  onClick,
}) => (
  <TouchableOpacity
    style={[
      { backgroundColor: color },
      tw('w-36 h-14 mt-3 self-center  rounded-xl justify-center items-center'),
    ]}
    onPress={onClick}>
    <Text style={[{ color: textColor }, tw('text-xl font-bold')]}>{title}</Text>
  </TouchableOpacity>
);

export default HalfButton;
