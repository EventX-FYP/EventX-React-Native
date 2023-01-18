import React from 'react'
import { SafeAreaView, View, StatusBar, ScrollView } from 'react-native'
import { Button, Card, Chip, Image, Modal, Text, Wizard } from 'react-native-ui-lib'
import { styles, userCategoriesStyles, userPackagesStyles, userTypeStyles } from './styles'
import { AppHelper } from '../../../helper/AppHelper/AppHelper'
import { images } from '../../../assets'
import { useSelector, useDispatch } from 'react-redux'
import { PackageCard } from '../../../components'
import { ADD_PACKAGE } from '../../../store/types'
import { fontStyles, inputStyles } from '../../../styles/generalStyles'
import TextField from 'react-native-ui-lib/src/incubator/TextField'

export const Phases = ({ navigation }) => {
  const dispatch = useDispatch()
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
  const renderUserPortfolio = () => {
    return (
      <View style={userPackagesStyles.container}>
        <Text style={userPackagesStyles.textHeader}>Add Packages</Text>
        <View style={userPackagesStyles.uploadPictureContainer}>
          <Image style={userPackagesStyles.uploadPicture} source={typeof state.photo !== 'undefined' ? { uri: state.photo } : images.Buyer} />
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
    modal: false
  })

  const [_package, setPackage] = React.useState({
    name: '',
    price: '',
    description: '',
    image: images.Buyer,
  })

  const [isVisible, setIsVisible] = React.useState(false)
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