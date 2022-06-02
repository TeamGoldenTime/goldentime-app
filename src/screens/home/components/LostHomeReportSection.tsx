import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'tailwind-rn';

import ReportCard from './ReportCard';
import { ReportItem } from '../interface';

interface LostHomeReportSectionProps {
  title: string;
  data: ReportItem[];
  onClickReportItem: Function;
}

const LostHomeReportSection: React.FC<LostHomeReportSectionProps> = ({
  title,
  data,
  onClickReportItem,
}) => {
  const _renderItem: any = ({ item }: { item: ReportItem }) => (
    <Pressable style={tw('mr-2')}>
      <ReportCard
        item={item}
        width="36%"
        height="19%"
        onClickReportItem={onClickReportItem}
      />
    </Pressable>
  );

  const _keyExtractor: any = (item: ReportItem) => item.id;

  return (
    <View style={[{ height: hp('28%') }, tw('bg-white mt-1 pb-4 pt-4')]}>
      <View style={tw('flex-row items-center justify-between')}>
        <Text style={tw('ml-2 text-lg')}>{title}</Text>
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

export default LostHomeReportSection;
