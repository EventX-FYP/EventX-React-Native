import { View, Text, SafeAreaView, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { AppHelper } from '../../helper'

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"

export const PlannerPackageCard = ({ packageContent, cardimage }) => {
  const { description, packagePrice, title } = packageContent
  const image = cardimage
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.cardImg} source={image}></Image>
      <View style={styles.cardContent}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.price}>
          {packagePrice}
        </Text>
        <Text style={styles.description} numberOfLines={4}>
          {description}
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 370,
    width: 300,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    // shadowColor: AppHelper.material.black,
    // shadowOffset: {
    //   width: 5,
    //   height: 2,
    // },
    // shadowRadius: 25,
    // shadowOpacity:0.25
  },
  cardImg: {
    width: '100%',
    height: '55%',
    resizeMode: 'cover',
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginVertical: 5,
  },
  price: {
    fontSize: 20,
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
  },
  cardContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
})
