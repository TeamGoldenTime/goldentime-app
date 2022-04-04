import React from 'react';
import tw from 'tailwind-rn';
import { Text, TouchableOpacity, View } from 'react-native';

const LostReportImage = ({ navigation }) => {
  return (
    <View style={tw('mt-20')}>
      <Text>step1</Text>
      <TouchableOpacity onPress={() => navigation.push('step2')}>
        <Text>next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LostReportImage;
