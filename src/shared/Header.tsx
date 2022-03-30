import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../../assets/image/golden_time.png';

const Header = () => (
  <View
    style={tw('pl-5 pr-5 flex-row justify-between items-center bg-white h-14')}>
    <TouchableOpacity>
      <Icon name="bell-outline" size={32} color="#595959" />
    </TouchableOpacity>
    <View>
      <Image source={Logo} style={tw('w-44')} resizeMode="contain" />
    </View>
    <TouchableOpacity>
      <Icon name="account-circle-outline" size={32} color="#595959" />
    </TouchableOpacity>
  </View>
);

export default Header;
