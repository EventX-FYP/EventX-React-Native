import React from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import { Button, Wizard } from 'react-native-ui-lib'
import { styles } from './styles'
import { images } from '../../../assets'
import { useSelector, useDispatch } from 'react-redux'
import { Packages } from '../../../store/types'
import { AppHelper } from '../../../helper'
import { UserType } from './UserType'
import { Package } from './Package'
import { GeneralInformation } from './GeneralInformation'

export const Phases = ({ navigation }) => {
  const dispatch = useDispatch()
  const packages = useSelector((state) => state.package)

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

  const renderStep = () => {
    const { activeIndex } = state
    switch (activeIndex) {
      case 0:
        return <UserType navigation={navigation} />
      case 1:
        return <Package navigation={navigation} />
      case 2:
        return <GeneralInformation navigation={navigation} />
    }
  }

  const handleState = (index) => {
    const { activeIndex, completedStepIndex } = state
    let temp = Wizard.States.DISABLED
    if (completedStepIndex > index - 1) {
      temp = Wizard.States.COMPLETED
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      temp = Wizard.States.ENABLED
    }
    return temp
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
      modal: false,
    })
  }

  const handleSubmitPackage = () => {
    if (
      _package.name === '' ||
      _package.price === '' ||
      _package.description === '' ||
      _package.image === ''
    ) {
      return
    }
    dispatch({ type: Packages.ADD_PACKAGE, payload: _package })
    setPackage({ name: '', price: '', description: '', image: images.Buyer })
  }

  const [state, setState] = React.useState({
    activeIndex: 0,
    completedStepIndex: undefined,
    userType: undefined,
    modal: false,
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
  const [countries, setCountries] = React.useState([])
  const [cities, setCities] = React.useState([])
  const [states, setStates] = React.useState([])
  const [country, setCountry] = React.useState({ code: '', name: '' })
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
        backgroundColor={AppHelper.material.green500}
      />
      <Wizard activeIndex={state.activeIndex} containerStyle={styles.wizard}>
        <Wizard.Step label="Type" state={handleState(0)} />
        <Wizard.Step label="Package" state={handleState(1)} />
        <Wizard.Step label="Information" state={handleState(2)} />
      </Wizard>
      <View style={styles.wizardStepContent}>
        {renderStep()}
        <View style={styles.buttonContainer}>
          <Button
            label="Go Back"
            onPress={handleGoBack}
            style={styles.button}
          />
          <Button
            label="Next Step"
            onPress={handleNextStep}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
