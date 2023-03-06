import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../../helper'

const Banner = ({ navigation }) => {
  return (
    <View style={{ height: 50, backgroundColor: AppHelper.material.green500 }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, height: "100%" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>Task Management</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(ScreenNavigator.TaskManagementTask)}>
          <Icon name={"plus"} type={Icons.AntDesign} size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const TaskCard = ({ data, value }) => {
  const color = AppHelper.material.faintWhite
  const { height } = useWindowDimensions();
  return (
    <View style={{ display: "flex", flexDirection: "column", paddingHorizontal: 10, paddingVertical: 15, borderRadius: 10, backgroundColor: color, marginHorizontal: 15, marginVertical: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>{value}</Text>
      
      <ScrollView style={{ marginVertical: 15, maxHeight: height * 0.55 }}>
        {data.map((item, index) => (
          <View key={index} style={[styles.shadowEffect, { display: "flex", padding: 10, margin: 5, backgroundColor: "white", borderRadius: 4 }]}>
            <Text style={{ fontSize: 14, fontWeight: "400", color: AppHelper.material.grey900, marginLeft: 4 }}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between" }}>
        <TouchableOpacity activeOpacity={0.8} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Icon name={"plus"} type={Icons.AntDesign} size={16} color={AppHelper.material.green500} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: AppHelper.material.green500, marginLeft: 4 }}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const Task = () => {
  const data = [
    {id: 1, value: "Error Arguments"},
    {id: 2, value: "Implement Fast Searching on Every Page"},
    {id: 3, value: "Make UI Transitions Smoother"},
    {id: 4, value: "Save Application Settings"},
    {id: 5, value: "Eliminate All Modified Models"},
    {id: 6, value: "Project Portability"},
  ]
  return (
    <SafeAreaView style={styles.container}>
      <Banner />
      <ScrollView horizontal>
        <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <TaskCard value={"Protocols & Information"} data={data} />
          <TaskCard value={"Protocols & Information"} data={data} />
          <TaskCard value={"Protocols & Information"} data={data} />
          <TaskCard value={"Protocols & Information"} data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadowEffect: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})