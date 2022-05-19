import React from 'react';
import { Dimensions, View } from 'react-native';
import tw from 'tailwind-rn';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { InfoItem } from '../interface';

const { width: screenWidth } = Dimensions.get('window');

interface InfoCarouselProps {
  items: InfoItem[];
}

const InfoCarousel: React.FC<InfoCarouselProps> = ({ items }) => {
  const renderItem: any = ({ item }: any, parallaxProps: any) => {
    return (
      <ParallaxImage
        source={item.image}
        containerStyle={tw('w-full h-full rounded-xl')}
        style={[{ resizeMode: 'contain' }, tw('w-full h-full')]}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    );
  };

  return (
    <View
      style={[
        { height: hp('19%') },
        tw('flex bg-white pt-2 pb-2 mt-2 items-center justify-center'),
      ]}>
      <Carousel
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 60}
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
