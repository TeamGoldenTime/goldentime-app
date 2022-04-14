import React, { useEffect, useState } from 'react';
import tw from 'tailwind-rn';
import { Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { StackNavigationProp } from '@react-navigation/stack';

import ReportLayout from './components/ReportLayout';
import { stepper3 } from './components/stepper3';
import ReportInput from './components/ReportInput';
import marker from '../../../assets/image/marker.png';

interface LostReportLocationProps {
  navigation: StackNavigationProp<any>;
}

interface LocationStateProps {
  latitude: number;
  longitude: number;
}

const LostReportLocation: React.FC<LostReportLocationProps> = ({
  navigation,
}) => {
  const [location, setLocation] = useState<LocationStateProps | null>(null);
  const [area, setArea] = useState('');

  const requestPermission = async () => {
    return Geolocation.requestAuthorization('whenInUse');
  };

  const run = async () => {
    const result = await requestPermission();

    if (result === 'granted') {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  };

  useEffect(() => {
    run();
  }, []);

  const onClickBackButton = () => {
    navigation.goBack();
  };

  const onClickFinishButton = () => {
    //TODO : 폼 작성 완료 후 동작

    navigation.reset({
      index: 0,
      routes: [{ name: 'main' }],
    });
  };

  const onChangeArea = (text: string) => {
    setArea(text);
  };

  return (
    <ReportLayout
      type="step3"
      navigation={navigation}
      title="분실신고"
      mainDescription={'반려동물의 분실위치를\n지정해주세요.'}
      subDescription=""
      stepper={stepper3}
      onClickBackButton={onClickBackButton}
      onClickFinishButton={onClickFinishButton}>
      <View
        style={[
          {
            height: hp('54%'),
          },
          tw('w-full p-1 pr-3'),
        ]}>
        {location && (
          <>
            <MapView
              style={tw('flex-1')}
              initialRegion={{
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
              onRegionChange={region => {
                setLocation({
                  latitude: region.latitude,
                  longitude: region.longitude,
                });
              }}
              onRegionChangeComplete={region => {
                setLocation({
                  latitude: region.latitude,
                  longitude: region.longitude,
                });
              }}>
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                image={marker}
              />
            </MapView>
            <View
              style={[
                { opacity: 0.5 },
                tw(
                  'absolute self-center w-64 h-8 bg-black rounded-xl mt-3 items-center justify-center',
                ),
              ]}>
              <Text style={tw('text-white text-base text-center')}>
                지도를 움직여 위치를 지정하세요
              </Text>
            </View>
          </>
        )}
        <ReportInput title="상세지역" text={area} onChangeText={onChangeArea} />
      </View>
    </ReportLayout>
  );
};

export default LostReportLocation;
