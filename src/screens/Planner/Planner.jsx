import { TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home/Home'
import { ChatList, Notifications } from '../General'
import { Search } from './Search/Search'
import { Packages } from './Packages/Packages';
import { Icon, Icons, ScreenNavigator, AppHelper } from '../../helper';
import { Loader, Sidebar } from '../../components';
import * as Animatable from 'react-native-animatable';
import React, { useState, useRef, useEffect } from 'react';

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState, setCurrentTab } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current?.animate({ 0: { scale: .5, rotate: "0deg" }, 1: { scale: 1.2, rotate: "360deg" } });
      setCurrentTab(item.label);
    } else {
      viewRef.current?.animate({ 0: { scale: 1.2, rotate: "360deg" }, 1: { scale: 1, rotate: "0deg" } });
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

export const Planner = ({ navigation }) => {
  const sidebarIcons = [
    { route: ScreenNavigator.TaskManagementHome, title: "Tasks", type: Icons.FontAwesome, name: "tasks" },
    // { route: ScreenNavigator.PlannerGetFeatured, title: "Get Featured", type: Icons.Entypo, name: "bell" },
    // { route: ScreenNavigator.ClientAnalytics, title: "Analytics", type: Icons.Ionicons, name: "analytics" },
    // { route: ScreenNavigator.ClientProposals, title: "Proposals", type: Icons.Ionicons, name: "mail" },
    // { route: ScreenNavigator.PlannerActiveJobs, title: "Active Jobs", type: Icons.MaterialIcons, name: "work" },
  ]

  const tabs = [
    { route: ScreenNavigator.PlannerHome, label: 'Home', type: Icons.Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: Home },
    // { route: ScreenNavigator.PlannerSearch, label: 'Search', type: Icons.Ionicons, activeIcon: 'search', inActiveIcon: 'search', component: Search },
    { route: ScreenNavigator.PlannerPackages, label: 'Packages', type: Icons.Feather, activeIcon: 'package', inActiveIcon: 'package', component: Packages },
    { route: ScreenNavigator.ClientMessage, label: "Messages", type: Icons.Ionicons, activeIcon: "chatbubble", inActiveIcon: "chatbubble-outline", component: ChatList, },
    // { route: ScreenNavigator.PlannerNotifications, label: 'Notifications', type: Icons.Ionicons, activeIcon: 'notifications', inActiveIcon: 'notifications-outline', component: Notifications },
  ]

  const [currentTab, setCurrentTab] = useState(tabs[0].label);

  return (
    <Sidebar sideBar={sidebarIcons} currentTab={currentTab} setCurrentTab={setCurrentTab} navigation={navigation}>
      <Loader />
      <Tab.Navigator
        initialRouteName={ScreenNavigator.PlannerHome}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            bottom: 5,
            width: "95%",
            alignSelf: "center",
            borderRadius: 16,
            elevation: 0,
            zIndex: 0,
          }
        }}
      >
        {tabs.map((item, index) => (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarButton: (props) => <TabButton {...props} item={item} setCurrentTab={setCurrentTab} />
            }}
          />
        ))}
      </Tab.Navigator>
    </Sidebar>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    elevation: 0,
  },
})
