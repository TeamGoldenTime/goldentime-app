import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { SvgXml } from 'react-native-svg';
import { ImageLibraryOptions } from 'react-native-image-picker/lib/typescript/types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import tw from 'tailwind-rn';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';

import { stepper1 } from './components/stepper1';

interface LostReportImageProps {
  navigation: StackNavigationProp<any>;
}

const LostReportImage: React.FC<LostReportImageProps> = ({ navigation }) => {
  const [images, setImages] = useState<ImagePickerResponse | null>(null);

  const loadImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 0,
    };

    const result: ImagePickerResponse = await launchImageLibrary(options);

    if (result?.didCancel) {
      setImages(null);
      return;
    }
    setImages(result);
  };

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <View style={tw('flex-row mt-3 justify-center items-center')}>
        <TouchableOpacity
          style={tw('absolute left-2')}
          onPress={() => {
            navigation.goBack();
          }}>
          <MIcon name="arrow-back" size={32} />
        </TouchableOpacity>
        <Text style={tw('text-3xl')}>분실신고</Text>
      </View>
      <View style={tw('flex items-center pt-5')}>
        <SvgXml xml={stepper1} />
      </View>
      <View style={tw('flex-1 p-6')}>
        <Text style={tw('text-2xl font-extralight')}>
          {'반려동물의 사진을\n업로드 해주세요.'}
        </Text>
        <Text style={tw('text-sm text-gray-500')}>
          {'이미지 분석 AI를 통해\n유사한 동물을 검색합니다.'}
        </Text>
        <View
          style={[
            {
              height: hp('51%'),
            },
            tw('w-full p-5'),
          ]}>
          <Pressable
            onPress={loadImage}
            style={tw('flex-1 border-2 border-dotted bg-gray-100')}>
            {images ? (
              <View style={tw('flex-row flex-wrap p-1')}>
                {images.assets &&
                  images.assets.map(({ uri }) => {
                    return (
                      <Image
                        key={uri}
                        resizeMode="cover"
                        resizeMethod="scale"
                        style={{
                          width: wp('23%'),
                          height: hp('10%'),
                          marginLeft: 4,
                        }}
                        source={{ uri: uri }}
                      />
                    );
                  })}
              </View>
            ) : (
              <View style={tw('flex-1 justify-center items-center')}>
                <Text style={tw('text-lg text-gray-500')}>이곳을 눌러</Text>
                <Text style={tw('text-lg text-gray-500')}>
                  사진을 업로드하세요.
                </Text>
              </View>
            )}
          </Pressable>
        </View>
        <TouchableOpacity
          style={[
            { backgroundColor: '#EEB015' },
            tw(
              'mt-3 self-center w-full h-14 rounded-xl justify-center items-center',
            ),
          ]}
          onPress={() => {
            // TODO: navigation 함수로 이미지 데이터 전달하기

            navigation.push('step2');
          }}>
          <Text style={tw('text-xl text-white font-bold')}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LostReportImage;
