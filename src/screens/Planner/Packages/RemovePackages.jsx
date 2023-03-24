import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppHelper } from '../../../helper';
import { fontStyles } from '../../../styles';

export const RemovePackages = ({ navigation, route }) => {
  const { description, image, packagePrice, title } = route.params;
  console.log(description, image, packagePrice, title);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>{packagePrice}</Text>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>{description}</Text>
      </View>
      <View style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end"}}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green500, padding: 10, borderRadius: 10, marginTop: 20, alignItems: "center", width: "45%" }}>
          <Text style={[fontStyles[600], fontStyles.large, { color: "#fff" }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.red500, padding: 10, borderRadius: 10, marginTop: 20, alignItems: "center", width: "45%" }}>
          <Text style={[fontStyles[600], fontStyles.large, { color: "#fff" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})