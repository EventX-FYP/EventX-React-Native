import React from 'react'
import { SafeAreaView, View, StatusBar, ScrollView } from 'react-native'
import { Button, Card, RadioGroup, RadioButton, Chip, Image, Modal, Text, Wizard, DateTimePicker, Picker } from 'react-native-ui-lib'
import { styles, userCategoriesStyles, userPackagesStyles, userTypeStyles, userGeneralInformationStyles } from './styles'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { images } from '../../../assets'
import { useSelector, useDispatch } from 'react-redux'
import { PackageCard } from '../../../components'
import { Packages } from '../../../store/types'
import { fontStyles, inputStyles } from '../../../styles'
import { TextField } from "react-native-ui-lib/src/incubator";
import * as ImagePicker from 'expo-image-picker';
import { COUNTRY_STATE_CITY_API_KEY } from '@env';
import { CountryStateCityAPI } from '../../../helper/API/CountryStateCity'

export const Phases = ({ navigation }) => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile);
  const packages = useSelector(state => state.package);

  const [categories, setCategories] = React.useState([
    {
      id: 1,
      name: '👰 Wedding Planning',
      selected: false,
    },
    {
      id: 2,
      name: '🎂 Birthday Planning',
      selected: false,
    },
    {
      id: 3,
      name: '🎤 Concert Planning',
      selected: false,
    },
    {
      id: 4,
      name: '👔 Corporate Planning',
      selected: false,
    },
    {
      id: 5,
      name: '🎉 Party Planning',
      selected: false,
    },
    {
      id: 6,
      name: '🏋️ Health and Fitness Planning',
      selected: false,
    },
    {
      id: 7,
      name: '✈️ Travel Planning',
      selected: false,
    },
    {
      id: 8,
      name: '📅 Weekly Planning',
      selected: false,
    },
    {
      id: 9,
      name: '💰 Financial Planning',
      selected: false,
    },
    {
      id: 10,
      name: '🏠 Home Planning',
      selected: false,
    },
    {
      id: 11,
      name: '👩‍💻 Work Planning',
      selected: false,
    },
    {
      id: 12,
      name: '👩‍👧 Personal/Life Planning',
      selected: false,
    },
    {
      id: 13,
      name: '📱 Digital Planning',
      selected: false,
    },
  ])

  const pickImagePackage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      setPackage({ ..._package, image: { uri: result.uri } })
    }
  }
  const pickImageProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.cancelled) {
      setGeneralInformation({ ...generalInformation, picture: result.uri })
    }
  }

  React.useEffect(() => {
    const getCountries = async () => {
      await CountryStateCityAPI.fetchCountry(setCountries, COUNTRY_STATE_CITY_API_KEY)
    }
    getCountries()
  }, [])

  // Use Effect to fetch cities whenever country changes
  React.useEffect(() => {
    const getCities = async () => {
      console.log(country)
      await CountryStateCityAPI.fetchCities(setCities, country.code, '', COUNTRY_STATE_CITY_API_KEY)
    }
    getCities()
  }, [country])
  
  const renderUserType = () => {
    const modalToggler = () => {
      setState({ ...state, modal: true, userType: 'P' })
    }

    const handleSelectChip = (e) => {
      const category = categories.find(item => item.name === e.children[3].props.children)
      category.selected = !category.selected
      setCategories([...categories])
    }

    const handleConfirm = () => {
      handleNextStep();
      setCategories(categories.map(category => {
        category.selected = false
        return category
      }))
    }

    return (
      <View style={userTypeStyles.container}>
        <Text style={userTypeStyles.title}>Join as a client or planner</Text>
        <View style={userTypeStyles.options}>
          <Card style={state.userType === 'C' ? userTypeStyles.cardClicked : userTypeStyles.card} onPress={() => setState({ ...state, userType: 'C' })}>
            <Text style={state.userType === 'C' ? userTypeStyles.cardTextWhite : userTypeStyles.cardText}>Client</Text>
            <Card.Section imageSource={images.Buyer} imageStyle={userTypeStyles.image} />
          </Card>
          <Card style={state.userType === 'P' ? userTypeStyles.cardClicked : userTypeStyles.card} onPress={modalToggler}>
            <Text style={state.userType === 'P' ? userTypeStyles.cardTextWhite : userTypeStyles.cardText}>Planner</Text>
            <Card.Section imageSource={images.Seller} imageStyle={userTypeStyles.image} />
          </Card>
        </View>
          <Modal visible={state.modal} style={userTypeStyles.centeredView}>
            <View style={userCategoriesStyles.container}>
              <View>
                <Text style={[fontStyles[900], fontStyles.large22, userCategoriesStyles.textCenter]}>Select your categories</Text>
                <View style={userCategoriesStyles.options}>
                  {
                    categories.map((category, index) => {
                      return (
                        <Chip
                        key={index}
                        label={category.name}
                        labelStyle={category.selected && userCategoriesStyles.selectedText}
                        containerStyle={[userCategoriesStyles.option, category.selected && userCategoriesStyles.selected]}
                        onPress={handleSelectChip}
                        />
                        )
                      })
                    }
                </View>
              </View>
              <Button label="Confirm" onPress={handleConfirm} style={userCategoriesStyles.button}/>
            </View>
          </Modal>
      </View>
    )
  }
  const renderUserPackage = () => {
    return (
      <View style={userPackagesStyles.container}>
        <Text style={userPackagesStyles.textHeader}>Add Packages</Text>
        <View style={userPackagesStyles.uploadPictureContainer}>
          <Image style={userPackagesStyles.uploadPicture} source={_package.image} />
          <Button label="Upload Picture" onPress={pickImagePackage} style={userPackagesStyles.uploadPictureButton}/>
        </View>
        <View style={userPackagesStyles.inputContainer}>
          <View style={userPackagesStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Package Name</Text>
            <TextField style={inputStyles.inputField} value={_package.name} onChangeText={value => setPackage({ ..._package, name: value })}/>
          </View>
          <View style={userPackagesStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Package Price</Text>
            <TextField style={inputStyles.inputField} value={_package.price} onChangeText={value => setPackage({ ..._package, price: value })}/>
          </View>
          <View style={userPackagesStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Package Description</Text>
            <TextField style={inputStyles.inputField} value={_package.description} onChangeText={value => setPackage({ ..._package, description: value })} />
          </View>
        </View>
        <View>
          <Button style={userPackagesStyles.button} onPress={handleSubmitPackage} label="Add Package" />
        </View>
        {
          packages.length > 0 &&
          <View style={userPackagesStyles.listPackages}>
            <ScrollView>
              {packages.map((item, index) => <PackageCard key={index} name={item.name} price={item.price} description={item.description} image={item.image} />)}
            </ScrollView>
          </View>
        }
      </View>
    )
  }
  const renderUserInformation = () => {
    const handleDateOfBirth = (date) => {
      setGeneralInformation({ ...generalInformation, dob: date })
    }

    const handleName = (value) => {
      setGeneralInformation({ ...generalInformation, name: value })
    }

    const handleGender = (value) => {
      setGeneralInformation({ ...generalInformation, gender: value })
    }

    const handleAddress = (value) => {
      setGeneralInformation({ ...generalInformation, address: value })
    }

    const handleContact = (value) => {
      setGeneralInformation({ ...generalInformation, contact: value })
    }

    const handleCountry = (value) => {
      setGeneralInformation({ ...generalInformation, country: { name: value.label, code: value.value } })
      setCountry({ name: value.label, code: value.value })
    }

    const handleCity = (value) => {
      setGeneralInformation({ ...generalInformation, city: value.label })
    }

    return (
      <View style={userGeneralInformationStyles.container}>
        <View style={userGeneralInformationStyles.uploadImageContainer}>
          <Image style={userGeneralInformationStyles.uploadImage} source={{ uri: generalInformation.picture }} />
          <Button onPress={pickImageProfile} size={'xSmall'} style={userGeneralInformationStyles.uploadImageButtonIcon}>
            <Image source={images.CameraIcon} style={userGeneralInformationStyles.icon}/>
          </Button>
        </View>
        <View style={userGeneralInformationStyles.informationContainer}>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Name</Text>
            <TextField style={inputStyles.inputField} value={generalInformation.name} onChangeText={handleName}/>
          </View>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Date of Birth</Text>
            <DateTimePicker style={inputStyles.inputField} dateFormat="DD-MMM-YYYY" placeholder="DD-MMM-YYYY" mode={'date'} value={generalInformation.dob} onChange={handleDateOfBirth}/>
          </View>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Gender</Text>
            <View style={userGeneralInformationStyles.genderContainer}>
              <RadioGroup onValueChange={handleGender}>
                <RadioButton value={'Male'} label={'Male'} />
                <RadioButton value={'Female'} label={'Female'} />
              </RadioGroup>
            </View>
          </View>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Contact Number</Text>
            <TextField style={inputStyles.inputField} value={generalInformation.contact} onChangeText={handleContact}/>
          </View>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Country</Text>
            <Picker 
              placeholder={'Select Country'}
              value={{ label: generalInformation.country.name, value: generalInformation.country.code }}
              enableModalBlur={false}
              topBarProps={{ title: 'Countries' }}
              showSearch
              searchPlaceholder={'Search Country'}
              onChange={handleCountry}
              mode={Picker.modes.SINGLE}
              migrateTextField
              style={inputStyles.inputField}>
              {
                countries.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.code} />
                ))
              }
            </Picker>
          </View>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>City</Text>
            <Picker 
              placeholder={'Select City'}
              value={{ label: generalInformation.city, value: generalInformation.city }}
              enableModalBlur={false}
              topBarProps={{ title: 'Cities' }}
              showSearch
              searchPlaceholder={'Search City'}
              onChange={handleCity}
              mode={Picker.modes.SINGLE}
              migrateTextField
              style={inputStyles.inputField}>
              {
                cities.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={''} />
                ))
              }
            </Picker>
          </View>
          <View style={userGeneralInformationStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Address</Text>
            <TextField style={inputStyles.inputField} value={generalInformation.address} onChangeText={handleAddress}/>
          </View>
        </View>
      </View>
    )
  }

  const renderStep = () => {
    const { activeIndex } = state;
    switch (activeIndex) {
      case 0:
        return renderUserType();
      case 1:
        return renderUserPackage();
      case 2:
        return renderUserInformation();
    }
  }

  const handleState = (index) => {
    const { activeIndex, completedStepIndex } = state;
    let temp = Wizard.States.DISABLED;
    if (completedStepIndex > index - 1) {
      temp = Wizard.States.COMPLETED;
    }
    else if (activeIndex === index || completedStepIndex === index - 1) {
      temp = Wizard.States.ENABLED;
    }
    return temp;
  }

  const handleNextStep = () => {
    if (state.activeIndex === 2) {
      navigation.goBack()
      return
    }
    setState({ 
      ...state,
      activeIndex: state.activeIndex + 1,
      completedStepIndex: state.activeIndex,
      modal: false,
    })
  }

  const handleGoBack = () => {
    if (state.activeIndex === 0) {
      navigation.goBack()
      return
    }
    setState({
      ...state,
      activeIndex: state.activeIndex - 1,
      modal: false
    })
  }

  const handleSubmitPackage = () => {
    if (_package.name === '' || _package.price === '' || _package.description === '' || _package.image === '') {
      return
    }
    dispatch({ type: Packages.ADD_PACKAGE, payload: _package })
    setPackage({ name: '', price: '', description: '', image: images.Buyer })
  }

  const [state, setState] = React.useState({
    activeIndex: 0,
    completedStepIndex: undefined,
    userType: undefined,
    modal: false
  })

  const [_package, setPackage] = React.useState({
    name: '',
    price: '',
    description: '',
    image: images.Buyer,
  })

  const [generalInformation, setGeneralInformation] = React.useState({
    name: '',
    gender: '',
    dob: '',
    contact: '',
    country: { code: '', name: '' },
    city: '',
    address: '',
    picture: '',
  })
  const [countries, setCountries] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [country, setCountry] = React.useState({ code: '', name: '' });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={'dark-content'} showHideTransition={'fade'} backgroundColor={AppHelper.material.green500} />
      <Wizard activeIndex={state.activeIndex} containerStyle={styles.wizard}>
        <Wizard.Step label="Type" state={handleState(0)} />
        <Wizard.Step label="Package" state={handleState(1)} />
        <Wizard.Step label="Information" state={handleState(2)} />
      </Wizard>
      <View style={styles.wizardStepContent}>
        <ScrollView contentContainerStyle={{ display: 'flex', height: '100%' }}>
          {renderStep()}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button label="Go Back" onPress={handleGoBack} style={styles.button}/>
          <Button label="Next Step" onPress={handleNextStep} style={styles.button}/>
        </View>
        {/* <TabController items={[{ label: 'Type' }, { label: 'Packages'}, { label: 'Profile' }]}>
          <TabController.TabBar enableShadows/>
          <TabController.TabPage index={0}>
            {renderUserType()}
          </TabController.TabPage>
          <TabController.TabPage index={1}>
            {renderUserPackage()}
          </TabController.TabPage>
          <TabController.TabPage index={2}>
            {renderUserInformation()}
          </TabController.TabPage>
        </TabController> */}
      </View>
    </SafeAreaView>
  )
}