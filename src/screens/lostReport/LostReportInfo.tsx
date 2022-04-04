import React from 'react';
import tw from 'tailwind-rn';
import { Text, TouchableOpacity, View } from 'react-native';

const LostReportInfo = ({ navigation }) => {
  return (
    <View style={tw('mt-20')}>
      <Text>step2</Text>
      <TouchableOpacity onPress={() => navigation.push('step3')}>
        <Text>next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LostReportInfo;
