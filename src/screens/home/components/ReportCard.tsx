import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ReportItem } from '../interface';
import CardContainer from '../../../shared/CardContainer';
import { APP_COLOR } from '../../../shared/styles';

interface ReportCardProps {
  item: ReportItem;
  width: string;
  height: string;
  onClickReportItem: Function;
}

const ReportCard: React.FC<ReportCardProps> = ({
  item,
  width,
  height,
  onClickReportItem,
}) => {
  return (
    <Pressable
      onPress={() => {
        onClickReportItem(item.id, item.type);
      }}>
      <CardContainer>
        <View
          style={[
            { width: wp(width), height: hp(height) },
            tw('flex  bg-white rounded-xl p-2'),
          ]}>
          <View style={[{ flex: 3 }, tw('')]}>
            <Image
              source={{ uri: item.image }}
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
          <View style={[{ flex: 2 }, tw('mt-1')]}>
            <View>
              <Text numberOfLines={1} style={tw('text-base font-bold')}>
                {item.title}
              </Text>
            </View>
            <View style={tw('')}>
              <Text
                style={[{ flexShrink: 1 }, tw('text-xs text-gray-500')]}
                numberOfLines={1}>
                <Icon name="map-marker" size={15} color={APP_COLOR} />
                {item.addressName}
              </Text>
              <Text
                style={[{ flexShrink: 1 }, tw('text-xs text-gray-500')]}
                numberOfLines={1}>
                {item.area}
              </Text>
            </View>
          </View>
        </View>
      </CardContainer>
    </Pressable>
  );
};

export default ReportCard;
