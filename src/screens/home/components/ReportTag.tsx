import React from 'react';
import { Text, View } from 'react-native';
import tw from 'tailwind-rn';
import { LOST_COLOR } from '../../../shared/styles';

interface ReportTagProps {
  color: string;
}

const ReportTag: React.FC<ReportTagProps> = ({ color }) => {
  return (
    <View
      style={[
        { backgroundColor: color },
        tw(
          'flex absolute w-16 h-8 rounded-xl items-center justify-center right-2 bottom-2',
        ),
      ]}>
      <Text style={tw('font-semibold text-lg text-white')}>
        {color === LOST_COLOR ? '분실' : '목격'}
      </Text>
    </View>
  );
};

export default ReportTag;
