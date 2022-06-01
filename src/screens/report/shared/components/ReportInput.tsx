import React from 'react';
import { Text, TextInput, View } from 'react-native';
import tw from 'tailwind-rn';

interface ReportInputProps {
  title: string;
  text: string;
  onChangeText: Function;
}

const ReportInput: React.FC<ReportInputProps> = ({
  title,
  text,
  onChangeText,
}) => {
  return (
    <View style={tw('mt-3')}>
      <Text style={tw('text-base text-gray-600 mb-3')}>{title}</Text>
      <TextInput
        style={[
          {
            borderBottomWidth: 1,
            borderBottomColor: '#737373',
            fontSize: 18,
          },
          tw('pt-1 pb-1'),
        ]}
        value={text}
        onChangeText={t => {
          onChangeText(t);
        }}
      />
    </View>
  );
};

export default ReportInput;
