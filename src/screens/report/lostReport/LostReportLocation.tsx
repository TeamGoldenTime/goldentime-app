import React, { useEffect, useState } from 'react';
import tw from 'tailwind-rn';
import { Alert, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  IImageSrc,
  ILocationState,
  lostFormState,
} from '../../../states/formState';
import { StackNavigationProp } from '@react-navigation/stack';

import ReportLayout from '../shared/components/ReportLayout';
import { stepper3 } from '../shared/components/stepper3';
import ReportInput from '../shared/components/ReportInput';
import marker from '../../../../assets/image/marker.png';
import { uploadImageToS3 } from '../../../api/s3';
import { Asset } from 'react-native-image-picker';
import { SaveLostPostDto } from '../../../api/dto/SavePostDto';
import { API_BASE_INSTANCE } from '../../../api/instance';
import { userState } from '../../../states/authState';
import {
  APP_NAVIGATION_MAIN,
  LOST_REPORT_RESULT,
  LOST_REPORT_STEP3,
} from '../../../navigations/constants';
import { loadingState } from '../../../states/modalState';

interface LostReportLocationProps {
  navigation: StackNavigationProp<any>;
}

const LostReportLocation: React.FC<LostReportLocationProps> = ({
  navigation,
}) => {
  const [location, setLocation] = useState<ILocationState | null>(null);
  const [area, setArea] = useState('');
  const user = useRecoilValue(userState);
  const formData = useRecoilValue(lostFormState);
  const setLoading = useSetRecoilState(loadingState);

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

  const onClickFinishButton = async () => {
    setLoading(true);
    //S3??? ????????? ?????????
    const imagePromises: any[] = [];
    const images: Asset[] = formData.pickerImages;
    images?.map(image => {
      imagePromises.push(uploadImageToS3(image));
    });

    const imageResult: IImageSrc[] = await Promise.all(imagePromises);

    const sendFormData: SaveLostPostDto = {
      age: formData.age,
      color: formData.color,
      date: formData.date,
      kind: formData.kind,
      name: formData.name,
      remark: formData.desc,
      latitude: location?.latitude,
      longitude: location?.longitude,
      area: area,
      images: imageResult,
      gender: formData.gender,
      userId: user?.id,
    };

    try {
      const result = await API_BASE_INSTANCE.post(
        '/pet/post/lost',
        sendFormData,
      );
      const id = result.data.data.id;
      setLoading(false);
      navigation.push(LOST_REPORT_RESULT, { id });
      console.log(result.data);
    } catch (e) {
      setLoading(false);
      Alert.alert('????????? ??????????????????.');
      navigation.reset({
        index: 0,
        routes: [{ name: APP_NAVIGATION_MAIN }],
      });
      console.log(JSON.stringify(e));
    }
  };

  const onChangeArea = (text: string) => {
    setArea(text);
  };

  return (
    <ReportLayout
      type={LOST_REPORT_STEP3}
      navigation={navigation}
      title="????????????"
      mainDescription={'??????????????? ???????????????\n??????????????????.'}
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
                ????????? ????????? ????????? ???????????????
              </Text>
            </View>
          </>
        )}
        <ReportInput title="????????????" text={area} onChangeText={onChangeArea} />
      </View>
    </ReportLayout>
  );
};

export default LostReportLocation;
