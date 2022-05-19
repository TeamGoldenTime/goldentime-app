import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { useRecoilValue } from 'recoil';

import Profile from '../../../../assets/image/default_profile.png';
import NaverIcon from '../../../../assets/image/naver_icon.png';
import { userState } from '../../../states/authState';

const ProfileSection = () => {
  const user = useRecoilValue(userState);
  return (
    <View style={tw('flex-row flex-1 items-center')}>
      <View style={tw('flex w-16 h-16 rounded-full')}>
        <Image
          source={Profile}
          resizeMode="contain"
          style={tw('w-full h-full')}
        />
      </View>
      {user ? (
        <>
          <View style={tw('flex w-full h-full p-3 pb-2 pt-2 justify-center')}>
            <Text style={tw('text-2xl font-semibold top-1')}>{user.name}</Text>
            <Text style={tw('text-lg font-extralight bottom-1')}>
              {user.email}
            </Text>
          </View>
          <View style={tw('absolute w-8 h-8 right-0')}>
            <Image
              source={NaverIcon}
              resizeMode="contain"
              style={tw('w-full h-full rounded-lg')}
            />
          </View>
        </>
      ) : (
        <View style={tw('ml-5')}>
          <Text style={tw('text-2xl text-center text-gray-700')}>
            로그인 후 이용 가능합니다.
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileSection;
