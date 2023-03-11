import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { AppHelper } from '../../helper'

export const Loader = ({ visible }) => {
  return visible && (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator animating={true} color={AppHelper.material.green600} size={'large'} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    elevation: 10,
    zIndex: 10,
  }
})