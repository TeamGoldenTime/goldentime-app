import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-rn';

import Cat from '../../../assets/image/cat1.jpeg';
import FullButton from './components/FullButton';
import { LostResultItem } from './interface';

const LOST_RESULT_MOCK_DATA: LostResultItem[] = [
  {
    area: '서울시 상도동',
    date: '22.05.10',
    thumbnail: Cat,
    where: '동물보호 관리 시스템',
  },
];

interface ResultListProps {
  onClickFinishButton: Function;
}

const ResultList: React.FC<ResultListProps> = ({ onClickFinishButton }) => {
  const renderItem = ({ item }: { item: LostResultItem }) => (
    <View
      style={[
        {
          borderBottomWidth: 3,
          borderBottomColor: '#F9F9F9',
        },
        tw('w-full h-24 justify-center'),
      ]}>
      <View style={tw('p-3')}>
        <View style={tw('flex-row justify-center items-center')}>
          <View style={tw('h-16 w-16')}>
            <Image
              source={item.thumbnail}
              style={tw('h-full w-full rounded-xl')}
              resizeMode="cover"
            />
          </View>
          <View style={tw('flex-1 ml-5')}>
            <Text style={tw('text-lg')}>지역 : {item.area}</Text>
            <Text style={tw('text-lg ')}>등록일자 : {item.date}</Text>
            <Text style={tw('text-sm text-gray-600')}>
              보호장소 : {item.where}
            </Text>
          </View>
          <MIcon
            name="keyboard-arrow-right"
            size={28}
            color="black"
            style={tw('right-1')}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw('flex-1')}>
      <View style={tw('flex p-6')}>
        <Text style={tw('mt-3 text-3xl')}>
          총 {LOST_RESULT_MOCK_DATA.length}건의
        </Text>
        <Text style={tw('mt-3 text-2xl')}>유사한 반려동물을 찾았습니다.</Text>
      </View>
      <View style={[{ backgroundColor: '#F9F9F9' }, tw('w-full h-1 ')]} />
      <FlatList
        style={tw('flex')}
        data={LOST_RESULT_MOCK_DATA}
        renderItem={renderItem}
      />
      <View style={tw('flex p-6 ')}>
        <FullButton onClickNextButton={onClickFinishButton} name="확인" />
      </View>
    </View>
  );
};

export default ResultList;
