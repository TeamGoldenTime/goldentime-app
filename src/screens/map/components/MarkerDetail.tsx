import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'tailwind-rn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import ShadowContainer from '../../../shared/ShadowContainer';
import { APP_COLOR, CATCH_COLOR, LOST_COLOR } from '../../../shared/styles';
import { ReportItem } from '../../home/interface';
import { toDateString } from '../../../shared/utils';
import { MapType } from '../constants';

interface MarkerDetailProps {
  currentMap: MapType;
  currentReport: ReportItem | null;
  detailVisible: boolean;
  setDetailVisible: Function;
  onClickReport: Function;
}

const MarkerDetail: React.FC<MarkerDetailProps> = ({
  currentReport,
  detailVisible,
  setDetailVisible,
  currentMap,
  onClickReport,
}) => {
  return (
    <Modal
      isVisible={detailVisible}
      style={tw('absolute w-full h-32 bottom-6 m-0')}
      backdropOpacity={0}
      onBackdropPress={() => setDetailVisible(false)}>
      <Pressable
        onPress={() => {
          setDetailVisible(false);
          onClickReport(currentReport?.id);
        }}>
        <ShadowContainer>
          <View
            style={[
              {
                backgroundColor:
                  currentMap === MapType.LOST ? LOST_COLOR : CATCH_COLOR,
              },
              tw('w-full h-32 rounded-xl p-1'),
            ]}>
            <View style={tw('flex-1 bg-white rounded-xl p-1 justify-center')}>
              <View style={tw('flex-1 flex-row ')}>
                <View style={[{ flex: 2 }, tw('flex-1 justify-center')]}>
                  <Image
                    source={{ uri: currentReport?.image }}
                    resizeMode="cover"
                    style={tw('w-24 h-24 rounded-2xl')}
                  />
                </View>
                <View
                  style={[{ flex: 3 }, tw('pt-2 pb-2 justify-center ml-3')]}>
                  <Text numberOfLines={1} style={tw('text-2xl font-semibold')}>
                    {currentReport?.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={tw(
                      'text-lg font-extralight text-gray-600 tracking-tight',
                    )}>
                    <Icon name="map-marker" size={15} color={APP_COLOR} />
                    {/*TODO :: 시군구 주소로 바꾸기*/}
                    {currentReport?.area}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={tw(
                      'text-lg font-extralight text-gray-600 tracking-tight',
                    )}>
                    {currentReport?.area}
                  </Text>
                </View>
              </View>
              <View style={{ position: 'absolute', right: -10 }}>
                <MIcon
                  name="keyboard-arrow-right"
                  size={36}
                  color="rgb(156,163,175)"
                  style={tw('right-1')}
                />
              </View>
              <View style={tw('absolute right-2 top-0')}>
                <Text style={tw('text-xs text-gray-700')}>
                  {toDateString(currentReport?.date)}
                </Text>
              </View>
            </View>
          </View>
        </ShadowContainer>
      </Pressable>
    </Modal>
  );
};

export default React.memo(MarkerDetail);
