import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import tw from 'tailwind-rn';
import Moment from 'moment';

interface ReportDateProps {
  date: Date;
  onChangeDate: Function;
}

const ReportDate: React.FC<ReportDateProps> = ({ date, onChangeDate }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={tw('mt-3')}>
      <Text style={tw('text-base text-gray-600')}>분실날짜</Text>
      <Pressable
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#737373',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => setOpen(true)}>
        <Text style={[{ fontSize: 18 }, tw('mt-1 pb-1')]}>
          {Moment(date).format('YYYY-MM-DD')}
        </Text>
        <MCIcon name="calendar-month" size={24} style={tw('mr-2')} />
      </Pressable>
      <DatePicker
        modal
        date={date}
        open={open}
        onConfirm={d => {
          setOpen(false);
          onChangeDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
        confirmText="확인"
        cancelText="취소"
      />
    </View>
  );
};

export default ReportDate;
