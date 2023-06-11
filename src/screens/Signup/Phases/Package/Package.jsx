import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Button, Image, Text } from 'react-native-ui-lib'
import { Loader, PackageCard } from '../../../../components'
import { fontStyles, inputStyles } from '../../../../styles'
import { TextField } from 'react-native-ui-lib/src/incubator'
import { AppHelper, pickImage, cloudinaryUpload } from '../../../../helper'
import { useSelector, useDispatch } from 'react-redux'
import { images } from '../../../../assets'
import { UPDATE_PACKAGE } from '../../../../store/types'
import { allCategories } from '../../../../constants/categories'
import { useProgress } from '../../../../store/hooks/progress.hook'


export const Package = ({ navigation }) => {
  const pkg = useSelector((state) => state.pkg)
  const dispatch = useDispatch()

  const { startProgress, stopProgress } = useProgress();

  const [_package, setPackage] = useState({
    title: '',
    description: '',
    picture: pkg.picture ?? images.Buyer,
    price: '',
    categories: allCategories.map((item) => item),
  });

  const pickImagePackage = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      startProgress();
      const source = {
        uri: result.uri,
        type: `test/${result.uri.split("/")[9]}`,
        name: `test.${result.uri.split("/")[9]}`,
      }
      // return;
      const cloudinaryUrl = await cloudinaryUpload(source);
      setPackage({ ..._package, picture: cloudinaryUrl });
      dispatch({ type: UPDATE_PACKAGE, payload: { ...pkg, picture: cloudinaryUrl } })
      stopProgress();
    }
  };

  const handleSubmitPackage = () => {
    dispatch({
      type: UPDATE_PACKAGE, payload: {
        ...pkg,
        packages: [...pkg.packages, _package]
      }
    })
    setPackage({
      title: '',
      picture: images.Buyer,
      price: '',
      description: '',
      categories: allCategories.map((item) => item),
    })
  }

  const handleRemovePackage = (index) => {
    const newPackages = pkg.packages.filter((_, i) => i !== index)
  }


  return (
    <View style={userPackagesStyles.container}>
      <Loader />
      <Text style={userPackagesStyles.textHeader}>Add Packages</Text>
      <View style={userPackagesStyles.uploadPictureContainer}>
        <Image
          style={userPackagesStyles.uploadPicture}
          source={_package.picture === images.Buyer ? _package.picture : { uri: _package.picture }}
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
            value={_package.title}
            onChangeText={(value) => setPackage({ ..._package, title: value })}
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
        {/* <View style={userPackagesStyles.inputRow}>
          <Text style={[fontStyles[700], fontStyles.large]}>
            Package Category
          </Text>
          <Picker
            style={inputStyles.inputField}
            value={_package.categories}
            mode={Picker.modes.MULTI}
            selectionLimit={3}
            onChange={(value) => setPackage({
              ..._package, categories: [
                ..._package.categories, { value }]
            })}
            trailingAccessory={false}
            migrateTextField={true}
          >
            {pickerCategories.map((item, index) => (
              <Picker.Item key={index} value={item.value} label={item.label} />
            ))}
          </Picker>
        </View> */}
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
        pkg.packages.length > 0 && (
          <View style={userPackagesStyles.listPackages}>
            <ScrollView>
              {pkg.packages.map((item, index) => (
                <PackageCard
                  key={index}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  picture={item.picture}
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