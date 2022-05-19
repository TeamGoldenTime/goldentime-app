import React, { useEffect, useState } from 'react';
import tw from 'tailwind-rn';
import { Alert, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  catchFormState,
  IImageSrc,
  ILocationState,
} from '../../../states/formState';
import { StackNavigationProp } from '@react-navigation/stack';

import ReportLayout from '../shared/components/ReportLayout';
import { stepper3 } from '../shared/components/stepper3';
import ReportInput from '../shared/components/ReportInput';
import marker from '../../../../assets/image/marker.png';
import { uploadImageToS3 } from '../../../api/s3';
import { Asset } from 'react-native-image-picker';
import { SaveCatchPostDto } from '../../../api/dto/SavePostDto';
import { API_BASE_INSTANCE } from '../../../api/instance';
import { userState } from '../../../states/authState';
import {
  APP_NAVIGATION_MAIN,
  CATCH_REPORT_RESULT,
  CATCH_REPORT_STEP3,
} from '../../../navigations/constants';
import { loadingState } from '../../../states/modalState';

interface CatchReportLocationProps {
  navigation: StackNavigationProp<any>;
}

const CatchReportLocation: React.FC<CatchReportLocationProps> = ({
  navigation,
}) => {
  const setLoading = useSetRecoilState(loadingState);
  const [location, setLocation] = useState<ILocationState | null>(null);
  const [area, setArea] = useState('');
  const user = useRecoilValue(userState);
  const formData = useRecoilValue(catchFormState);

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
    //S3에 이미지 업로드
    const imagePromises: any[] = [];
    const images: Asset[] | undefined = formData.imagePickerResponse?.assets;
    images?.map(image => {
      imagePromises.push(uploadImageToS3(image));
    });

    const imageResult: IImageSrc[] = await Promise.all(imagePromises);

    const sendFormData: SaveCatchPostDto = {
      color: formData.color,
      date: formData.date,
      kind: formData.kind,
      remark: formData.desc,
      gender: formData.gender,
      latitude: location?.latitude,
      longitude: location?.longitude,
      area: area,
      images: imageResult,
      userId: user?.id,
    };

    try {
      const result = await API_BASE_INSTANCE.post(
        '/pet/post/catch',
        sendFormData,
      );
      setLoading(false);
      // TODO:: 목격신고 유사 분석 구현
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: CATCH_REPORT_RESULT }],
      // });
      navigation.reset({
        index: 0,
        routes: [{ name: APP_NAVIGATION_MAIN }],
      });
      console.log(result.data);
    } catch (e) {
      setLoading(false);
      Alert.alert('오류가 발생했습니다.');
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
      type={CATCH_REPORT_STEP3}
      navigation={navigation}
      title="목격신고"
      mainDescription={'반려동물의 목격위치를\n지정해주세요.'}
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

export default CatchReportLocation;
