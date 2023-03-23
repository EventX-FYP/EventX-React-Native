import React from 'react'
import { SafeAreaView, Image, View, Text, StyleSheet, FlatList } from 'react-native'
import { AppHelper } from '../../../helper'
import moment from 'moment/moment'
import { TouchableOpacity } from 'react-native'
import { Chip } from 'react-native-paper';
import {Bid} from '../../Planner/Bidding/Bid'

const currentDate = new Date().toISOString().slice(0, 10)

const JobList = [
  {
    id: 1,
    title:
      'tittle tittle tittle tittle tittle tittle tittle tittle tittle tittle',
    City: 'Lahore',
    Category:
      ["category1", "category2", "catgeory3", "category1",],
    Content:
      "Lorem Ipsum is  Ipsum is simplyLorem Lorem Ipsum is  Ipsum is simplyLorem  Ipsum is si mplyLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    Name: 'Haroon Tahir Haroon',
    Date: moment(currentDate).format('DD-MMM-YYYY'),
  },
]

export const JobDetail = ({ navigation }) => {
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col1}>
          <Text style={styles.majorHeading}> {JobList[0].title}</Text>
          <Text style={styles.date}>{JobList[0].Date}</Text>
        </View>

        <View style={styles.col2}>
        <Text style={styles.name}>{JobList[0].Name}</Text>
        <Text style={styles.cityHeading}>{JobList[0].City}</Text>
        </View>
      
      </View>

      <View style={styles.chipContainer}>
        <FlatList
          data={JobList[0].Category}
          ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
          horizontal={true}
          renderItem={({ item }) => <Chip  textStyle={styles.chipTextStyle} style={styles.chipStyle} >{item}</Chip>}/>
      </View>

        <View>
          <Text style={styles.descriptionHeading}>Description</Text>
          <Text style={styles.description}>{JobList[0].Content}</Text>
        </View>
        
     

      
        <TouchableOpacity style={styles.buttonContainer} >
        <Text style={styles.button}>Bid</Text>
        </TouchableOpacity>
        <Bid/>
    </SafeAreaView>
     
    
    

    
  )
}

const styles = StyleSheet.create({
  parent:{
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-evenly'
  },
  majorHeading: {
    fontSize: 25,
  },
  category: {
    fontSize: 16,
    color: AppHelper.material.green700,
  },
  row: {
    flexDirection: 'row',
    flex:0.5,
    justifyContent: 'space-between'
  },
  cityHeading: {
    fontSize: 18,
  },
  name: {
   
    color: AppHelper.gray,
  },
  date: {
   
    color: AppHelper.gray,
  },
  description: {
    color: AppHelper.gray,
    fontSize: 15,
    marginVertical:25
  },
  button:{
    backgroundColor: AppHelper.material.green400,
    paddingHorizontal:15,
    color:"white",
    fontWeight: 'bold',
    fontSize:20,
    paddingVertical:10,
    borderRadius:20,
    width:'90%',
    textAlign:"center",
  },
  descriptionContainer:{
     
    justifyContent: 'space-evenly'
  },
  buttonContainer:{
    justifyContent:"center",
    alignItems:"center"
  },
  col1:{
    maxWidth: '60%',
    justifyContent: 'space-evenly',
  },
  col2:{
    maxWidth: '30%',
    alignItems:"center",
    justifyContent: 'space-evenly' 
  },
  descriptionHeading:{
    fontSize: 25,
    marginVertical:20
  },
  chipContainer:{

  },
  chipStyle:{
    backgroundColor:AppHelper.material.green300,
  },
  chipTextStyle:{
    color:"white",
    fontSize:15,

  }

})
