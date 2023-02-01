import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native-ui-lib'
import {  AppHelper } from '../../../helper/AppHelper/AppHelper'
import { NotificationCard } from '../../../components/NotificationCard/NotificationCard'

export const Notifications = ({ navigation }) => {
  return (
    // <SafeAreaView style={styles.container}>
      
      
    //   <ScrollView >
    //       <View style={styles.check2} >
    //         <View style={styles.ContentContainer} >
    //           <Text  style={styles.heading} >Actions Required</Text>
    //           <NotificationCard/>
    //           <NotificationCard/>

    //           {/* <NotificationCard/>
    //           <NotificationCard/>

    //           <NotificationCard/>
    //           <NotificationCard/> */}
           
    //         </View>
            
    //         {/* <View>
    //           <Text style={styles.heading}>Recent Searches</Text>
    //           <NotificationCard/>
    //         </View> */}
           
    //       </View>
    //     </ScrollView> 
        
    // </SafeAreaView>

    <SafeAreaView>
        <ScrollView>  
       <View style={styles.container}>
        <Text  style={styles.heading} >Actions Required</Text>      
        <NotificationCard/>
        <NotificationCard/>
        <NotificationCard/>

        <Text style={styles.heading}>Recent Searches</Text>

        <NotificationCard/>
        <NotificationCard/>    
    </View>

    </ScrollView>
    </SafeAreaView>
    

   
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:20
  },
  heading:{
    color: AppHelper.black,
    fontSize: 25
  },
  ContentContainer:{
    justifyContent:"space-between",
    flex:1
  },
  check:{
    backgroundColor:"yellow",
    flex:1
    // flex:1
  },
  check2:{
    backgroundColor:"gray",
    flex:1
  }
})
