import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import {images} from '../../assets'

import React from 'react'

const description =  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic"

export const PlannerPackageCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.cardImg} source={images.DigitalPlanner}></Image>
      <View style={styles.cardContent}>
        <Text numberOfLines={1} style={styles.title}>Package Title</Text>
        <Text numberOfLines={1} style={styles.price}>Package Price</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        height:350,
        width:300,
       borderTopStartRadius:25,
       borderTopEndRadius:25,
       borderBottomStartRadius:20,
       borderBottomEndRadius:20,
       overflow : 'hidden'
    },
    cardImg:{
       width:"100%",
       height:"60%",
    },
    cardContent:{
        alignItems:"center"
    },
    title:{
        fontSize:25
    },
    price:{
        fontSize:20
    },
    description:{
        textAlign:"center"
    },
    cardContent:{
        alignItems:"center",
        paddingHorizontal:20,
    }
    
})
