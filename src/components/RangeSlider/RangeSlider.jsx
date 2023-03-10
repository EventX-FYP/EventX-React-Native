import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, useAnimatedProps, runOnJS } from 'react-native-reanimated';
import { AppHelper } from '../../helper';

export const RangeSlider = ({ sliderWidth, min, max, step, onValueChange }) => {
  const position1 = useSharedValue(0);
  const position2 = useSharedValue(sliderWidth);
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const zIndex1 = useSharedValue(0);
  const zIndex2 = useSharedValue(0);

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position1.value;
    },
    onActive: (e, ctx) => {
      opacity1.value = 1;
      if (ctx.startX + e.translationX < 0) {
        position1.value = 0;
      } else if (ctx.startX + e.translationX > position2.value) {
        position1.value = position2.value;
        zIndex1.value = 1;
        zIndex2.value = 0;
      } else {
        position1.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      opacity1.value = 0;
      runOnJS(onValueChange)({
        min: min + Math.floor(position1.value / (sliderWidth / ((max - min) / step))) * step,
        max: min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step,
      });
    },
  });

  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = position2.value;
    },
    onActive: (e, ctx) => {
      opacity2.value = 1;
      if (ctx.startX + e.translationX > sliderWidth) {
        position2.value = sliderWidth;
      } else if (ctx.startX + e.translationX < position1.value) {
        position2.value = position1.value;
        zIndex1.value = 0;
        zIndex2.value = 1;
      } else {
        position2.value = ctx.startX + e.translationX;
      }
    },
    onEnd: () => {
      opacity2.value = 0;
      runOnJS(onValueChange)({
        min: min + Math.floor(position1.value / (sliderWidth / ((max - min) / step))) * step,
        max: min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position1.value}],
    zIndex: zIndex1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{translateX: position2.value}],
    zIndex: zIndex2.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const opacityStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position1.value}],
    width: position2.value - position1.value,
  }));

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const minLabelText = useAnimatedProps(() => {
    return {
      text: `${min + Math.floor(position1.value / (sliderWidth / ((max - min) / step))) * step} PKR`,
    };
  });
  const maxLabelText = useAnimatedProps(() => {
    return {
      text: `${min + Math.floor(position2.value / (sliderWidth / ((max - min) / step))) * step} PKR`,
    };
  });
  return (
    <View style={[styles.sliderContainer, {width: sliderWidth}]}>
      <View style={[styles.sliderBack, {width: sliderWidth}]} />
      <Animated.View style={[sliderStyle, styles.sliderFront]} />
      <PanGestureHandler onGestureEvent={gestureHandler1}>
        <Animated.View style={[animatedStyle, styles.thumb]}>
          <Animated.View style={[opacityStyle, styles.label]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={minLabelText}
              editable={false}
              defaultValue={'0'}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={gestureHandler2}>
        <Animated.View style={[animatedStyle2, styles.thumb]}>
          <Animated.View style={[opacityStyle2, styles.label]}>
            <AnimatedTextInput
              style={styles.labelText}
              animatedProps={maxLabelText}
              editable={false}
              defaultValue={'0'}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  sliderBack: {
    height: 8,
    // backgroundColor: '#DFEAFB',
    backgroundColor: AppHelper.material.grey300,
    borderRadius: 20,
  },
  sliderFront: {
    height: 8,
    backgroundColor: AppHelper.material.green500,
    borderRadius: 20,
    position: 'absolute',
  },
  thumb: {
    left: -10,
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: AppHelper.material.green600,
    borderWidth: 5,
    borderRadius: 10,
  },
  label: {
    position: 'absolute',
    top: -40,
    bottom: 20,
    backgroundColor: AppHelper.material.green300,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 16,
    width: '100%',
  },
});
