import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AppHelper } from '../../helper'
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'

export const Pagination = ({ data, x, size }) => {
  return (
    <View style={styles.paginationContainer}>
      {
        data.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const widthAnimation = interpolate(
              x.value,
              [(index - 1) * size, index * size, (index + 1) * size],
              [10, 20, 10],
              Extrapolate.CLAMP,
            );
            const opacityAnimation = interpolate(
              x.value,
              [(index - 1) * size, index * size, (index + 1) * size],
              [0.5, 1, 0.5],
              Extrapolate.CLAMP,
            );

            return {
              width: widthAnimation,
              opacity: opacityAnimation
            }
          });
          return (
            <Animated.View key={index} style={[styles.dots, animatedDotStyle]} />
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dots: {
    height: 10,
    backgroundColor: AppHelper.material.green600,
    marginHorizontal: 10,
    borderRadius: 5
  }
})