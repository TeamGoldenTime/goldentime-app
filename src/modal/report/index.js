import React, { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

import ModalReportCard from './components/ModalReportCard';
import Missing from '../../../assets/image/missing.png';
import Search from '../../../assets/image/search.png';

const ReportModal = ({ navigation }) => {
  const [visible, setVisible] = useState(true);

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
            onPress={() => {
              setVisible(false);
              navigation.replace('lostReportStack');
            }}>
            <ModalReportCard
              title="분실신고"
              description="반려동물을 잃어버리셨나요?"
              image={Missing}
              bgColor="#E76A6A"
            />
          </TouchableOpacity>
          <ModalReportCard
            title="목격신고"
            description="반려동물을 목격하셨나요?"
            image={Search}
            bgColor="#59C4DB"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
