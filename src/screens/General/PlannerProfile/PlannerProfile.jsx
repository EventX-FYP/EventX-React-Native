import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../../../assets'
import { AppHelper } from '../../../helper'
import { CustomImageCarousal } from '../../../components'


// This is for the client to show planner profile
export const PlannerProfile = () => {

  const data = [
    { image: images.DigitalPlanner },
    { image: images.WeddingPlanner },
    { image: images.WeeklyPlanner },
    { image: images.WorkPlanner },
    { image: images.DigitalPlanner },
    { image: images.DigitalPlanner },
    { image: images.DigitalPlanner },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={images.Users.Photo} style={{ width: 110, height: 120, borderRadius: 20 }}/>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", textAlign: "right", fontSize: 30 }}>6</Text>
          <Text style={{ fontWeight: "300", fontSize: 16 }}>Created Events</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold", textAlign: "right", fontSize: 30 }}>6</Text>
          <Text style={{ fontWeight: "300", fontSize: 16 }}>Created Events</Text>
        </View>
      </View>
      <View style={styles.userContainer}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>John Doe</Text>
            <Text style={{ fontWeight: "300", fontSize: 16 }}>Event Planner</Text>
          </View>
          <TouchableOpacity style={{ borderColor: AppHelper.material.green400, borderWidth: 1, borderRadius: 10, padding: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: AppHelper.material.green400 }}>Message</Text>
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", flexDirection: "column", marginVertical: 15 }}>
          <Text style={{ color: AppHelper.material.green600, fontWeight: "bold", fontSize: 26, paddingHorizontal: 20, marginVertical: 15 }}>Recent Experiences</Text>
          <CustomImageCarousal data={data} autoPlay={true} pagination={true} aspectRatio={16/9} />
        </View>
      </View>
      <View style={[styles.userContainer, { paddingHorizontal: 15 }]}>
        <View style={{ display: "flex", flexDirection: "column", marginVertical: 15 }}>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600 }}>About</Text>
          <Text style={{ fontSize: 18, fontWeight: "400", }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quam a obcaecati dicta minima est nulla eaque ab veniam totam dolorem iste voluptatem, animi cumque, numquam tempora libero magni placeat. Unde quod tenetur tempore quaerat corporis aut magnam inventore quidem ducimus deserunt odio voluptates amet nemo obcaecati possimus id dolor magni facilis earum corrupti, ab, ea animi optio! Ad, laborum.</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  userContainer: {
    flex: 1,
    // paddingHorizontal: 15,
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
  }
})