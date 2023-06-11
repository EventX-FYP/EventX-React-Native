import React, { useState } from 'react'
import { SafeAreaView, View, StatusBar, StyleSheet } from 'react-native'
import { Button, Wizard } from 'react-native-ui-lib'
import { AppHelper, ScreenNavigator } from '../../../helper'
import { UserType } from './UserType/UserType'
import { Package } from './Package/Package'
import { GeneralInformation } from './GeneralInformation/GeneralInformation'
import { useSelector, useDispatch } from 'react-redux'
import { UserCategories } from './UserCategories/UserCategories'
import { useProgress } from '../../../store/hooks/progress.hook'
import { GET_USER, UPDATE_USER } from '../../../store/types'
import { useApollo } from '../../../graphql/apollo'
import { CREATE_USER, CREATE_USER_WITH_PACKAGES } from '../../../graphql/mutations'
import { allCategories } from '../../../constants/categories'

export const Phases = ({ navigation }) => {
  const user = useSelector((state) => state.user)
  const pkg = useSelector((state) => state.pkg)
  const apolloClient = useApollo();
  const dispatch = useDispatch()

  const renderStep = () => {
    const { activeIndex } = state
    switch (activeIndex) {
      case 0:
        return <UserType navigation={navigation} />
      case 1:
        return <UserCategories navigation={navigation} />
      case 2:
        return <Package navigation={navigation} />
      case 3:
        return <GeneralInformation navigation={navigation} />
    }
  }

  const { startProgress, stopProgress } = useProgress();

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

  const handleNextStep = async () => {
    stopProgress();
    console.log(user);
    if (state.activeIndex === 0) {
      if (user.role === '') {
        alert('Please select a role')
        return
      } else if (user.role === "CLIENT") {
        setState({
          ...state,
          activeIndex: state.activeIndex + 3,
          completedStepIndex: state.activeIndex + 2,
        })
      } else {
        setState({
          ...state,
          activeIndex: state.activeIndex + 1,
          completedStepIndex: state.activeIndex + 1,
        })
      }
    } else if (state.activeIndex === 3) {
      // navigation.goBack()
      if ((user.role === "CLIENT" || (user.role === "PLANNER" && pkg.packages.length === 0))) {
        try {
          startProgress();
          const { accessToken, id, recommendation, categories, ...rest } = user;
          console.log(rest);
          const { data, error } = await apolloClient.mutate({
            mutation: CREATE_USER,
            variables: {
              data: rest,
            },
          });

          if (error) {
            alert(error.message)
          }

          if (data.createUser) {
            dispatch({ type: UPDATE_USER, payload: data.createUser })
            if (user.role === "CLIENT") {
              navigation.navigate(ScreenNavigator.Client)
            } else {
              navigation.navigate(ScreenNavigator.Planner)
            }
          }
        } catch (error) {
          alert(error.message)
        } finally {
          stopProgress();
        }
      } else {
        try {
          startProgress();
          const { accessToken, id, recommendation, categories, ...rest } = user;

          const { data } = await apolloClient.mutate({
            mutation: CREATE_USER_WITH_PACKAGES,
            variables: {
              user: rest,
              pkg: JSON.stringify(pkg.packages.map(item => {
                return {
                  title: item.title,
                  description: item.description,
                  price: item.price,
                  picture: item.picture,
                  sellerId: user.id ?? "",
                }
              }))
            }
          });
          if (data.createUserWithPackages) {
            dispatch({ type: UPDATE_USER, payload: data.createUserWithPackages })
            if (user.role === "CLIENT") {
              navigation.navigate(ScreenNavigator.Client)
            } else {
              navigation.navigate(ScreenNavigator.Planner)
            }
          }

        } catch (error) {
          alert(error)
        } finally {
          stopProgress();
        }
      }
    } else {
      if (state.activeIndex === 1 && user.categories.length === 0) {
        alert('Please select at least one category')
        return
      }
      setState({
        ...state,
        activeIndex: state.activeIndex + 1,
        completedStepIndex: state.activeIndex + 1,
      })
    }
  }

  const handleGoBack = () => {
    stopProgress();
    // console.log(user);
    if (state.activeIndex === 0) {
      navigation.goBack()
      return
    } else if (state.activeIndex === 3) {
      if (user.role === "CLIENT") {
        setState({
          ...state,
          activeIndex: state.activeIndex - 3,
        })
      } else {
        setState({
          ...state,
          activeIndex: state.activeIndex - 1,
        })
      }
    } else {
      setState({
        ...state,
        activeIndex: state.activeIndex - 1,
      })
    }
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
        <Wizard.Step label="Categories" state={handleState(1)} />
        <Wizard.Step label="Package" state={handleState(2)} />
        <Wizard.Step label="Information" state={handleState(3)} />
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