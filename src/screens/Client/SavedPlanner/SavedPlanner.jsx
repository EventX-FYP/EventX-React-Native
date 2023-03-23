import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AppHelper } from '../../../helper'
import { images } from '../../../assets'

const Planner = ({ name, picture }) => {
  return (
    <TouchableOpacity style={{ display: "flex", flexDirection: "row", padding: 10, width: "90%", backgroundColor: AppHelper.material.green400, borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
      <Image source={picture} style={{ width: 70, height: 70, borderRadius: 20 }} />
      <Text style={{ color: "white", marginLeft: 10, fontWeight: "bold", fontSize: 18, alignSelf: "center" }}>{name}</Text>
    </TouchableOpacity>
  )
}

export const SavedPlanner = () => {
  const [planners, setPlanners] = useState([
    { name: "Planner 1", picture: images.DigitalPlanner },
    { name: "Planner 2", picture: images.DigitalPlanner },
    { name: "Planner 3", picture: images.DigitalPlanner },
    { name: "Planner 4", picture: images.DigitalPlanner },
    { name: "Planner 5", picture: images.DigitalPlanner },
    { name: "Planner 6", picture: images.DigitalPlanner },
    { name: "Planner 7", picture: images.DigitalPlanner },
    { name: "Planner 8", picture: images.DigitalPlanner },
    { name: "Planner 9",  picture: images.DigitalPlanner },
    { name: "Planner 10", picture: images.DigitalPlanner },
    { name: "Planner 11", picture: images.DigitalPlanner },
    { name: "Planner 12", picture: images.DigitalPlanner },
    { name: "Planner 13", picture: images.DigitalPlanner },
    { name: "Planner 14", picture: images.DigitalPlanner },
  ]);
  const [count, setCount] = useState(planners.length);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingHorizontal: 10, }}>My Saved Planners</Text>
      {/* <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "center", marginVertical: 40 }}>
        <TouchableOpacity style={[styles.activeTab, { width: "40%"}]}>
          <Text style={styles.activeTabText}>Planner 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.inActiveTab, { width: "40%"}]}>
          <Text style={styles.inActiveTabText}>Planner 1</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={{ fontSize: 20, fontWeight: "bold", color: AppHelper.material.green700, paddingHorizontal: 10, marginBottom: 10 }}>{count} Saved</Text>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: AppHelper.material.green500, borderTopRightRadius: 80, paddingVertical: 20 }}>
          <FlatList
            data={planners}
            renderItem={({item}) => <Planner {...item} />}
            ItemSeparatorComponent={() => <View style={{ height: 20 }}/>}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    paddingTop: 40,
    backgroundColor: AppHelper.material.green50,
  },
  activeTab: {
    backgroundColor: AppHelper.material.green700,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  inActiveTab: {
    backgroundColor: AppHelper.material.lightGreen200,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTabText: {
    color: AppHelper.material.white,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  inActiveTabText: {
    color: AppHelper.material.lightGreen700,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
})