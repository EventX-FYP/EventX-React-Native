import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, Image, Text } from 'react-native-ui-lib'
import { PackageCard } from '../../../../components'
import { fontStyles, inputStyles } from '../../../../styles'
import { TextField } from 'react-native-ui-lib/src/incubator'
import { AppHelper, pickImage } from '../../../../helper'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from "expo-image-picker"
import { images } from '../../../../assets'
import { UPDATE_USER } from "../../../../store/types";


export const Package = ({ navigation }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [_package, setPackage] = useState({
    name: '',
    image: images.Buyer,
    price: '',
    description: '',
  });

  const pickImagePackage = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      setPackage({ ..._package, image: result.uri });
    } 
  };

  const handleSubmitPackage = () => {
    dispatch({ type: UPDATE_USER, payload: { ...user, packages: [...user.packages, _package] }})
    setPackage({
      name: '',
      image: images.Buyer,
      price: '',
      description: '',
    })
  }

  const handleRemovePackage = (index) => {
    const newPackages = user.packages.filter((_, i) => i !== index)
    dispatch({ type: UPDATE_USER, payload: { ...user, packages: newPackages }})
  }


  return (
    <View style={userPackagesStyles.container}>
        <Text style={userPackagesStyles.textHeader}>Add Packages</Text>
        <View style={userPackagesStyles.uploadPictureContainer}>
          <Image
            style={userPackagesStyles.uploadPicture}
            source={_package.image === images.Buyer ? _package.image : {uri: _package.image}}
          />
          <Button
            label="Upload Picture"
            onPress={pickImagePackage}
            style={userPackagesStyles.uploadPictureButton}
          />
        </View>
        <View style={userPackagesStyles.inputContainer}>
          <View style={userPackagesStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>
              Package Name
            </Text>
            <TextField
              style={inputStyles.inputField}
              value={_package.name}
              onChangeText={(value) => setPackage({ ..._package, name: value })}
            />
          </View>
          <View style={userPackagesStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>
              Package Price
            </Text>
            <TextField
              style={inputStyles.inputField}
              value={_package.price}
              onChangeText={(value) =>
                setPackage({ ..._package, price: value })
              }
            />
          </View>
          <View style={userPackagesStyles.inputRow}>
            <Text style={[fontStyles[700], fontStyles.large]}>Package Description</Text>
            <TextField
              style={inputStyles.inputField}
              value={_package.description}
              onChangeText={(value) =>
                setPackage({ ..._package, description: value })
              }
            />
          </View>
        </View>
        <View>
          <Button
            style={userPackagesStyles.button}
            onPress={handleSubmitPackage}
            label="Add Package"
          />
        </View>
        {
          user.packages.length > 0 && (
            <View style={userPackagesStyles.listPackages}>
              <ScrollView>
                {user.packages.map((item, index) => (
                  <PackageCard
                    key={index}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                  />
                ))}
              </ScrollView>
            </View>
          )
        }
      </View>
  )
}

const userPackagesStyles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '90%',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
  },
  uploadPictureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '20%',
  },
  uploadPicture: {
    width: 110,
    height: 110,
    borderRadius: 10,
    borderColor: AppHelper.material.green200,
    borderWidth: 1.4,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    width: "100%",
    height: '37%',
  },
  defaultInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: AppHelper.material.green500,
  },
  listPackages: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '30%',
    borderColor: AppHelper.gray2,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  inputRow: {
    height: 70,
    justifyContent: 'space-between',
  }
})