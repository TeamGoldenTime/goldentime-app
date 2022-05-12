import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'tailwind-rn';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '../../shared/Container';
import { ReportItem } from './interface';
import Dog from '../../../assets/image/dog.jpeg';
import Dog3 from '../../../assets/image/dog3.jpeg';
import Dog4 from '../../../assets/image/dog4.jpeg';
import ReportCard from './components/ReportCard';
import Dog5 from '../../../assets/image/dog5.jpeg';
import Cat1 from '../../../assets/image/cat1.jpeg';
import Dog2 from '../../../assets/image/dog2.jpeg';
import Loading from '../../animations/Loading';

const CATEGORY_LIST = [
  {
    name: '전체',
    value: 'all',
  },
  {
    name: '강아지',
    value: 'dog',
  },
  {
    name: '고양이',
    value: 'cat',
  },
  {
    name: '기타',
    value: 'etc',
  },
];

const MOCK_REPORT_LIST_DATA: ReportItem[] = [
  {
    id: 1,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog,
  },
  {
    id: 2,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog3,
  },
  {
    id: 3,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog4,
  },
  {
    id: 4,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog5,
  },
  {
    id: 5,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Cat1,
  },
  {
    id: 6,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog2,
  },
  {
    id: 7,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Cat1,
  },
  {
    id: 8,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog2,
  },
  {
    id: 9,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Cat1,
  },
  {
    id: 10,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog2,
  },
  {
    id: 10,
    title: '강아지/시바견/믹스',
    location: '서울시 동작구 흑석동 중앙대학교 310관 앞',
    image: Dog2,
  },
];

interface LostReportListProps {
  navigation: StackNavigationProp<any>;
}

const LostReportList: React.FC<LostReportListProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeCategoryStyle = {
    padding: 3,
    borderBottomColor: '#EEB015',
    borderBottomWidth: 2,
  };

  const onClickCategory = (value: string) => {
    setActiveCategory(value);
  };

  const _renderItem: any = ({ item }: { item: ReportItem }) => (
    <View style={tw('flex-1 ml-1 mb-5')}>
      <ReportCard item={item} width="44%" height="20%" />
    </View>
  );

  const onRefreshList = () => {
    setIsRefreshing(true);

    //TODO:: API콜
    // setIsRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    //TODO :: API 콜
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [activeCategory]);

  return (
    <SafeAreaView style={tw('flex-1 bg-white')}>
      <Container>
        <View style={tw('pt-3 flex-row justify-center items-center bg-white')}>
          <TouchableOpacity
            style={tw('absolute top-3 left-2')}
            onPress={() => {
              navigation.goBack();
            }}>
            <MIcon name="arrow-back" size={32} />
          </TouchableOpacity>
          <Text style={tw('text-3xl')}>분실 신고 목록</Text>
        </View>
        <View style={tw('pt-5 bg-white')}>
          <View style={tw('pl-10 pr-10 flex-row justify-between')}>
            {CATEGORY_LIST.map(category => {
              return category.value === activeCategory ? (
                <Pressable style={activeCategoryStyle} key={category.value}>
                  <Text style={tw('text-lg')}>{category.name}</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={{ padding: 3 }}
                  onPress={() => onClickCategory(category.value)}
                  key={category.value}>
                  <Text style={tw('text-lg')}>{category.name}</Text>
                </Pressable>
              );
            })}
            <Pressable style={{ padding: 3 }}>
              <MCIcon name="filter-variant" size={26} />
            </Pressable>
          </View>
        </View>
        {isLoading ? (
          <View style={tw('flex-1 justify-center items-center')}>
            <Loading />
          </View>
        ) : (
          <FlatList
            style={tw('flex-1 pl-3 pr-3 pt-3 mt-1')}
            data={MOCK_REPORT_LIST_DATA}
            renderItem={_renderItem}
            numColumns={2}
            keyExtractor={item => String(item.id)}
            onRefresh={onRefreshList}
            refreshing={isRefreshing}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};

export default LostReportList;
