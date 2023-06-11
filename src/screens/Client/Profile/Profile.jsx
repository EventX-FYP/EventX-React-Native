import { SafeAreaView, StyleSheet, View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../../helper'
import { Avatar, Caption, Snackbar, Title, TouchableRipple } from 'react-native-paper'
import * as Sharing from "expo-sharing"
import * as FileSystem from "expo-file-system"
import { useSelector } from 'react-redux'

export const ClientProfile = ({ route, navigation }) => {
  const user = useSelector(state => state.user);
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

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleStatusChange = (e) => {
    setCurrentIndex(e.value);
  }

  const [snackBarVisible, setSnackBarVisible] = useState(false)
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible)
  const onDismissSnackBar = () => setSnackBarVisible(false)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon type={Icons.Feather} name={"arrow-left"} size={25} color={"black"} />
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
          <Avatar.Image source={{ uri: user.picture }} size={80} />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, { marginTop: 15, marginBottom: 5, color: AppHelper.material.darkWhite }]}>{user.name}</Title>
            <Caption style={[styles.caption, { color: AppHelper.material.lightWhite }]}>@{user.name}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon type={Icons.MaterialCommunityIcons} name={"map-marker-radius"} color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.city}, {user.country}</Text>
        </View>
        <View style={styles.row}>
          <Icon type={Icons.MaterialCommunityIcons} name={"phone"} color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon type={Icons.MaterialCommunityIcons} name={"email"} color={"#777777"} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
        </View>
      </View>

      {/* <View style={styles.infoBoxWrapper}>
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
      </View> */}

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={onToggleSnackBar}>
          <View style={styles.menuItem}>
            <Icon type={Icons.MaterialCommunityIcons} name={"heart-outline"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={onToggleSnackBar}>
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
        <TouchableRipple onPress={onToggleSnackBar}>
          <View style={styles.menuItem}>
            <Icon type={Icons.MaterialCommunityIcons} name={"account-check-outline"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={onToggleSnackBar}>
          <View style={styles.menuItem}>
            <Icon type={Icons.Feather} name={"settings"} color={AppHelper.material.green600} size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        duration={3000}
        action={{
          label: 'Close',
          onPress: () => {
            onDismissSnackBar();
          }
        }}
      >
        This feature is not available yet.
      </Snackbar>
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