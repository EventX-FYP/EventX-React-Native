import { StyleSheet, TouchableOpacity, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icons, ScreenNavigator, Icon, AppHelper } from "../../helper"

import { Home } from "./Home/Home"
import { Search } from "./Search/Search"
import { Job } from "./Job/Job"
import { Notifications } from "../General"
import { ChatList } from "../General"
import { useEffect, useRef, useState } from "react"
import * as Animatable from "react-native-animatable"
import { Sidebar } from "../../components"

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState, setCurrentTab } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate({ 0: { scale: .5, rotate: "0deg" }, 1: { scale: 1.2, rotate: "360deg" }});
      setCurrentTab(item.label);
    } else {
      viewRef.current?.animate({ 0: { scale: 1.2, rotate: "360deg" }, 1: { scale: 1, rotate: "0deg" }});
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={500} style={styles.container}>
        <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? AppHelper.material.green700 : AppHelper.material.grey600} size={24} />
      </Animatable.View>
    </TouchableOpacity>
  )
}

export const Client = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState("Home");

  const sidebarIcons = [
    { route: ScreenNavigator.ClientHome, title: "Home", type: Icons.Ionicons, name: "home" },
    { route: ScreenNavigator.ClientSearch, title: "Search", type: Icons.Ionicons, name: "search" },
    { route: ScreenNavigator.ClientJob, title: "Job", type: Icons.Ionicons, name: "briefcase" },
    { route: ScreenNavigator.ClientMessage, title: "Messages", type: Icons.Ionicons, name: "chatbubble" },
    { route: ScreenNavigator.ClientNotifications, title: "Notifications", type: Icons.Ionicons, name: "notifications" },
  ]
  const tabs = [
    { route: ScreenNavigator.ClientHome, label: "Home", type: Icons.Ionicons, activeIcon: "home", inActiveIcon: "home-outline", component: Home,  },
    { route: ScreenNavigator.ClientSearch, label: "Search", type: Icons.Ionicons, activeIcon: "search", inActiveIcon: "search", component: Search,  },
    { route: ScreenNavigator.ClientJob, label: "Job", type: Icons.Ionicons, activeIcon: "briefcase", inActiveIcon: "briefcase-outline", component: Job,  },
    { route: ScreenNavigator.ClientMessage, label: "Messages", type: Icons.Ionicons, activeIcon: "chatbubble", inActiveIcon: "chatbubble-outline", component: ChatList,  },
    { route: ScreenNavigator.ClientNotifications, label: "Notifications", type: Icons.Ionicons, activeIcon: "notifications", inActiveIcon: "notifications-outline", component: Notifications,  },
  ]

  return (
    <Sidebar
      sideBar={sidebarIcons}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      navigation={navigation}>
      
      <Tab.Navigator
        initialRouteName={ScreenNavigator.ClientHome}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            bottom: 5,
            width: "95%",
            alignSelf: "center",
            borderRadius: 16
          }
        }}>
        {
          tabs.map((tab, index) => (
            <Tab.Screen key={index} name={tab.route} component={tab.component}
              options={{
                tabBarLabel: tab.label,
                tabBarButton: (props) => <TabButton {...props} item={tab} setCurrentTab={setCurrentTab} />
              }}
            />
          ))
        }
      </Tab.Navigator>
    </Sidebar>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})