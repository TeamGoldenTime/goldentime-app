import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import tw from 'tailwind-rn';
import Icon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import ShadowContainer from '../../shared/ShadowContainer';
import { APP_NAVIGATION_CATCH_REPORT_STACK } from '../../navigations/constants';

const Abandoned: React.FC<any> = ({ navigation }) => {
  const [visible, setVisible] = useState(true);

  const closeAbandonedModal = () => {
    navigation.goBack();
  };

  return (
    <Modal
      isVisible={visible}
      style={tw('flex justify-center items-center')}
      onBackdropPress={() => {
        closeAbandonedModal();
      }}>
      <ShadowContainer>
        <View style={tw('flex bg-white w-80 overflow-hidden p-2 rounded-xl')}>
          <View style={tw('flex items-center')}>
            <View style={tw('flex-row items-center justify-center w-full')}>
              <Text style={tw('text-3xl mb-1')}>유기 동물 신고</Text>
              <TouchableOpacity
                onPress={() => {
                  closeAbandonedModal();
                }}
                style={tw('absolute right-0 pb-3')}>
                <Icon name="close" size={20} />
              </TouchableOpacity>
            </View>
            <Text style={tw('mt-2 text-lg mb-1 text-gray-500')}>
              보호가 필요한 유기동물 이라면?
            </Text>
            <TouchableOpacity
              style={tw('w-full h-16 pl-3 pr-3 pt-1 pb-1')}
              onPress={async () => {
                await Linking.openURL('tel:1577-0924');
              }}>
              <View
                style={[
                  { backgroundColor: '#D47F7F' },
                  tw(
                    'w-full h-full rounded-full flex-row justify-between items-center pl-3 pr-3',
                  ),
                ]}>
                <View style={tw('flex')}>
                  <MIcon name="phone-in-talk" size={28} color="white" />
                </View>
                <View style={tw('flex justify-center items-center')}>
                  <Text style={tw('text-white text-lg')}>
                    동물보호 상담센터
                  </Text>
                  <Text style={tw('text-white text-sm bottom-1')}>
                    1577-0924
                  </Text>
                </View>
                <View style={tw('flex')}>
                  <MIcon name="keyboard-arrow-right" size={26} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={tw('mt-3 text-lg mb-1 text-gray-500')}>
              주인이 있는 동물 같다면?
            </Text>
            <View style={tw('w-full h-16 pl-3 pr-3 pt-1 pb-1')}>
              <TouchableOpacity
                style={[
                  { backgroundColor: '#7FA7D4' },
                  tw(
                    'w-full h-full rounded-full flex-row justify-between items-center pl-3 pr-3',
                  ),
                ]}
                onPress={async () => {
                  setVisible(false);
                  navigation.replace(APP_NAVIGATION_CATCH_REPORT_STACK);
                }}>
                <View style={tw('flex')}>
                  <MIcon name="my-library-add" size={28} color="white" />
                </View>
                <View style={tw('flex justify-center items-center')}>
                  <Text style={tw('text-white text-lg')}>
                    목격신고 등록하기
                  </Text>
                </View>
                <View style={tw('flex')}>
                  <MIcon name="keyboard-arrow-right" size={26} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ShadowContainer>
    </Modal>
  );
};

export default Abandoned;
