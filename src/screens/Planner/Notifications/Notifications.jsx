import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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
