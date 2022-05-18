import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'tailwind-rn';
import Carousel from 'react-native-snap-carousel';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../shared/Container';
import { ReportItem } from './interface';
import { CATCH_COLOR, LOST_COLOR } from '../../shared/styles';
import ReportTag from './components/ReportTag';
import Loading from '../../animations/Loading';
import { API_BASE_INSTANCE } from '../../api/instance';
import { postToReportItem, toDateString } from '../../shared/utils';

const { width: screenWidth } = Dimensions.get('window');

interface ReportDetailProps {
  route: StackNavigationProp<any>;
  navigation: StackNavigationProp<any>;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ navigation, route }) => {
  const id = route.params?.id;
  const [isLoading, setLoading] = useState(true);
  const [writer, setWriter] = useState<any>(null);
  const [currentReport, setCurrentReport] = useState<ReportItem | any>(null);

  useEffect(() => {
    fetchingPostById();
  }, []);

  //TODO :: 이 부분 post에 해당하는 정보 담을 수 있는 타입 리팩토링 하기
  const fetchingPostById = async () => {
    setLoading(true);
    //TODO :: lost,post 구분 없이 id로 정보 가져오는 API 있어야 함.
    const result = await API_BASE_INSTANCE.get(`/pet/post/lost/${id}`);
    const data = postToReportItem(result.data.data);
    setWriter(result.data.data.writer);
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
        <Text style={tw('text-xl')}>작성자 : {writer?.name}</Text>
        <ReportTag
          color={currentReport?.type === 'LOST' ? LOST_COLOR : CATCH_COLOR}
        />
      </View>
      <View style={tw('flex w-full h-28 mt-1 bg-white p-5 justify-center')}>
        <Text style={tw('text-xl')}>
          분실날짜 : {toDateString(currentReport?.date)}
        </Text>
        {/*TODO:: 시군구 주소로 변경*/}
        <Text style={tw('text-xl')}>분실지역 : {currentReport?.area}</Text>
        <Text style={tw('text-xl')}>상세지역 : {currentReport?.area}</Text>
      </View>
      <View style={tw('w-full h-full mt-1 bg-white p-5')}>
        <Text style={tw('text-xl')}>이름 : {currentReport?.name}</Text>
        <Text style={tw('text-xl')}>성별 : {currentReport?.gender}</Text>
        <Text style={tw('text-xl')}>나이 : {currentReport?.age}</Text>
        <Text style={tw('text-xl')}>상세정보 : {currentReport?.remark}</Text>
      </View>
      <TouchableOpacity
        style={tw('absolute top-9 left-2')}
        onPress={() => {
          navigation.goBack();
        }}>
        <MIcon name="arrow-back" size={32} color="white" />
      </TouchableOpacity>
    </Container>
  );
};

export default ReportDetail;
