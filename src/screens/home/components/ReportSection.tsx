import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'tailwind-rn';

import ReportCard from './ReportCard';
import { ReportItem } from '../interface';
import MIcon from 'react-native-vector-icons/MaterialIcons';

interface ReportSectionProps {
  title: string;
  data: ReportItem[];
}

const ReportSection: React.FC<ReportSectionProps> = ({ title, data }) => {
  const _renderItem: any = ({ item }: { item: ReportItem }) => (
    <View style={tw('mr-2')}>
      <ReportCard item={item} />
    </View>
  );

  const _keyExtractor: any = (item: ReportItem) => item.id;

  return (
    <View style={[{ height: hp('28%') }, tw('bg-white mt-1 pb-4 pt-4')]}>
      <View style={tw('flex-row items-center justify-between')}>
        <Text style={tw('ml-2 text-lg')}>{title}</Text>
        <Pressable>
          <View style={tw('flex-row items-center justify-end')}>
            <Text style={tw('text-xs text-gray-400 border-2')}>전체보기</Text>
            <MIcon
              name="keyboard-arrow-right"
              size={20}
              color="rgb(156,163,175)"
              style={tw('right-1')}
            />
          </View>
        </Pressable>
      </View>
      <FlatList
        style={tw('flex-row pl-2 mt-2 w-full h-full')}
        data={data}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ReportSection;
