import React, {useState} from 'react'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../assets'
import { RadioButton, RadioGroup } from 'react-native-ui-lib'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';


export const GeneralInfo = ({ navigation }) => {

  const [DateVal, SetDateVal] = useState(new Date(Date.now()))
  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    SetDateVal(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.wave} source={images.GeneralInfoWave}></Image>


      <View style={styles.ContentContainer}>

        <Text style={styles.heading} >Personal Information</Text>

        <View style={styles.RowContainer}>
          <TextInput placeholder="First Name" style={styles.UserInput}></TextInput>
          <TextInput placeholder="Last Name" style={styles.UserInput}></TextInput>
        </View>

        <View style={styles.rdgrpContainer}>
          <Text style={styles.Heading}>Gender</Text>
          <RadioGroup style={styles.radiogrp}>
            <RadioButton style={styles.Radiobtn} value={"Male"} label={"Male"} />
            <RadioButton style={styles.Radiobtn} value={"Female"} label={"Female"}/>
          </RadioGroup>
        </View>

        <View style={styles.BirthdayRow}>
          <Text style={styles.BirthdayHeading}>Birthday</Text>
          <TouchableOpacity onPress={showPicker}>
            <Text style={styles.BirthdayButtonStyle}>{DateVal.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
        </View>

          {isPickerShow && (
          <DateTimePicker
            value={DateVal}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

        <Text style={styles.heading} >Contact Information</Text>

        <View style={styles.RowContainer}>
          <Text style={styles.Heading}>Phone Number</Text>
          <TextInput style={styles.UserInput} keyboardType="number-pad"></TextInput>
        </View>

        <View style={styles.DonebtnView}>
          <Text style={styles.donebtn} >Done</Text>
        </View>
      
            
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.green50,
    
  },
  ContentContainer: {
    paddingStart: 25,
    paddingEnd: 15,
    justifyContent: 'space-evenly',
    flex:1,
    
  },
  wave: {
    height: '25%',
    resizeMode: 'stretch',
  },
  RowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
  },
  UserInput: {
    backgroundColor: 'white',
    height: 40,
    width: '45%',
    borderRadius: 10,
    borderWidth: 1,
    paddingStart: 12,
  },
  Heading:{
    fontSize:20
  },
  rdgrpContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  
  },
  radiogrp:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    flex:1
  },
  Radiobtn:{
    borderColor:"black"
  },
  heading:{
    fontSize:35,
  },
  BirthdayRow:{
    flexDirection: 'row',
    alignItems:"center",
  },
  BirthdayHeading:{
    fontSize:20,
    marginEnd:45
  },
  BirthdayButtonStyle:{
    borderRadius:8,
    backgroundColor:"white",
    borderWidth:1,
    paddingVertical:5,
    paddingHorizontal:15,
    fontSize:15
  },
  DonebtnView:{
    flexDirection:"row",
    backgroundColor: AppHelper.material.green600,
    justifyContent:"center",
    paddingVertical:10,
    borderRadius:5
  },
  donebtn:{
    
    flexDirection:"row",
    fontSize:18,
    color:"white"
  }

})
