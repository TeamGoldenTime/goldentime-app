import React from 'react';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import tw from 'tailwind-rn';

import ShadowContainer from '../../../shared/ShadowContainer';

interface BackButtonProps {
  onClickBackButton: any;
}

const BackButton: React.FC<BackButtonProps> = ({ onClickBackButton }) => {
  return (
    <ShadowContainer style={tw('absolute left-3 top-12')}>
      <Pressable
        style={tw(
          'w-12 h-12 bg-white rounded-full items-center justify-center',
        )}
        onPress={onClickBackButton}>
        <MIcon name="arrow-back" size={32} />
      </Pressable>
    </ShadowContainer>
  );
};

export default BackButton;
