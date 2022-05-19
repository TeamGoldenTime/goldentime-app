import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-rn';
import Carousel from 'react-native-snap-carousel';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../shared/Container';
import { ReportItem } from './interface';
import { APP_COLOR_BLACK, CATCH_COLOR, LOST_COLOR } from '../../shared/styles';
import ReportTag from './components/ReportTag';
import Loading from '../../animations/Loading';
import { API_BASE_INSTANCE } from '../../api/instance';
import { postToReportItem, toDateString } from '../../shared/utils';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { APP_NAVIGATION_CATCH_REPORT_STACK } from '../../navigations/constants';

const { width: screenWidth } = Dimensions.get('window');

interface ReportDetailProps {
  route: StackNavigationProp<any>;
  navigation: StackNavigationProp<any>;
}

const LostReportDetail: React.FC<ReportDetailProps> = ({
  navigation,
  route,
}) => {
  const id = route.params?.id;
  const [isLoading, setLoading] = useState(true);
  const [currentReport, setCurrentReport] = useState<ReportItem | any>(null);

  useEffect(() => {
    fetchingLostPostById();
  }, []);

  //TODO :: 이 부분 post에 해당하는 정보 담을 수 있는 타입 리팩토링 하기
  const fetchingLostPostById = async () => {
    setLoading(true);
    const result = await API_BASE_INSTANCE.get(`/pet/post/lost/${id}`);
    const data: ReportItem = postToReportItem(result.data.data);
    setCurrentReport(data);
    setLoading(false);
  };

  const renderItem: any = ({ item }: any) => {
    return (
      <Image
        style={tw('w-full h-full')}
        source={{ uri: item.location }}
        resizeMode="cover"
      />
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <View style={tw('w-full h-80')}>
        <Carousel
          layout="default"
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          data={currentReport?.images}
          renderItem={renderItem}
          loop={true}
        />
      </View>
      <View style={tw('w-full h-24 bg-white p-4')}>
        <Text style={tw('text-3xl font-semibold')}>{currentReport?.title}</Text>
        <Text style={tw('text-xl')}>
          작성자 : {currentReport?.writer?.name}
        </Text>
        <ReportTag
          color={currentReport?.type === 'LOST' ? LOST_COLOR : CATCH_COLOR}
        />
      </View>
      <View style={tw('flex w-full h-28 mt-1 bg-white p-5 justify-center')}>
        <Text style={tw('text-xl')}>
          <MCIcon name="calendar-blank" color={APP_COLOR_BLACK} size={20} />{' '}
          분실날짜 : {toDateString(currentReport?.date)}
        </Text>
        {/*TODO:: 시군구 주소로 변경*/}
        <Text style={tw('text-xl')} numberOfLines={1}>
          <MCIcon name="map-marker" color={APP_COLOR_BLACK} size={20} />{' '}
          분실지역 : {currentReport?.area}
        </Text>
        <Text style={tw('text-xl ')} numberOfLines={1}>
          <FontAwesome5Icon
            name="map-signs"
            color={APP_COLOR_BLACK}
            size={20}
          />{' '}
          상세지역 : {currentReport?.area}
        </Text>
      </View>
      <ScrollView style={tw('flex-1 mt-1 bg-white p-5')}>
        <Text style={tw('text-xl')}>· 이름 : {currentReport?.name}</Text>
        <Text style={tw('text-xl')}>· 성별 : {currentReport?.gender}</Text>
        <Text style={tw('text-xl')}>· 나이 : {currentReport?.age}</Text>
        <Text style={tw('text-xl')}>· 상세정보 :{currentReport?.remark}</Text>
      </ScrollView>
      <View
        style={tw(
          'absolute w-full h-20 bg-white items-center justify-center bottom-5',
        )}>
        <Pressable
          onPress={() => navigation.push(APP_NAVIGATION_CATCH_REPORT_STACK)}
          style={[
            { backgroundColor: APP_COLOR_BLACK },
            tw('w-36 h-14 rounded-xl items-center justify-center'),
          ]}>
          <Text style={tw('text-white text-2xl font-semibold')}>목격신고</Text>
        </Pressable>
      </View>
      <TouchableOpacity
        style={tw('absolute top-9 left-2')}
        onPress={() => {
          //TODO :: 로그인 검증하는거 신고 useEffect에서 처리하도록.
          navigation.goBack();
        }}>
        <MIcon name="arrow-back" size={32} color="white" />
      </TouchableOpacity>
    </Container>
  );
};

export default LostReportDetail;
