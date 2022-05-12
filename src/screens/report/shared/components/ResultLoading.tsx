import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-rn';

import SearchLoading from '../../../../animations/SearchLoading';

const ResultLoading = () => {
  return (
    <View style={tw('flex-1')}>
      <View style={tw('w-full h-48 mt-6 justify-center items-center')}>
        <Text style={tw('text-2xl font-extralight text-center')}>
          입력하신 정보와 유사한
        </Text>
        <Text style={tw('text-2xl font-extralight text-center')}>
          반려동물을 검색 중 입니다.
        </Text>
      </View>
      <View style={tw('flex-1')}>
        <SearchLoading />
      </View>
      <View style={tw('flex-1 items-center justify-center')}>
        <Text style={tw('text-xl font-extralight text-center text-gray-600')}>
          잠시만 기다려주세요..
        </Text>
      </View>
    </View>
  );
};

export default ResultLoading;
