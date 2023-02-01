import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View, TextInput, Image } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import {images} from '../../../assets/index'
import SearchFilter from '../../../components/SearchFilter/SearchFilter'

export const Search = ({ navigation }) =>{
    const categories = [
        {
          title: "Wedding Planners",
          id: "1" 
        },
        {
          title: "Birthday Planners",
          id: "2" 
        },
        {
          title: "Party Planners",
          id: "3" 
        },
        {
          title: "Financial Planners",
          id: "4" 
        },
        {
          title: "Health & Fitness Planners",
          id: "5" 
        },
        {
          title: "Work Planners",
          id: "6" 
        },
        {
          title: "Weekly Planners",
          id: "7" 
        },
        {
          title: "Personal/Life Planners",
          id: "8" 
        },
        {
          title: "Digital Planners",
          id: "9" 
        },
      ]

    const [input, setInput] = useState("")
    // console.log(input)

return(
    <SafeAreaView style={styles.Container}>
        <View style={styles.Search}>
            <TextInput  value={input} onChangeText={(text) => setInput(text)} placeholder='Search' style={styles.Input}/>
            <Image style={styles.Image} source={images.SearchIcon}/>
        </View>

        <View style={styles.SearchFilter}>
            <SearchFilter data={categories} input={input} setInput={setInput}  />
        </View>
        
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    Container:{
        paddingHorizontal:20,
        paddingTop:20
    },
    Search:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"white",
        borderWidth:1,
        paddingVertical:10,
        borderRadius:15,
        alignItems:"center",
        paddingHorizontal:20,
    },
    Image:{
        width:30,
        height:30
    },
    Input:{
        flex:1,
    },
    SearchFilter:{
        paddingStart:5,
        height:"70%"
    }

})