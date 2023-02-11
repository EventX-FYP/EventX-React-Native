import React from 'react'
import { SafeAreaView, Image, View, Text, StyleSheet } from 'react-native'
import { AppHelper } from '../../../helper'
import moment from 'moment/moment'
import { TouchableOpacity } from 'react-native'

const currentDate = new Date().toISOString().slice(0, 10)

const JobList = [
  {
    id: 1,
    title:
      'tittle tittle tittle tittle tittle tittle tittle tittle tittle tittle',
    City: 'Lahore',
    Category:
      'Category 1 | Category 1 | Category 1 | Category 1 | Category 1 | Category 1 |',
    Content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    Name: 'Haroon Tahir Haroon Tahir Haroon Tahir Haroon Tahir',
    Date: moment(currentDate).format('DD-MMM-YYYY'),
  },
]

export const JobDetail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.majorHeading}> {JobList[0].title}</Text>
        <Text style={styles.category}>{JobList[0].Category}</Text>

        <View style={styles.row}>
          <Text style={styles.heading}>Posted By</Text>
          <Text style={styles.heading}>Date</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.name}>{JobList[0].Name}</Text>
          <Text style={styles.date}>{JobList[0].Date}</Text>
        </View>
       

        <Text style={styles.heading}>{JobList[0].City}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.majorHeading}>Description</Text>
        <Text style={styles.description}>{JobList[0].Content}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
        <Text style={styles.button}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style={styles.button}>Bid</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  majorHeading: {
    fontSize: 25,
    maxWidth: '80%',
  },
  category: {
    fontSize: 16,
    color: AppHelper.material.green700,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 18,
  },
  name: {
    maxWidth: '45%',
    color: AppHelper.gray,
  },
  date: {
    maxWidth: '45%',
    color: AppHelper.gray,
  },
  description: {
    color: AppHelper.gray,
    fontSize: 15,
  },
  button:{
    backgroundColor: AppHelper.material.green400,
    paddingHorizontal:15,
    color:"white",
    fontWeight: 'bold',
    fontSize:20,
    paddingVertical:10,
    borderRadius:20
  },
  detailContainer:{
    flex: 0.5, 
    justifyContent: 'space-evenly' 
  },
  descriptionContainer:{
    flex: 0.3, 
    justifyContent: 'space-evenly'
  },
  buttonContainer:{
    flexDirection:"row", 
    justifyContent: 'space-between', 
    flex:0.1
  }
})
