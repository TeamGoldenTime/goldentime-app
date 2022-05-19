import React from 'react';
import { FlatList, Image, Linking, Text, View } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-rn';

import FullButton from './FullButton';
import { SimilarPost } from '../../lostReport/LostReportResult';
import { kstToDateString } from '../../../../shared/utils';

interface ResultListProps {
  onClickFinishButton: Function;
  data: SimilarPost[];
}

const ResultList: React.FC<ResultListProps> = ({
  onClickFinishButton,
  data,
}) => {
  const renderItem = ({ item }: { item: SimilarPost }) => (
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
              source={{ uri: item.thumbnail }}
              style={tw('h-full w-full rounded-xl')}
              resizeMode="cover"
            />
          </View>
          <View style={tw('flex-1 ml-5')}>
            <Text style={tw('text-lg')} numberOfLines={1}>
              지역 : {item.area}
            </Text>
            <Text style={tw('text-lg ')} numberOfLines={1}>
              등록일자 : {kstToDateString(item.date)}
            </Text>
            <Text style={tw('text-sm text-gray-600')}>
              신고자 : {item.where}
            </Text>
          </View>
          <MIcon
            name="keyboard-arrow-right"
            size={28}
            color="black"
            style={tw('right-1')}
            onPress={async () => {
              await Linking.openURL(item.link);
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={tw('flex-1')}>
      <View style={tw('flex p-6')}>
        <Text style={tw('mt-3 text-3xl')}>총 {data.length}건의</Text>
        <Text style={tw('mt-3 text-2xl')}>유사한 반려동물을 찾았습니다.</Text>
      </View>
      <View style={[{ backgroundColor: '#F9F9F9' }, tw('w-full h-1 ')]} />
      <FlatList style={tw('flex')} data={data} renderItem={renderItem} />
      <View style={tw('flex p-6 ')}>
        <FullButton onClickNextButton={onClickFinishButton} name="확인" />
      </View>
    </View>
  );
};

export default ResultList;
