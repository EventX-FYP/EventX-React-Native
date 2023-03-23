import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../../assets'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../../helper'
import { CustomImageCarousal } from '../../../components'
import { reviews } from '../../../constants/reviews'
import { fontStyles } from '../../../styles'
import { packages } from '../../../constants/planners'



const ReviewCard = ({ item }) => {
  const { name, rating, date, review, image } = item;
  const bgColor = AppHelper.material.lightGreen50;
  return (
    <SafeAreaView style={[styles.shadow, { display: "flex", flexDirection: "column", backgroundColor: bgColor, borderRadius: 10, maxWidth: 300 }]}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 10 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={image} style={{ width: 50, height: 50, borderRadius: 100, marginRight: 10 }} />
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
            <Text style={{ fontWeight: "300", fontSize: 16 }}>{date}</Text>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>{rating}</Text>
          <Icon type={Icons.AntDesign} name="star" color={AppHelper.material.yellow500} size={20} />
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "column", paddingHorizontal: 15, paddingVertical: 10 }}>
        <Text style={{ fontWeight: "300", fontSize: 16 }}>{review}</Text>
      </View>
    </SafeAreaView>
  )
}

const PackageCard = ({ item }) => {
  const { image, name, description, categories, price, currency, rating, reviews } = item;
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.shadow, { display: "flex", flexDirection: "column", alignItems: "center", margin: 10, borderRadius: 20, maxWidth: 300, backgroundColor: AppHelper.material.lightGreen50 }]}>
      <Image source={image} style={{ height: 150, width: "100%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
      <View style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
        <Text style={{ fontWeight: "300", fontSize: 16 }}>{description}</Text>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>{rating}</Text>
          <Icon type={Icons.AntDesign} name="star" color={AppHelper.material.yellow500} size={20} />
          <Text style={{ fontWeight: "300", fontSize: 16, marginLeft: 10 }}>{reviews} Reviews</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 10 }}>{price}</Text>
          <Text style={{ fontWeight: "300", fontSize: 16 }}>{currency}</Text>
        </View>
      </View>
      
    </TouchableOpacity>
  )
}

// This is for the client to show planner profile
export const PlannerProfile = ({ navigation, route }) => {
  const { name, categories, image } = route.params;
  const data = [
    { image: images.DigitalPlanner },
    { image: images.WeddingPlanner },
    { image: images.WeeklyPlanner },
    { image: images.WorkPlanner },
    { image: images.PersonalPlanner },
    { image: images.PartyPlanner },
    { image: images.BirthdayPlanner },
  ]

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <Image source={image} style={{ width: 110, height: 120, borderRadius: 20 }}/>
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
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>{name}</Text>
              <Text style={[fontStyles[100], fontStyles.large, { maxWidth: 150 }]} numberOfLines={1}>
              {
                categories.map((category, index) => {
                  if (index === categories.length - 1) {
                    return category;
                  } else {
                    return category + ' | ';
                  }
                })
              }
            </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigator.Chat, { name: name })} style={{ borderColor: AppHelper.material.green400, borderWidth: 1, borderRadius: 10, padding: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: AppHelper.material.green400 }}>Message</Text>
            </TouchableOpacity>
          </View>
          <View style={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
            <Text style={{ color: AppHelper.material.green600, fontWeight: "bold", fontSize: 26, paddingHorizontal: 20, marginVertical: 15 }}>Recent Experiences</Text>
            <CustomImageCarousal data={data} pagination={true} aspectRatio={2/1.5} />
          </View>
        </View>
        <View style={[styles.userContainer, { paddingHorizontal: 15 }]}>
          <View style={{ display: "flex", flexDirection: "column", marginVertical: 15, marginTop: 0 }}>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600 }}>About</Text>
            <Text style={{ fontSize: 18, fontWeight: "400", }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quam a obcaecati dicta minima est nulla eaque ab veniam totam dolorem iste voluptatem, animi cumque, numquam tempora libero magni placeat. Unde quod tenetur tempore quaerat corporis aut magnam inventore quidem ducimus deserunt odio voluptates amet nemo obcaecati possimus id dolor magni facilis earum corrupti, ab, ea animi optio! Ad, laborum.</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column", marginVertical: 15, marginTop: 0}}>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600 }}>Packages</Text>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <FlatList
                data={packages}
                horizontal
                renderItem={({ item }) => <PackageCard item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
              />
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
              <Text style={{ fontSize: 26, fontWeight: "bold", color: AppHelper.material.green600, marginBottom: 10 }}>Reviews</Text>
              <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green400, padding: 5, paddingHorizontal: 10, borderRadius: 100, alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate(ScreenNavigator.PostTestimonials, { name: name })}>
                <Icon type={Icons.AntDesign} name="plus" color={AppHelper.material.white} size={18}/>
              </TouchableOpacity>
            </View>
            <FlatList
              data={reviews}
              horizontal
              renderItem={({ item }) => <ReviewCard item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ marginHorizontal: 5 }} />}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})