import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { fontStyles } from '../../../styles'
import { images } from '../../../assets'
import { AppHelper, pickImage, ScreenNavigator } from '../../../helper'

export const AddPackages = ({ navigation, route }) => {
  const {name} = route.params;
  const [packageInfo, setPackageInfo] = React.useState({
    title: "",
    price: "",
    description: "",
    picture: "",
  })

  const handlePicture = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      setPackageInfo({...packageInfo, picture: result.uri})
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text style={[fontStyles[700], fontStyles.large22]}>Add {name}</Text>
        <TouchableOpacity onPress={handlePicture} activeOpacity={0.8} style={{ alignItems: "center", marginTop: 20 }}>
          <Image source={packageInfo.picture ? {uri: packageInfo.picture} : images.BirthdayPlanner} style={{ width: 120, height: 120, borderRadius: 100 }}/>
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "column", marginTop: 20}}>
          <Text style={[fontStyles[600], fontStyles.large]}>Title</Text>
          <TextInput
            style={[fontStyles[400], fontStyles.large, { borderBottomWidth: 1, borderBottomColor: "#000", width: "100%", marginTop: 10 }]}
            onChangeText={(text) => setPackageInfo({...packageInfo, title: text})}
            value={packageInfo.title}
          />
          <Text style={[fontStyles[600], fontStyles.large, { marginTop: 20 }]}>Price</Text>
          <TextInput
            style={[fontStyles[400], fontStyles.large, { borderBottomWidth: 1, borderBottomColor: "#000", width: "100%", marginTop: 10 }]}
            onChangeText={(text) => setPackageInfo({...packageInfo, price: text})}
            value={packageInfo.price}
          />
          <Text style={[fontStyles[600], fontStyles.large, { marginTop: 20 }]}>Description</Text>
          <TextInput
            style={[fontStyles[400], fontStyles.large, { borderBottomWidth: 1, borderBottomColor: "#000", width: "100%", marginTop: 10 }]}
            onChangeText={(text) => setPackageInfo({...packageInfo, description: text})}
            value={packageInfo.description}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green500, padding: 10, borderRadius: 10, marginTop: 20, alignItems: "center" }}>
          <Text style={[fontStyles[600], fontStyles.large, { color: "#fff" }]}>Save</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})