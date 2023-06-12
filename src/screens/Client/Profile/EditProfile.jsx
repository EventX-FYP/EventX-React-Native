import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '../../../assets'
import { AppHelper, CountryStateCityAPI, convertToDate, pickImage } from '../../../helper'
import { TextInput, Button } from 'react-native-paper'
import { DateTimePicker, Picker } from 'react-native-ui-lib'
import { COUNTRY_STATE_CITY_API_KEY } from "@env";
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../../components'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useApollo } from '../../../graphql/apollo'
import { UPDATE_USER } from '../../../graphql/mutations'

export const EditProfile = ({ navigation }) => {
  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();
  const user = useSelector((state) => state.user);
  const [information, setInformation] = useState({
    name: user.name,
    dob: convertToDate(user.birthday),
    gender: user.gender,
    contact_number: user.phone,
    country: user.country,
    city: user.city,
    state: user.state,
    address: user.address,
    picture: user.picture,
    password: "",
    newPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await CountryStateCityAPI.fetchCountry(COUNTRY_STATE_CITY_API_KEY);
      setCountries(() => response.map(
        country => { return { name: country.name, code: country.iso2 } }
      ));
    }
    fetchCountries();
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      if (!information.country?.code) return;
      const response = await CountryStateCityAPI.fetchCities(information.country.code, "", COUNTRY_STATE_CITY_API_KEY);
      setCities(() => response?.map(
        city => { return { name: city.name } }
      ));
    }
    fetchCities();
  }, [information])

  const handleImage = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      setInformation({ ...information, picture: result.uri });
    }
  }

  const handleUpdate = async () => {
    try {
      startProgress();
      console.log({
        ...user,
        name: information.name,
        phone: information.contact_number,
        gender: information.gender,
        birthday: information.dob,
        country: information.country,
        city: information.city,
        address: information.address,
        picture: information.picture,
        password: information.password,
        newPassword: information.newPassword,
      });
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: {
          data: {
            ...user,
            name: information.name,
            phone: information.contact_number,
            gender: information.gender,
            birthday: information.dob,
            country: information.country,
            city: information.city,
            address: information.address,
            picture: information.picture,
            password: information.password,
            newPassword: information.newPassword,
          }
        },
      })

      if (data?.updateUser) {
        dispatch({ type: "SET_USER", payload: data?.updateUser });
        alert("Profile updated successfully");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      stopProgress();
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Loader />
        <TouchableOpacity onPress={handleImage} activeOpacity={0.8} style={{ alignItems: "center", marginVertical: 20 }}>
          <Image source={information.picture ? { uri: information.picture } : images.BirthdayPlanner} style={styles.imageContainer} />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 20, paddingTop: 10 }}>
          <TextInput label={"Name"} value={information.name} mode={'outlined'} onChangeText={text => setInformation({ ...information, name: text })}
            selectionColor={AppHelper.material.green400}
            underlineColor={"green"}
            activeUnderlineColor={"green"}
            outlineColor={"green"}
            activeOutlineColor={"green"}
            style={[styles.inputBackground]} />

          <TextInput label={"Old Password"} value={information.password} mode={'outlined'} onChangeText={text => setInformation({ ...information, password: text })}
            secureTextEntry={!(!!showPassword === true)}
            selectionColor={AppHelper.material.green400}
            underlineColor={"green"}
            activeUnderlineColor={"green"}
            outlineColor={"green"}
            activeOutlineColor={"green"}
            editable={false}
            style={[styles.inputBackground, styles.marginTop]}
            right={<TextInput.Icon icon={!(!!showPassword === true) ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />} />
          <TextInput label={"New Password"} value={information.password} mode={'outlined'} onChangeText={text => setInformation({ ...information, newPassword: text })}
            secureTextEntry={!(!!showPassword === true)}
            selectionColor={AppHelper.material.green400}
            underlineColor={"green"}
            activeUnderlineColor={"green"}
            outlineColor={"green"}
            activeOutlineColor={"green"}
            editable={false}
            style={[styles.inputBackground, styles.marginTop]}
            right={<TextInput.Icon icon={!(!!showPassword === true) ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />} />

          <TextInput label={"Contact Number"} value={information.contact_number} mode={'outlined'} onChangeText={text => setInformation({ ...information, contact_number: text })}
            selectionColor={AppHelper.material.green400}
            underlineColor={"green"}
            activeUnderlineColor={"green"}
            outlineColor={"green"}
            activeOutlineColor={"green"}
            style={[styles.inputBackground, styles.marginTop]} />


          <View style={[styles.genderContainer, styles.marginTop]}>
            <TouchableOpacity activeOpacity={0.6} style={information.gender === "Male" ? styles.genderButtonActive : styles.genderButtonInActive} onPress={() => setInformation({ ...information, gender: "Male" })}>
              <Text style={information.gender === "Male" ? styles.activeButtonText : styles.inActiveButtonText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={information.gender === "Female" ? styles.genderButtonActive : styles.genderButtonInActive} onPress={() => setInformation({ ...information, gender: "Female" })}>
              <Text style={information.gender === "Female" ? styles.activeButtonText : styles.inActiveButtonText}>Female</Text>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            mode="date"
            value={information.dob}
            dateFormat="DD-MMM-YYYY"
            onChange={date => setInformation({ ...information, dob: date })}
            placeholder={"Date of Birth"}
            // floatingPlaceholder
            style={[styles.inputBackground, styles.marginTop, { borderColor: "green", borderWidth: 1, borderRadius: 5, padding: 10, height: 50, paddingLeft: 20 }]}
          />

          <Picker
            placeholder={'Select Country'}
            value={{
              label: information.country.name ?? information.country,
              value: information.country.code ?? information.country,
            }}
            enableModalBlur={false}
            topBarProps={{ title: "Countries" }}
            showSearch
            searchPlaceholder={'Search Countries'}
            onChange={e => setInformation({ ...information, country: { name: e.label, code: e.value } })}
            mode={Picker.modes.SINGLE}
            migrateTextField
            style={[styles.inputBackground, { borderColor: "green", borderWidth: 1, borderRadius: 5, padding: 10, height: 50, paddingLeft: 20 }]}>

            {
              countries.map((country, index) => {
                return (
                  <Picker.Item key={index} label={country.name} value={country.code} />
                )
              })
            }
          </Picker>
          <Picker
            placeholder={'Select City'}
            value={{
              label: information.city,
              value: information.city,
            }}
            enableModalBlur={false}
            topBarProps={{ title: "Countries" }}
            showSearch
            searchPlaceholder={'Search Countries'}
            onChange={e => setInformation({ ...information, city: e.label })}
            mode={Picker.modes.SINGLE}
            migrateTextField
            style={[styles.inputBackground, { borderColor: "green", borderWidth: 1, borderRadius: 5, padding: 10, height: 50, paddingLeft: 20 }]}>

            {
              cities.map((city, index) => {
                return (
                  <Picker.Item key={index} label={city.name} value={city.name} />
                )
              })
            }
          </Picker>

          <TextInput label={"Address"} value={information.address} mode={'outlined'} onChangeText={text => setInformation({ ...information, address: text })}
            selectionColor={AppHelper.material.green400}
            underlineColor={"green"}
            activeUnderlineColor={"green"}
            outlineColor={"green"}
            activeOutlineColor={"green"}
            style={[styles.inputBackground]} numberOfLines={1} />

          <Button mode='contained' style={[styles.marginTop, { borderRadius: 10, backgroundColor: AppHelper.material.green600 }]} onPress={handleUpdate}>Save</Button>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    // backgroundColor: AppHelper.material.lightGreen50,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputBackground: {
    backgroundColor: AppHelper.material.lightGreen50,
  },
  marginTop: {
    marginTop: 20,
  },
  genderContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  },
  genderButtonActive: {
    backgroundColor: AppHelper.material.lightGreen600,
    width: "40%",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  genderButtonInActive: {
    backgroundColor: AppHelper.material.lightGreen100,
    width: "40%",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  activeButtonText: {
    color: AppHelper.material.lightGreen50,
    fontSize: 16,
    fontWeight: "bold",
  },
  inActiveButtonText: {
    color: AppHelper.material.lightGreen700,
    fontSize: 16,
    fontWeight: "bold",
  },
})