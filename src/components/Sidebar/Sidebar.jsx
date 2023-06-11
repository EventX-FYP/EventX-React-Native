import { SafeAreaView, StyleSheet, Text, View, Animated, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { images } from '../../assets'
import { AppHelper, Icon, Icons, ScreenNavigator } from '../../helper'
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_USER } from '../../store/types';


const bgColor = AppHelper.material.green500;
let menu, nav;

const TabButton = forwardRef(({ currentTab, setCurrentTab, item }, ref) => {
  const dispatch = useDispatch();
  const handleNavigation = async (e) => {
    e.preventDefault();
    if (item.title === "Log out") {
      dispatch({ type: LOGOUT_USER });
      nav.replace(ScreenNavigator.Login);
      return;
    }
    // if (item.title !== currentTab) {
    // setCurrentTab(item.title);
    ref.current.handleMenuButton();
    nav.navigate(item.route)
    // }
  }

  // const tintColor = currentTab === item.title ? bgColor : "white";
  // const backgroundColor = currentTab === item.title ? "white" : "transparent";
  const tintColor = "white";
  const backgroundColor = "transparent";

  return (
    <TouchableOpacity onPress={handleNavigation}>
      <View style={[styles.tabButtonView, { backgroundColor: backgroundColor }]}>
        <Icon type={item.type} name={item.name} color={tintColor} />
        <Text style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 15, color: tintColor }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  )
})

export const Sidebar = ({ children, sideBar, currentTab, setCurrentTab, navigation }) => {
  const [showMenu, setShowMenu] = useState(false);

  menu = showMenu;
  nav = navigation;

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const user = useSelector(state => state.user);

  const sideBarRef = useRef();

  useImperativeHandle(sideBarRef, () => ({
    handleMenuButton,
  }), [handleMenuButton])


  const tabs = [
    { name: "home", type: Icons.Ionicons, title: "Home" },
    { name: "search", type: Icons.Ionicons, title: "Search" },
    { name: "notifications", type: Icons.Ionicons, title: "Notifications" },
    { name: "settings", type: Icons.Feather, title: "Settings" },
    { name: "log-out", type: Icons.Feather, title: "Log out" },
  ];

  const handleMenuButton = () => {
    Animated.timing(scaleValue, {
      toValue: menu ? 1 : 0.95,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      toValue: menu ? 0 : 230,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      // toValue: menu ? 0 : 20,
      duration: 200,
      useNativeDriver: true,
    }).start();

    menu = !menu;
    setShowMenu(menu);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: "flex-start", padding: 15 }}>
        <Image source={{ uri: user.picture }} style={{ width: 60, height: 60, borderRadius: 15, marginTop: 8 }} />
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", marginTop: 20 }}>{user.name}</Text>
        <TouchableOpacity onPress={() => {
          handleMenuButton();
          navigation.navigate(ScreenNavigator.ClientProfile)
        }}>
          <Text style={{ marginTop: 6, color: "white" }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {sideBar.map((item, index) => (
            item.title !== "Log out" && <TabButton key={index} currentTab={currentTab} setCurrentTab={setCurrentTab} item={item} ref={sideBarRef} />
          ))}
        </View>

        <View>
          <TabButton currentTab={currentTab} setCurrentTab={setCurrentTab} item={tabs[tabs.length - 1]} ref={sideBarRef} />
        </View>
      </View>

      {/* OverlayView */}
      <Animated.View style={[styles.overlayView, {
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue },
        ],
        borderRadius: menu ? 15 : 0
      }]}>
        <Animated.View style={{ transform: [{ translateY: closeButtonOffset }], flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity onPress={handleMenuButton} style={{ flexDirection: "row", height: 50, paddingLeft: 10 }}>
            <Icon type={Icons.Ionicons} name={menu ? "close" : "menu"} color="black" size={30} style={{ alignSelf: "center" }} />
            <Text style={{ alignSelf: "center", fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>{currentTab}</Text>
          </TouchableOpacity>
        </Animated.View>
        {children}
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tabButtonView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 13,
    paddingRight: 35,
    borderRadius: 8,
    marginTop: 15,
  },
  overlayView: {
    // flexGrow: 1,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // paddingHorizontal: 15,
    // paddingVertical: 20,
  },

})