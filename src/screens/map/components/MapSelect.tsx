import React from 'react';
import tw from 'tailwind-rn';
import { Text, TouchableOpacity, View } from 'react-native';

import { CATCH_MAP, LOST_MAP } from '../constants';
import ShadowContainer from '../../../shared/ShadowContainer';
import { CATCH_COLOR, LOST_COLOR } from '../../../shared/styles';

interface MapSelectProps {
  currentMap: string;
  changeCurrentMap: Function;
}

const MapSelect: React.FC<MapSelectProps> = ({
  currentMap,
  changeCurrentMap,
}) => {
  return (
    <ShadowContainer
      style={tw('absolute top-10 w-full h-16 items-center justify-center')}>
      <View
        style={[
          { borderColor: '#000000', borderWidth: 1 },
          tw('flex-row h-12 w-36 rounded-xl'),
        ]}>
        <TouchableOpacity
          onPress={() => {
            if (currentMap !== LOST_MAP) {
              changeCurrentMap(LOST_MAP);
            }
          }}
          style={[
            currentMap === LOST_MAP && {
              backgroundColor: LOST_COLOR,
              opacity: 0.8,
            },
            {
              borderTopLeftRadius: 11,
              borderBottomLeftRadius: 11,
            },
            tw('flex-1 items-center justify-center'),
          ]}>
          <Text
            style={[
              currentMap === LOST_MAP && {
                color: 'white',
              },
              ,
              tw('text-lg font-semibold'),
            ]}>
            분실
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (currentMap !== CATCH_MAP) {
              changeCurrentMap(CATCH_MAP);
            }
          }}
          style={[
            currentMap === CATCH_MAP && {
              backgroundColor: CATCH_COLOR,
              opacity: 0.8,
            },
            {
              borderTopRightRadius: 11,
              borderBottomRightRadius: 11,
              borderLeftWidth: 1,
            },
            tw('flex-1 items-center justify-center'),
          ]}>
          <Text
            style={[
              currentMap === CATCH_MAP && {
                color: 'white',
              },
              ,
              tw('text-lg font-semibold'),
            ]}>
            목격
          </Text>
        </TouchableOpacity>
      </View>
    </ShadowContainer>
  );
};

export default MapSelect;
