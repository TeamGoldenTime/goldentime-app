import React from 'react';
import { Image, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ReportItem } from '../interface';
import CardContainer from '../../../shared/CardContainer';

interface ReportCardProps {
  item: ReportItem;
}

const ReportCard: React.FC<ReportCardProps> = ({ item }) => {
  return (
    <CardContainer>
      <View
        style={[
          { width: wp('36%'), height: hp('19%') },
          tw('flex  bg-white rounded-xl p-2'),
        ]}>
        <View style={[{ flex: 3 }, tw('')]}>
          <Image
            source={item.image}
            style={[
              {
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              },
              tw('h-full w-full'),
            ]}
            resizeMode="cover"
          />
        </View>
        <View style={[{ flex: 2 }, tw('mt-1 items-center')]}>
          <View>
            <Text numberOfLines={1} style={tw('text-base font-bold')}>
              {item.title}
            </Text>
          </View>
          <View style={tw('flex-row')}>
            <Icon name="map-marker" size={15} color="#F5BA25" />
            <Text style={[{ flexShrink: 1 }, tw('text-xs text-gray-500')]}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </CardContainer>
  );
};

export default ReportCard;
