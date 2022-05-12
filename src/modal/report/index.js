import React, { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import ModalReportCard from './components/ModalReportCard';
import Missing from '../../../assets/image/missing.png';
import Search from '../../../assets/image/search.png';
import { loginModalState } from '../../states/modalState';
import { sleep } from '../../shared/utils';
import { userState } from '../../states/authState';
import {
  APP_NAVIGATION_ABANDONED_MODAL,
  APP_NAVIGATION_LOST_REPORT_STACK,
} from '../../navigations/constants';

const ReportModal = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const user = useRecoilValue(userState);
  const setShowLoginModal = useSetRecoilState(loginModalState);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => navigation.goBack()}
      style={{ margin: 0 }}>
      <View
        style={[
          { borderTopLeftRadius: 15, borderTopRightRadius: 15 },
          tw('absolute bg-white w-full h-72 bottom-0 p-5'),
        ]}>
        <Pressable
          style={tw('absolute right-0 mr-2 mt-2')}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={26} />
        </Pressable>
        <View style={tw('flex w-full h-full justify-between pb-2 pt-6')}>
          <TouchableOpacity
            onPress={async () => {
              setVisible(false);
              navigation.goBack();
              if (!user) {
                await sleep(500);
                setShowLoginModal(true);
                return;
              }
              navigation.replace(APP_NAVIGATION_LOST_REPORT_STACK);
            }}>
            <ModalReportCard
              title="분실신고"
              description="반려동물을 잃어버리셨나요?"
              image={Missing}
              bgColor="#E76A6A"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              setVisible(false);
              await sleep(500);
              navigation.replace(APP_NAVIGATION_ABANDONED_MODAL);
            }}>
            <ModalReportCard
              title="유기신고"
              description="유기동물을 목격하셨나요?"
              image={Search}
              bgColor="#59C4DB"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
