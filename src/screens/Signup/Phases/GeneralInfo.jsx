import React from 'react'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { Text, View, StyleSheet, Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../assets'

export const GeneralInfo = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.wave} source={images.GeneralInfoWave}></Image>

      <View style={styles.ContentContainer}>
      <View style={styles.nameContainer}>
        <TextInput placeholder="First Name" style={styles.name}></TextInput>
        <TextInput placeholder="Last Name" style={styles.name}></TextInput>
      </View>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
  },
  ContentContainer:{
paddingStart:10,
paddingEnd:10
  },
  wave: {
    height: '25%',
    resizeMode: 'stretch',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  name: {
    backgroundColor: 'white',
    height: 35,
    width:"45%",
    borderRadius: 15,
    borderWidth: 1,
    paddingStart: 12,
  },
})
