import React from 'react';
import { Dimensions, View } from 'react-native';
import tw from 'tailwind-rn';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { InfoItem } from '../index';
const { width: screenWidth } = Dimensions.get('window');

interface InfoCarouselProps {
  items: InfoItem[];
}

const InfoCarousel: React.FC<InfoCarouselProps> = ({ items }) => {
  const renderItem: any = ({ item }: any, parallaxProps: any) => {
    return (
      <ParallaxImage
        source={item.image}
        containerStyle={tw('flex-1 rounded-xl')}
        style={{ resizeMode: 'contain' }}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    );
  };

  return (
    <View style={[{ height: hp('20%') }, tw('bg-white pt-2 pb-2')]}>
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 50}
        data={items}
        renderItem={renderItem}
        hasParallaxImages={true}
        loop={true}
        autoplay={true}
      />
    </View>
  );
};

export default InfoCarousel;
