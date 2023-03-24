import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { fontStyles } from '../../../styles'
import { AppHelper } from '../../../helper'

export const GetFeatured = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={[fontStyles[700], fontStyles.large22]}>Get Featured</Text>
        <Text style={[fontStyles[400], fontStyles.large, { marginVertical: 10 }]}>This feature will cost you 1000 PKR / Month</Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: AppHelper.material.grey300, padding: 10, borderRadius: 10, margin: 10 }}>
            <Text style={[fontStyles[400], fontStyles.large]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: AppHelper.material.green500, padding: 10, borderRadius: 10, margin: 10 }}>
            <Text style={[fontStyles[400], fontStyles.large, { color: "white" }]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
})