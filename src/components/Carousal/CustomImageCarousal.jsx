import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, useAnimatedRef } from 'react-native-reanimated';
import { Pagination } from '../Pagination/Pagination';

export const CustomImageCarousal = ({ data, autoPlay, pagination, aspectRatio }) => {
  const scrollViewRef = useAnimatedRef(null);
  const interval = useRef();
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const [newData] = useState([
    {key: 'spacer-left'},
    ...data,
    {key: 'spacer-right'},
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current.scrollTo({x: _offSet, y: 0});
      }, 2000);
    } else {
      clearInterval(interval.current);
    }
  }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          console.log(autoPlay);
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={e => {
          offSet.value = e.nativeEvent.contentOffset.x;
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8],
            );
            return {
              transform: [{ scale }],
            };
          });
          if (!item.image) {
            return <View style={{width: SPACER}} key={index} />;
          }
          return (
            <View style={{width: SIZE}} key={index}>
              <Animated.View style={[styles.imageContainer, style]}>
                <Image source={item.image} style={[styles.image, { aspectRatio: aspectRatio ?? 1 }]} />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    // aspectRatio: 1,
  },
});