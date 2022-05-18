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
import ReportCard from './components/ReportCard';
import Loading from '../../animations/Loading';
import { API_BASE_INSTANCE } from '../../api/instance';
import { CATEGORY_LIST } from '../report/shared/constants';
import { postToReportItems } from '../../shared/utils';

interface LostReportListProps {
  navigation: StackNavigationProp<any>;
  route: StackNavigationProp<any>;
}

const LostReportList: React.FC<LostReportListProps> = ({
  navigation,
  route,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lostPostList, setLostPostList] = useState<ReportItem[]>([]);
  const onClickReportItem = route.params?.onClickReportItem;

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
      <ReportCard
        item={item}
        width="44%"
        height="20%"
        onClickReportItem={onClickReportItem}
      />
    </View>
  );

  const fetchingLostPost = async () => {
    const result = await API_BASE_INSTANCE.get('/pet/post/lost');
    const lostPostData = result.data.data;
    const lostReportItems: ReportItem[] = postToReportItems(lostPostData);
    lostReportItems.reverse();
    setLostPostList(lostReportItems);
  };

  const onRefreshList = async () => {
    setIsRefreshing(true);
    await fetchingLostPost();
    setIsRefreshing(false);
  };

  const getLostPostList = async () => {
    setIsLoading(true);
    await fetchingLostPost();
    setIsLoading(false);
  };

  useEffect(() => {
    getLostPostList();
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
            style={tw('flex-1 pl-3 pr-3 pt-3 mt-1 bg-white')}
            data={lostPostList}
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
