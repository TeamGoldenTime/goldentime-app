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
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Logo from '../../assets/image/golden_time.png';
import { userState } from '../states/authState';
import { loginModalState } from '../states/modalState';

const Header: React.FC = () => {
  const user = useRecoilValue(userState);
  const setShowLoginModal = useSetRecoilState(loginModalState);

  return (
    <View
      style={[
        { height: hp('7%') },
        tw('pl-5 pr-5 flex-row justify-between items-center bg-white'),
      ]}>
      <TouchableOpacity>
        <Icon
          name="bell-outline"
          size={32}
          color="#595959"
          style={user === null && { opacity: 0 }}
        />
      </TouchableOpacity>
      <View>
        <Image source={Logo} style={tw('w-44')} resizeMode="contain" />
      </View>
      <TouchableOpacity onPress={() => setShowLoginModal(true)}>
        <Icon name="account-circle-outline" size={32} color="#595959" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
