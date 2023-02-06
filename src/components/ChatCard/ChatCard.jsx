import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-ui-lib';
import { images } from '../../assets';
import { AppHelper, ScreenNavigator } from '../../helper';
import { fontStyles } from '../../styles';

export const ChatCard = ({ navigation, data }) => {
  return (
    <TouchableOpacity style={chatCardStyles.container} onPress={() => navigation.navigate(ScreenNavigator.Chat)}>
      <View style={chatCardStyles.imageContainer}>
        <Avatar source={data?.image} name={data.name} badgeProps={{ backgroundColor: AppHelper.material.green500, size: 12 }} autoColorsConfig />
      </View>
      <View style={chatCardStyles.informationContainer}>
        <Text style={[fontStyles[700], fontStyles.large18]}>{data.name}</Text>
        <Text style={[fontStyles[200], fontStyles.medium]}>{data.lastMessage}</Text>
      </View>
      <View style={chatCardStyles.timeContainer}>
        <Text style={[fontStyles.large]}>{data.date}</Text>
      </View>
    </TouchableOpacity>
  )
}























const chatCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  informationContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
});