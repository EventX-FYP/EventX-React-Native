import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { fontStyles } from '../../../styles'
import { images } from '../../../assets'
import { AppHelper, cloudinaryUpload, pickImage, ScreenNavigator } from '../../../helper'
import { useProgress } from '../../../store/hooks/progress.hook'
import { Loader } from '../../../components'
import { useApollo } from '../../../graphql/apollo'
import { CREATE_PACKAGE } from '../../../graphql/mutations'
import { useSelector } from 'react-redux'

export const AddPackages = ({ navigation }) => {
  const [packageInfo, setPackageInfo] = React.useState({
    title: "",
    price: "",
    description: "",
    picture: "",
  })

  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();
  const user = useSelector(state => state.user);

  const handlePicture = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      startProgress()
      const source = {
        uri: result.uri,
        type: `test/${result.uri.split("/")[9]}`,
        name: `test.${result.uri.split("/")[9]}`,
      }
      const cloudinaryUrl = await cloudinaryUpload(source)
      setPackageInfo({ ...packageInfo, picture: cloudinaryUrl })
      stopProgress()
    }
  }

  const handleSubmit = async () => {
    try {
      startProgress()
      // console.log({
      //   data: JSON.stringify({
      //     ...packageInfo,
      //     price: parseInt(packageInfo.price),
      //     sellerId: user.id,
      //   })
      // });
      // return;
      const { data } = await apolloClient.mutate({
        mutation: CREATE_PACKAGE,
        variables: {
          data: JSON.stringify({
            ...packageInfo,
            price: parseInt(packageInfo.price),
            sellerId: user.id,
          })
        }
      });

      if (data.createPackage) {
        navigation.goBack()
      }
    } catch (err) {
      alert(err.message)
    } finally {
      stopProgress()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader />
      <View style={{ display: "flex", flexDirection: "column" }}>
        <Text style={[fontStyles[700], fontStyles.large22]}>Add Package</Text>
        <TouchableOpacity onPress={handlePicture} activeOpacity={0.8} style={{ alignItems: "center", marginTop: 20 }}>
          <Image source={packageInfo.picture ? { uri: packageInfo.picture } : images.BirthdayPlanner} style={{ width: 120, height: 120, borderRadius: 100 }} />
        </TouchableOpacity>
        <View style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
          <Text style={[fontStyles[600], fontStyles.large]}>Title</Text>
          <TextInput
            style={[fontStyles[400], fontStyles.large, { borderBottomWidth: 1, borderBottomColor: "#000", width: "100%", marginTop: 10 }]}
            onChangeText={(text) => setPackageInfo({ ...packageInfo, title: text })}
            value={packageInfo.title}
          />
          <Text style={[fontStyles[600], fontStyles.large, { marginTop: 20 }]}>Price</Text>
          <TextInput
            style={[fontStyles[400], fontStyles.large, { borderBottomWidth: 1, borderBottomColor: "#000", width: "100%", marginTop: 10 }]}
            onChangeText={(text) => setPackageInfo({ ...packageInfo, price: text })}
            value={packageInfo.price}
          />
          <Text style={[fontStyles[600], fontStyles.large, { marginTop: 20 }]}>Description</Text>
          <TextInput
            style={[fontStyles[400], fontStyles.large, { borderBottomWidth: 1, borderBottomColor: "#000", width: "100%", marginTop: 10 }]}
            onChangeText={(text) => setPackageInfo({ ...packageInfo, description: text })}
            value={packageInfo.description}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green500, padding: 10, borderRadius: 10, marginTop: 20, alignItems: "center" }}>
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