import React from 'react';
import tw from 'tailwind-rn';
import { Text, TouchableOpacity, View } from 'react-native';

const LostReportLocation = ({ navigation }) => {
  return (
    <View style={tw('mt-20')}>
      <Text>step3</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'main' }],
          })
        }>
        <Text>next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LostReportLocation;
