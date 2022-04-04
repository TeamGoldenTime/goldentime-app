import React from 'react';
import { Image, ImageProps, Text, View } from 'react-native';
import tw from 'tailwind-rn';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import CardContainer from '../../../shared/CardContainer';

interface ModalReportCardProps {
  title: string;
  description: string;
  bgColor: string;
  image: ImageProps;
}

const ModalReportCard: React.FC<ModalReportCardProps> = ({
  title,
  description,
  bgColor,
  image,
}) => {
  return (
    <CardContainer>
      <View
        style={[
          { backgroundColor: bgColor },
          tw('flex-row w-full h-24 justify-between rounded-xl'),
        ]}>
        <View style={tw('p-3 justify-center')}>
          <View style={tw('flex-row items-center')}>
            <Text style={tw('text-2xl font-semibold')}>{title}</Text>
            <MIcon name="keyboard-arrow-right" size={24} />
          </View>
          <Text style={tw('text-base text-white')}>{description}</Text>
        </View>
        <View style={tw('justify-center items-center')}>
          <Image source={image} resizeMode="contain" style={tw('w-20 h-20')} />
        </View>
      </View>
    </CardContainer>
  );
};

export default ModalReportCard;
