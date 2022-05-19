import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-rn';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { APP_COLOR_BLACK } from '../../../shared/styles';

interface MenuProps {
  title: string;
  iconName: string;
}

const Menu: React.FC<MenuProps> = ({ title, iconName }) => {
  return (
    <View
      style={[
        { borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
        tw('flex-row w-full h-14 items-center'),
      ]}>
      <Ionicons name={iconName} size={32} color={APP_COLOR_BLACK} />
      <Text style={tw('text-2xl font-light text-gray-900 ml-1')}>{title}</Text>
    </View>
  );
};

export default Menu;
