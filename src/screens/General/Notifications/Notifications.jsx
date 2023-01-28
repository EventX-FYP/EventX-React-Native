import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native-ui-lib'

export const Notifications = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Actions Required</Text>
          
          <Text>Recent Searches</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
})
