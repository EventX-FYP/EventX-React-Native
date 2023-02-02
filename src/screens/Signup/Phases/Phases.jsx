import React from 'react'
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native'
import { Button, Wizard } from 'react-native-ui-lib'
import { AppHelper } from '../../../helper'
import { UserType } from './UserType/UserType'
import { Package } from './Package/Package'
import { GeneralInformation } from './GeneralInformation/GeneralInformation'
import { useSelector, useDispatch } from 'react-redux'

export const Phases = ({ navigation }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
    console.log(user);
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
    console.log(user);
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
  })

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.lightWhite,
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  wizard: {
    backgroundColor: AppHelper.material.white,
    borderBottomColor: AppHelper.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wizardStepContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  button: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    height: 40,
    backgroundColor: AppHelper.material.green500,
  },
})