import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tw from 'tailwind-rn';
import Container from '../../shared/Container';
import Header from '../../shared/Header';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { APP_COLOR } from '../../shared/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { petDataToReportItems, postToReportItem } from '../../shared/utils';
import ShadowContainer from '../../shared/ShadowContainer';
import { API_BASE_INSTANCE } from '../../api/instance';
import { ReportItem } from './interface';
import { APP_NAVIGATION_PET_DATA_REPORT_DETAIL } from '../../navigations/constants';
import LostHomeReportSection from './components/LostHomeReportSection';
import Loading from '../../animations/Loading';

interface LostHomeProps {
  navigation: StackNavigationProp<any>;
  posts: any;
}

const LostHome: React.FC<LostHomeProps> = ({ navigation, posts }) => {
  const [similarResponse, setSimilarResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const myLostPost: ReportItem = postToReportItem(posts[0]);

  const fetch = async () => {
    const result = await API_BASE_INSTANCE.get(
      `/pet/post/lost/similarity/${myLostPost.id}`,
    );

    console.log(result.data.data);
    setSimilarResponse(result.data.data);
    setIsLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const onRefreshing = async () => {
    setRefreshing(true);
    fetch();
  };

  const onClickReportItem = (id: number) => {
    navigation.push(APP_NAVIGATION_PET_DATA_REPORT_DETAIL, { id: id });
  };

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <Header />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
          }>
          <View style={[{ height: hp('21%') }, tw('bg-white mt-1 pb-4 pt-2')]}>
            <Text style={tw('ml-2 text-lg')}>나의 분실신고</Text>
            <ShadowContainer style={tw('mr-2 ml-2')}>
              <View style={[tw('w-full h-32 rounded-xl p-1')]}>
                <View
                  style={tw('flex-1 bg-white rounded-xl p-1 justify-center')}>
                  <View style={tw('flex-1 flex-row items-center')}>
                    <View style={[{ flex: 2 }, tw('flex-1 justify-center')]}>
                      <Image
                        source={{ uri: myLostPost.image }}
                        resizeMode="cover"
                        style={tw('w-24 h-24 rounded-2xl')}
                      />
                    </View>
                    <View
                      style={[
                        { flex: 3 },
                        tw('pt-2 pb-2 justify-center ml-5'),
                      ]}>
                      <Text
                        numberOfLines={1}
                        style={tw('text-2xl font-semibold')}>
                        {myLostPost.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={tw(
                          'text-lg font-extralight text-gray-600 tracking-tight',
                        )}>
                        <Icon name="map-marker" size={15} color={APP_COLOR} />
                        {myLostPost.addressName}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={tw(
                          'text-lg font-extralight text-gray-600 tracking-tight',
                        )}>
                        {myLostPost.area}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ShadowContainer>
          </View>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <LostHomeReportSection
                title="내 주변 유사신고 목록"
                data={petDataToReportItems(similarResponse?.related)}
                onClickReportItem={onClickReportItem}
              />
              <LostHomeReportSection
                title="전체 유사신고 목록"
                data={petDataToReportItems(similarResponse?.unrelated)}
                onClickReportItem={onClickReportItem}
              />
            </>
          )}
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default LostHome;
