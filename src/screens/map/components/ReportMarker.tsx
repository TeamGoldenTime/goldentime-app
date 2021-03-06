import React from 'react';
import { Image, View } from 'react-native';
import tw from 'tailwind-rn';

import ShadowContainer from '../../../shared/ShadowContainer';

interface ReportMarkerProps {
  imageUrl: string;
  color: string;
}

const ReportMarker: React.FC<ReportMarkerProps> = ({ imageUrl, color }) => {
  return (
    <ShadowContainer>
      <View
        style={[
          {
            borderTopLeftRadius: 100,
            borderBottomRightRadius: 100,
            borderBottomLeftRadius: 100,
            transform: [{ rotate: '135deg' }],
            backgroundColor: color,
          },
          tw(
            'w-14 h-14 mb-14 border-2 border-black justify-center items-center',
          ),
        ]}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={[
            {
              transform: [{ rotate: '-135deg' }],
            },
            tw('w-12 h-12 rounded-full'),
          ]}
        />
      </View>
    </ShadowContainer>
  );
};

export default ReportMarker;
