import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StackNavigationProp } from '@react-navigation/stack';

import Home from './Home';
import LostHome from './LostHome';
import { userState, UserType } from '../../states/authState';
import { API_BASE_INSTANCE } from '../../api/instance';
import Loading from '../../animations/Loading';
import Geolocation from 'react-native-geolocation-service';
import { ILocationState } from '../../states/formState';

interface HomeProps {
  navigation: StackNavigationProp<any>;
}

const HomeIndex: React.FC<HomeProps> = ({ navigation }) => {
  const user: UserType | null = useRecoilValue(userState);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState<ILocationState | null>(null);

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

  const fetchMyLostPost = async () => {
    if (!user) return;
    const result = await API_BASE_INSTANCE.get(`/pet/post/lost/${user.id}/me`);

    setPosts(result.data.data);
    setLoading(false);
  };

  useEffect(() => {
    gerPermission();

    if (!user) {
      setLoading(false);
      return;
    }

    fetchMyLostPost();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (posts.length === 0) {
    return <Home navigation={navigation} />;
  } else {
    return <LostHome navigation={navigation} posts={posts} />;
  }
};

export default HomeIndex;
