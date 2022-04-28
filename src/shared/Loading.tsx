import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { loadingState } from '../states/modalState';

const Loading: React.FC = () => {
  const isLoading = useRecoilValue(loadingState);

  if (!isLoading) {
    return <></>;
  }

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
