import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StackNavigationProp } from '@react-navigation/stack';

import Home from './Home';
import LostHome from './LostHome';
import { userState, UserType } from '../../states/authState';
import { API_BASE_INSTANCE } from '../../api/instance';
import Loading from '../../animations/Loading';

interface HomeProps {
  navigation: StackNavigationProp<any>;
}

const HomeIndex: React.FC<HomeProps> = ({ navigation }) => {
  const user: UserType | null = useRecoilValue(userState);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyLostPost = async () => {
      const result = await API_BASE_INSTANCE.get(
        `/pet/post/lost/${user.id}/me`,
      );

      setPosts(result.data.data);
      setLoading(false);
    };

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
