import React, { useEffect, useRef, useState } from 'react';
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
import BackButton from './components/BackButton';
import MapSelect from './components/MapSelect';
import { MapType } from './constants';
import { CATCH_COLOR, LOST_COLOR } from '../../shared/styles';
import MarkerDetail from './components/MarkerDetail';
import { postToReportItems } from '../../shared/utils';
import {
  APP_NAVIGATION_CATCH_REPORT_DETAIL,
  APP_NAVIGATION_LOST_REPORT_DETAIL,
} from '../../navigations/constants';

interface ReportMapProps {
  navigation: StackNavigationProp<any>;
}

const ReportMap: React.FC<ReportMapProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMap, setCurrentMap] = useState(MapType.LOST);
  const [location, setLocation] = useState<ILocationState | null>(null);
  const [reportList, setReportList] = useState<ReportItem[]>([]);
  const [currentReport, setCurrentReport] = useState<ReportItem | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const map = useRef<any>(null);

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
    const lostReportItems: ReportItem[] = postToReportItems(lostPostData);
    setReportList(lostReportItems);
    setIsLoading(false);
  };

  const fetchingCatchPost = async () => {
    setIsLoading(true);
    const result = await API_BASE_INSTANCE.get('/pet/post/catch');
    const lostPostData = result.data.data;
    const lostReportItems: ReportItem[] = postToReportItems(lostPostData);
    setReportList(lostReportItems);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentMap === MapType.LOST) {
      fetchingLostPost();
    } else if (currentMap === MapType.CATCH) {
      fetchingCatchPost();
    }
  }, [currentMap]);

  useEffect(() => {
    gerPermission();
  }, []);

  const onClickBackButton = () => {
    navigation.goBack();
  };

  const changeCurrentMap = (changedMap: MapType) => {
    setCurrentMap(changedMap);
  };

  const onClickReport = (id: number) => {
    currentMap === MapType.LOST
      ? navigation.push(APP_NAVIGATION_LOST_REPORT_DETAIL, { id })
      : navigation.push(APP_NAVIGATION_CATCH_REPORT_DETAIL, { id });
  };

  if (!location || isLoading) {
    return <Loading />;
  }

  return (
    <View style={tw('flex-1')}>
      <MapView
        style={tw('flex-1')}
        ref={current => (map.current = current)}
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
            onPress={() => {
              map.current.animateCamera({
                center: {
                  latitude: report.latitude,
                  longitude: report.longitude,
                },
              });
              setCurrentReport(report);
              setDetailVisible(true);
            }}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}>
            {currentMap === MapType.LOST ? (
              <ReportMarker imageUrl={report.image} color={LOST_COLOR} />
            ) : (
              <ReportMarker imageUrl={report.image} color={CATCH_COLOR} />
            )}
          </Marker>
        ))}
      </MapView>
      <MapSelect currentMap={currentMap} changeCurrentMap={changeCurrentMap} />
      <BackButton onClickBackButton={onClickBackButton} />
      <MarkerDetail
        currentMap={currentMap}
        currentReport={currentReport}
        detailVisible={detailVisible}
        setDetailVisible={setDetailVisible}
        onClickReport={onClickReport}
      />
    </View>
  );
};

export default ReportMap;
