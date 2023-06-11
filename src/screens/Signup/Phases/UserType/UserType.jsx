import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Card, Text } from 'react-native-ui-lib'
import { images } from '../../../../assets'
import { AppHelper } from '../../../../helper'
import { useSelector, useDispatch } from 'react-redux'
import { UPDATE_USER } from '../../../../store/types'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const UserType = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return (
    <View style={userTypeStyles.container}>
      <Text style={userTypeStyles.title}>Join as a client or planner</Text>
      <View style={userTypeStyles.options}>
        <Card style={user.role === 'CLIENT' ? userTypeStyles.cardClicked : userTypeStyles.card}
          onPress={() => dispatch({ type: UPDATE_USER, payload: { ...user, role: "CLIENT" } })}
        >
          <Text style={user.role === 'CLIENT' ? userTypeStyles.cardTextWhite : userTypeStyles.cardText}>
            Client
          </Text>

          <Card.Section
            imageSource={images.Buyer}
            imageStyle={userTypeStyles.image}
          />
        </Card>
        <Card style={user.role === 'PLANNER' ? userTypeStyles.cardClicked : userTypeStyles.card}
          onPress={() => dispatch({ type: UPDATE_USER, payload: { ...user, role: "PLANNER" } })}
        >
          <Text style={user.role === 'PLANNER' ? userTypeStyles.cardTextWhite : userTypeStyles.cardText}>
            Planner
          </Text>
          <Card.Section
            imageSource={images.Seller}
            imageStyle={userTypeStyles.image}
          />
        </Card>
      </View>
    </View>
  )
}

const userTypeStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardTextWhite: {
    fontWeight: 'bold',
    fontSize: 20,
    color: AppHelper.white,
  },
  cardClicked: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    height: 200,
    backgroundColor: AppHelper.material.green500,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  }
})