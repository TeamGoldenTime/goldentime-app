import React from 'react';
import tw from 'tailwind-rn';
import { Text, TouchableOpacity, View } from 'react-native';

import { MapType } from '../constants';
import ShadowContainer from '../../../shared/ShadowContainer';
import { CATCH_COLOR, LOST_COLOR } from '../../../shared/styles';

interface MapSelectProps {
  currentMap: MapType;
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
            if (currentMap !== MapType.LOST) {
              changeCurrentMap(MapType.LOST);
            }
          }}
          style={[
            currentMap === MapType.LOST && {
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
              currentMap === MapType.LOST && {
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
            if (currentMap !== MapType.CATCH) {
              changeCurrentMap(MapType.CATCH);
            }
          }}
          style={[
            currentMap === MapType.CATCH && {
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
              currentMap === MapType.CATCH && {
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
