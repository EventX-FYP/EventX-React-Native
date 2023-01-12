import React from 'react'
import { SafeAreaView, View, StatusBar } from 'react-native'
import { Button, Card, Image, Text, Wizard } from 'react-native-ui-lib'
import { styles, userPortfolioStyles, userTypeStyles } from './styles'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { images } from '../../../assets'

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
      <View style={userPortfolioStyles.container}>
        <View style={userPortfolioStyles.pictureContainer}>
          <Image/>
        </View>
        <Text>Render User Portfolio</Text>
      </View>
    )
  }
  const renderUserInformation = () => {
    return (
      <View>
        <Text>Render User Information</Text>
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

  const [state, setState] = React.useState({
    activeIndex: 0,
    completedStepIndex: undefined,
    userType: undefined,
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={'dark-content'} showHideTransition={'fade'} backgroundColor={AppHelper.material.green500} />
      <Wizard activeIndex={state.activeIndex} containerStyle={styles.wizard}>
        <Wizard.Step label="Type" state={handleState(0)} />
        <Wizard.Step label="Portfolio" state={handleState(1)} />
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