import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'tailwind-rn';

import { APP_COLOR_BLACK } from '../../../shared/styles';
import DogNoseImage from './../../../../assets/image/dog-nose.png';

const DogNose = () => {
  return (
    <View>
      <View style={tw('flex-row justify-center')}>
        <Image
          source={DogNoseImage}
          resizeMode="contain"
          style={tw('w-6 h-6')}
        />
        <Text style={tw('text-xl ml-1 mb-3 justify-center')}>
          등록된 개코지문이 없습니다.
        </Text>
      </View>
      <View
        style={[
          {
            backgroundColor: APP_COLOR_BLACK,
          },
          tw('w-24 h-8 rounded-xl self-center items-center justify-center'),
        ]}>
        <Text style={tw('text-white text-lg')}>등록하기</Text>
      </View>
    </View>
  );
};

export default DogNose;
