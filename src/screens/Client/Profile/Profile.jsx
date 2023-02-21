import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../../helper'
import { images } from '../../../assets'
import { Avatar, Caption, Title, TouchableRipple } from 'react-native-paper'
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import { Picker } from 'react-native-ui-lib'
import { inputStyles } from '../../../styles'

export const ClientProfile = ({ navigation }) => {
  const ShareWithFriends = async () => {
    const shareOptions = {
      mimeType: 'text/plain',
      dialogTitle: 'Share Text',
      // UTI: 'text/vcard',
    }
    const fileUri = FileSystem.cacheDirectory + 'dummy.txt'
    const vcard = `Expo Go Testing`

    
    try {
      FileSystem.writeAsStringAsync(fileUri, vcard)
        .then(() => console.log('File created!'))
        .catch((error) => console.log('Error => ', error));
      Sharing.shareAsync(fileUri, shareOptions)
        .then(() => console.log('Shared!'))
        .catch((error) => console.log('Error => ', error))
    } catch (error) {
      console.log('Error => ', error)
    }
  }

  const status = [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
    { label: "Busy", value: "Busy" },
    { label: "Away", value: "Away" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleStatusChange = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    console.log("Current Index: ", currentIndex)
  }, [currentIndex])


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type={Icons.Feather} name={"arrow-left"} size={25} color={"black"}/>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNavigator.EditProfile)}>
          <Icon type={Icons.MaterialCommunityIcons} name="account-edit" size={25} color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={[{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: AppHelper.material.green500,
        margin: 10,
        padding: 15,
        borderRadius: 10,
      }]}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image source={images.Users.Profile} size={80} />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5, color: AppHelper.material.darkWhite }]}>Jane Doe</Title>
            <Caption style={[styles.caption, { color: AppHelper.material.lightWhite }]}>@j_doe</Caption>
          </View>
        </View>
        <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
          <Picker style={[inputStyles.inputFieldWhite, { color: "white" }]} useSafeArea
           value={status[currentIndex]} enableModalBlur={false} topBarProps={{ title: "Status" }} mode={Picker.modes.SINGLE}>
            {
              status.map((item, index) => {
                return (
                  <Picker.Item key={index} value={item} label={item.label} onPress={() => handleStatusChange(index)} />
                )
              })
            }
          </Picker>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon type={Icons.MaterialCommunityIcons} name={"map-marker-radius"} color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Lahore, Pakistan</Text>
        </View>
        <View style={styles.row}>
          <Icon type={Icons.MaterialCommunityIcons} name={"phone"} color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>+92 123 456 789</Text>
        </View>
        <View style={styles.row}>
          <Icon type={Icons.MaterialCommunityIcons} name={"email"} color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>jane_doe@gmail.com</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]}>
          <Title>$140</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon type={Icons.MaterialCommunityIcons} name={"heart-outline"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon type={Icons.MaterialCommunityIcons} name={"credit-card"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={ShareWithFriends}>
          <View style={styles.menuItem}>
            <Icon type={Icons.MaterialCommunityIcons} name={"share-outline"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon type={Icons.MaterialCommunityIcons} name={"account-check-outline"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon type={Icons.Feather} name={"settings"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,

  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderTopColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
})