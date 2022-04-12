import React from 'react';
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-rn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Logo from '../../assets/image/golden_time.png';

interface HeaderProps {
  onClickProfile: (event: GestureResponderEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ onClickProfile }) => (
  <View
    style={[
      { height: hp('7%') },
      tw('pl-5 pr-5 flex-row justify-between items-center bg-white'),
    ]}>
    <TouchableOpacity>
      <Icon name="bell-outline" size={32} color="#595959" />
    </TouchableOpacity>
    <View>
      <Image source={Logo} style={tw('w-44')} resizeMode="contain" />
    </View>
    <TouchableOpacity onPress={onClickProfile}>
      <Icon name="account-circle-outline" size={32} color="#595959" />
    </TouchableOpacity>
  </View>
);

export default Header;
