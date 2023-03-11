import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native'
import React, { useRef, useEffect } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import { AppHelper } from '../../../helper'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export const Bid = () => {
  const refRBSheet = useRef()

  useEffect(() => {
    refRBSheet.current.open()
  }, [refRBSheet])

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      {/* <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} /> */}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
          },
        }}
        dragFromTopOnly={true}
      >
        <View style={styles.contentContainer}>
          <Text>Bidding</Text>
          <TextInput
            placeholder="Cover letter..."
            style={styles.textInput}
            maxLength={10}
            textAlignVertical="top"
            multiline={true}
          />

          <TextInput placeholder="Estimated Price" style={styles.priceInput} />

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.button}>Send Proposal</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    width: windowWidth - 40,
    height: 150,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    marginVertical: 15,
  },
  contentContainer: {
    alignItems: 'center',
    flex:1,
    justifyContent:"space-evenly"
  },
  button: {
    backgroundColor: AppHelper.material.green400,
    paddingHorizontal: 15,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: windowWidth - 40,
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInput: {
    fontSize: 20,
    width: windowWidth - 40,
    height: 50,
    borderWidth: 0.7,
    borderRadius: 15,
    padding: 10,
  },
})
