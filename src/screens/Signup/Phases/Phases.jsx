import React from 'react'
import { SafeAreaView, View, StatusBar, ScrollView } from 'react-native'
import { Button, Card, Image, Text, Wizard } from 'react-native-ui-lib'
import { styles, userPackagesStyles, userTypeStyles } from './styles'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { images } from '../../../assets'
import { useSelector, useDispatch } from 'react-redux'
import { SIGN_IN } from '../../../store/types'
import { FloatingLabelInput, FloatingLabelProps } from 'react-native-floating-label-input'
import { PackageCard } from '../../../components'
import { ADD_PACKAGE } from '../../../store/types'

export const Phases = ({ navigation }) => {
  const renderUserType = () => {
    return (
      <View style={userTypeStyles.container}>
        <Text style={userTypeStyles.title}>Join as a client or planner</Text>
        <View style={userTypeStyles.options}>
          <Card style={state.userType === 'C' ? userTypeStyles.cardClicked : userTypeStyles.card} onPress={() => setState({ ...state, userType: 'C' })}>
            <Text style={state.userType === 'C' ? userTypeStyles.cardTextWhite : userTypeStyles.cardText}>Client</Text>
            <Card.Section imageSource={images.Buyer} imageStyle={userTypeStyles.image} />
          </Card>
          <Card style={state.userType === 'P' ? userTypeStyles.cardClicked : userTypeStyles.card} onPress={() => setState({ ...state, userType: 'P' })}>
            <Text style={state.userType === 'P' ? userTypeStyles.cardTextWhite : userTypeStyles.cardText}>Planner</Text>
            <Card.Section imageSource={images.Seller} imageStyle={userTypeStyles.image} />
          </Card>
        </View>
      </View>
    )
  }
  const renderUserPortfolio = () => {
    return (
      <View style={userPackagesStyles.container}>
        <Text style={userPackagesStyles.textHeader}>Add Packages</Text>
        <View style={userPackagesStyles.uploadPictureContainer}>
          <Image style={userPackagesStyles.uploadPicture} source={typeof state.photo !== 'undefined' ? { uri: state.photo } : images.Buyer} />
        </View>
        <View style={userPackagesStyles.inputContainer}>
          <FloatingLabelInput
            label={'Package Name'}
            value={_package.name}
            onChangeText={value => setPackage({ ..._package, name: value })}
            containerStyles={userPackagesStyles.input}
            customLabelStyles={userPackagesStyles.focusedInputText}
            labelStyles={userPackagesStyles.focusedInputText}/>
          
          <FloatingLabelInput
            label={'Package Price'}
            mask="999999"
            hint="Price (Rs.)"
            value={_package.price}
            onChangeText={value => setPackage({ ..._package, price: value })}
            containerStyles={userPackagesStyles.input}
            customLabelStyles={userPackagesStyles.focusedInputText}
            />
          
          <FloatingLabelInput
            label={'Package Description'}
            value={_package.description}
            onChangeText={value => setPackage({ ..._package, description: value })}
            containerStyles={userPackagesStyles.input}
            customLabelStyles={userPackagesStyles.focusedInputText}
            multiline={true}
            />
        </View>
        <View>
          <Button style={userPackagesStyles.button} onPress={handleSubmitPackage} label="Print Package" />
        </View>
          <View style={userPackagesStyles.listPackages}>
            <ScrollView>
              {packages.map((item, index) => <PackageCard key={index} name={item.name} price={item.price} description={item.description} image={item.image} />)}
            </ScrollView>
          </View>
      </View>
    )
  }
  const renderUserInformation = () => {
    return (
      <View>
        <Text>Information</Text>
      </View>
    )
  }

  const renderStep = () => {
    const { activeIndex } = state;
    switch (activeIndex) {
      case 0:
        return renderUserType();
      case 1:
        return renderUserPortfolio();
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
    })
  }

  const handleSubmitPackage = () => {
    if (_package.name === '' || _package.price === '' || _package.description === '') {
      return
    }
    dispatch({ type: ADD_PACKAGE, payload: _package })
    setPackage({
      name: '',
      price: '',
      description: '',
      image: images.Buyer,
    })
  }

  const [state, setState] = React.useState({
    activeIndex: 0,
    completedStepIndex: undefined,
    userType: undefined,
    photo: undefined,
  })

  const [_package, setPackage] = React.useState({
    name: '',
    price: '',
    description: '',
    image: images.Buyer,
  })

  
  const packages = useSelector(state => state.package);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={'dark-content'} showHideTransition={'fade'} backgroundColor={AppHelper.material.green500} />
      <Wizard activeIndex={state.activeIndex} containerStyle={styles.wizard}>
        <Wizard.Step label="Type" state={handleState(0)} />
        <Wizard.Step label="Package" state={handleState(1)} />
        <Wizard.Step label="Information" state={handleState(2)} />
      </Wizard>
      <View style={styles.wizardStepContent}>
        {renderStep()}
        <View style={styles.buttonContainer}>
          <Button label="Go Back" onPress={handleGoBack} style={styles.button}/>
          <Button label="Next Step" onPress={handleNextStep} style={styles.button}/>
        </View>
      </View>
    </SafeAreaView>
  )
}