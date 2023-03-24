import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, Card, Image, Text, DateTimePicker, Picker } from 'react-native-ui-lib'
import { images } from '../../../../assets'
import { fontStyles, inputStyles } from '../../../../styles'
import { TextField } from 'react-native-ui-lib/src/incubator'
import { AppHelper, CountryStateCityAPI } from '../../../../helper'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from "expo-image-picker"
import { COUNTRY_STATE_CITY_API_KEY } from '@env'
import { UPDATE_USER } from "../../../../store/types";


export const GeneralInformation = ({ navigation }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [generalInformation, setGeneralInformation] = useState({
    name: user.name,
    dob: user.dob,
    gender: user.gender,
    contact_number: user.contact_number,
    country: user.country,
    city: user.city,
    state: user.state,
    address: user.address,
    picture: user.picture,
  })

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await CountryStateCityAPI.fetchCountry(COUNTRY_STATE_CITY_API_KEY)
      setCountries(() => response.map(
        country => { return { name: country.name, code: country.iso2 }}
      ))
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      if (!generalInformation.country?.code) return;
      const response = await CountryStateCityAPI.fetchCities(generalInformation.country.code, "", COUNTRY_STATE_CITY_API_KEY)
      setCities(() => response.map(
        city => { return { name: city.name }}
      ))
    }
    fetchCities()
  }, [generalInformation])

  const pickImageProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.cancelled) {
      dispatch({ type: UPDATE_USER, payload: { ...user, picture: result.uri }})
      setGeneralInformation({ ...generalInformation, picture: result.uri })
    }
  }

  const handleNameChange = (e) => {
    setGeneralInformation({ ...generalInformation, name: e })
    dispatch({ type: UPDATE_USER, payload: { ...user, name: e }})
  }

  const handleDobChange = (e) => {
    setGeneralInformation({ ...generalInformation, dob: e })
    dispatch({ type: UPDATE_USER, payload: { ...user, dob: e }})
  }

  const handleContactChange = (e) => {
    setGeneralInformation({ ...generalInformation, contact_number: e })
    dispatch({ type: UPDATE_USER, payload: { ...user, contact_number: e }})
  }

  const handleAddressChange = (e) => {
    setGeneralInformation({ ...generalInformation, address: e })
    dispatch({ type: UPDATE_USER, payload: { ...user, address: e }})
  }

  const handleCountryChange = (e) => {
    setGeneralInformation({ ...generalInformation, country: { name: e.label, code: e.value }})
    dispatch({ type: UPDATE_USER, payload: { ...user, country: e.label }})
  }

  const handleStateChange = (e) => {
    setGeneralInformation({ ...generalInformation, state: e.label })
    dispatch({ type: UPDATE_USER, payload: { ...user, state: e.label }})
  }

  const handleCityChange = (e) => {
    setGeneralInformation({ ...generalInformation, city: e.label })
    dispatch({ type: UPDATE_USER, payload: { ...user, city: e.label }})
  }

  const handleMaleGenderChange = () => {
    setGeneralInformation({ ...generalInformation, gender: 'Male' });
    dispatch({ type: UPDATE_USER, payload: { ...user, gender: "Male" }})
  }

  const handleFemaleGenderChange = () => {
    setGeneralInformation({ ...generalInformation, gender: "Female" });
    dispatch({ type: UPDATE_USER, payload: { ...user, gender: "Female"}})
  }

  return (
    <View style={userGeneralInformationStyles.container}>
        <View style={userGeneralInformationStyles.uploadImageContainer}>
          <Image style={userGeneralInformationStyles.uploadImage} source={{ uri: generalInformation.picture }} />
          <Button onPress={pickImageProfile} size={'xSmall'} style={userGeneralInformationStyles.uploadImageButtonIcon}>
            <Image source={images.CameraIcon} style={userGeneralInformationStyles.icon} />
          </Button>
        </View>
        <ScrollView>
          <View style={userGeneralInformationStyles.informationContainer}>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>Name</Text>
              <TextField style={inputStyles.inputField} placeholder={'Enter Name'} value={generalInformation.name} onChangeText={handleNameChange} />
            </View>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>Date of Birth</Text>
              <DateTimePicker
                style={inputStyles.inputField}
                dateFormat="DD-MMM-YYYY"
                placeholder="DD-MMM-YYYY"
                mode={'date'}
                value={generalInformation.dob}
                onChange={handleDobChange}
              />
            </View>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>Gender</Text>
              <View style={userGeneralInformationStyles.genderContainer}>
                <Card style={generalInformation.gender === 'Male' ? userGeneralInformationStyles.genderButtonSelected : userGeneralInformationStyles.genderButton}
                  onPress={handleMaleGenderChange}
                >
                  <Text style={generalInformation.gender === 'Male' ? userGeneralInformationStyles.genderButtonTextSelected : userGeneralInformationStyles.genderButtonText}>Male</Text>
                </Card>
                <Card style={generalInformation.gender === 'Female' ? userGeneralInformationStyles.genderButtonSelected : userGeneralInformationStyles.genderButton}
                  onPress={handleFemaleGenderChange}
                >
                  <Text style={generalInformation.gender === 'Female' ? userGeneralInformationStyles.genderButtonTextSelected : userGeneralInformationStyles.genderButtonText}>Female</Text>
                </Card>
              </View>
            </View>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>Contact Number</Text>
              <TextField style={inputStyles.inputField} placeholder={'Enter Contact Number'} value={generalInformation.contact_number} onChangeText={handleContactChange} />
            </View>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>Country</Text>
              <Picker
                placeholder={'Select Country'}
                value={{
                  label: generalInformation.country.name ?? generalInformation.country,
                  value: generalInformation.country.code ?? generalInformation.country,
                }}
                // value={generalInformation.country.code}
                enableModalBlur={false}
                topBarProps={{ title: 'Countries' }}
                showSearch
                searchPlaceholder={'Search Country'}
                onChange={handleCountryChange}
                mode={Picker.modes.SINGLE}
                migrateTextField
                style={inputStyles.inputField}
              >
                {
                  countries.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.name}
                      value={item.code}
                    />
                  ))
                }
              </Picker>
            </View>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>City</Text>
              <Picker
                placeholder={'Select City'}
                value={{
                  label: generalInformation.city,
                  value: generalInformation.city,
                }}
                enableModalBlur={false}
                topBarProps={{ title: 'Cities' }}
                showSearch
                searchPlaceholder={'Search City'}
                onChange={handleCityChange}
                mode={Picker.modes.SINGLE}
                migrateTextField
                style={inputStyles.inputField}
              >
                {
                  cities.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={''} />
                  ))
                }
              </Picker>
            </View>
            <View style={userGeneralInformationStyles.inputRow}>
              <Text style={[fontStyles[700], fontStyles.large]}>Address</Text>
              <TextField style={inputStyles.inputField} placeholder={'Enter Address'} value={generalInformation.address} onChangeText={handleAddressChange} />
            </View>
          </View>
        </ScrollView>
      </View>
  )
}

const userGeneralInformationStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '90%',
    width: '100%',
    // justifyContent: 'space-between',
    paddingTop: 20,
  },
  uploadImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  uploadImage: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderColor: AppHelper.material.green200,
    borderWidth: 1.4,
  },
  uploadImageButtonIcon: {
    position: 'relative',
    bottom: 22,
    left: 30,
    backgroundColor: AppHelper.material.green500,
    borderRadius: 100,
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 40,
    maxWidth: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppHelper.material.lightWhite,
    borderWidth: 2,
    display: 'flex',
  },
  icon: {
    width: 20,
    height: 20,
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 70,
  },
  genderButton: {
    display: 'flex',
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: AppHelper.material.green100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonSelected: {
    display: 'flex',
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: AppHelper.material.green500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonText: {
    color: AppHelper.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  genderButtonTextSelected: {
    color: AppHelper.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputRow: {
    height: 70,
    justifyContent: 'space-between',
  }
})
