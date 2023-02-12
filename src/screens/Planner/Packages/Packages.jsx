import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native"
import { PlannerPackageCard } from '../../../components'

const categoryName = 'Birthday Packages'

export const Packages=() =>{
  return (
   <SafeAreaView>
    <ScrollView>
        <View style={styles.Component}>
            <Text style={styles.heading}>{categoryName}</Text>
            <PlannerPackageCard/>
        </View>
    </ScrollView>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container:{

},
heading:{
  fontSize:25
}
})
