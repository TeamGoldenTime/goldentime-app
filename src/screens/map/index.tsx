import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-rn';
import { StackNavigationProp } from '@react-navigation/stack';

import ReportMarker from './components/ReportMarker';
import Loading from '../../animations/Loading';
import { ReportItem } from '../home/interface';
import { API_BASE_INSTANCE } from '../../api/instance';
import { ILocationState } from '../../states/formState';
import { APP_NAVIGATION_MAIN } from '../../navigations/constants';
import BackButton from './components/BackButton';
import MapSelect from './components/MapSelect';
import { CATCH_MAP, LOST_MAP } from './constants';
import { CATCH_COLOR, LOST_COLOR } from '../../shared/styles';

interface ReportMapProps {
  navigation: StackNavigationProp<any>;
}

const ReportMap: React.FC<ReportMapProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMap, setCurrentMap] = useState(LOST_MAP);
  const [location, setLocation] = useState<ILocationState | null>(null);
  const [reportList, setReportList] = useState<ReportItem[]>([]);

  const requestPermission = async () => {
    return Geolocation.requestAuthorization('whenInUse');
  };

  const gerPermission = async () => {
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

  const fetchingLostPost = async () => {
    setIsLoading(true);
    const result = await API_BASE_INSTANCE.get('/pet/post/lost');
    const lostPostData = result.data.data;
    const lostReportItems: ReportItem[] = lostPostData.map((post: any) => {
      return {
        id: post.id,
        title: `강아지/${post.kind}/${post.color}`,
        location: post.area,
        image: post.images[0]?.location,
        latitude: post.latitude,
        longitude: post.longitude,
      };
    });
    setReportList(lostReportItems);
    setIsLoading(false);
  };

  const fetchingCatchPost = async () => {
    setIsLoading(true);
    const result = await API_BASE_INSTANCE.get('/pet/post/catch');
    const lostPostData = result.data.data;
    const lostReportItems: ReportItem[] = lostPostData.map((post: any) => {
      return {
        id: post.id,
        title: `강아지/${post.kind}/${post.color}`,
        location: post.area,
        image: post.images[0]?.location,
        latitude: post.latitude,
        longitude: post.longitude,
      };
    });
    setReportList(lostReportItems);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentMap === LOST_MAP) {
      fetchingLostPost();
    } else if (currentMap === CATCH_MAP) {
      fetchingCatchPost();
    }
  }, [currentMap]);

  useEffect(() => {
    gerPermission();
  }, []);

  const onClickBackButton = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: APP_NAVIGATION_MAIN }],
    });
  };

  const changeCurrentMap = (map: string) => {
    setCurrentMap(map);
  };

  if (!location || isLoading) {
    return <Loading />;
  }

  return (
    <View style={tw('flex-1')}>
      <MapView
        style={tw('flex-1')}
        showsMyLocationButton={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsScale={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}>
        {reportList.map(report => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}>
            {currentMap === LOST_MAP ? (
              <ReportMarker imageUrl={report.image} color={LOST_COLOR} />
            ) : (
              <ReportMarker imageUrl={report.image} color={CATCH_COLOR} />
            )}
          </Marker>
        ))}
      </MapView>
      <MapSelect currentMap={currentMap} changeCurrentMap={changeCurrentMap} />
      <BackButton onClickBackButton={onClickBackButton} />
    </View>
  );
};

export default ReportMap;
