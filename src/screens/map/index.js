import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-rn';

import GMarker from './components/GMarker';
import Loading from '../../animations/Loading';
import { View } from 'react-native';

const Map = () => {
  const [location, setLocation] = useState(null);

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

  if (!location) {
    return (
      <View style={tw('flex-1 justify-center items-center')}>
        <Loading />
      </View>
    );
  }

  return (
    <MapView
      style={tw('flex-1')}
      showsMyLocationButton={true}
      showsUserLocation={true}
      followsUserLocation={true}
      showsScale={true}
      initialRegion={{
        latitude: location?.latitude,
        longitude: location?.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}>
        <GMarker imageUrl="https://goldentime-image.s3.amazonaws.com/A8B823FE-F649-4BEB-9F07-69DF3646F21F.jpg" />
      </Marker>
    </MapView>
  );
};

export default Map;
