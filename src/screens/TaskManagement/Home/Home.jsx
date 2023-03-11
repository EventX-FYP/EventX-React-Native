import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Sidebar } from '../../../components';
import { Icons, ScreenNavigator, Icon, AppHelper } from '../../../helper';


const InfoButton = ({ color, text, value, height, icon }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={{ width: "46%", backgroundColor: color, margin: 5, borderRadius: 12, padding: 12, height: height }}>
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ backgroundColor: "white", padding: 8, borderRadius: 50 }}>
            <Icon name={icon.name} type={icon.type} size={18} color={color} />
          </View>
          <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>{value}</Text>
        </View>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600", textAlign: "right" }}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const ListButton = ({ icon, iconBg, text, value, navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={{ width: "100%" }} onPress={() => navigation.navigate(ScreenNavigator.TaskManagementTask)}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ backgroundColor: iconBg, padding: 6, paddingHorizontal: 8, borderRadius: 50 }}>
            <Icon name={icon?.name} type={icon?.type} size={18} color="white" />
          </View>
          <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: "bold", color: AppHelper.material.grey900, marginLeft: 10, maxWidth: "83%" }}>{text}</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: AppHelper.material.grey900 }}>{value}</Text>
          <Icon name={"chevron-right"} type={Icons.Entypo} size={18} color={"black"} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const Home = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState("Home");
  const sidebarIcons = [
    { route: ScreenNavigator.TaskManagementHome, title: "Home", type: Icons.Ionicons, name: "home" },
  ]
  const InfoIcons = [
    { type: Icons.MaterialCommunityIcons, name: "file" },
    { type: Icons.Ionicons, name: "calendar" },
    { type: Icons.AntDesign, name: "star" },
    { type: Icons.FontAwesome, name: "folder" },
  ]

  const ListIcons = [
    { type: Icons.FontAwesome5, name: "shopping-bag" },
    { type: Icons.Foundation, name: "heart" },
    { type: Icons.Ionicons, name: "tv" },
    { type: Icons.Ionicons, name: "ios-home" },
  ]
  return (
    <Sidebar sideBar={sidebarIcons} currentTab={currentTab} setCurrentTab={setCurrentTab} navigation={navigation}>
      <ScrollView style={[styles.container, { padding: 10 }]}>
        <SafeAreaView >
          <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <InfoButton value={8} text={"Scheduled"} color={AppHelper.material.blue700} height={110} icon={InfoIcons[0]} />
              <InfoButton value={5} text={"Today"} color={AppHelper.material.red700} height={110} icon={InfoIcons[1]} />
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <InfoButton value={10} text={"Important"} color={AppHelper.material.orange700} height={110} icon={InfoIcons[2]} />
              <InfoButton value={23} text={"All Tasks"} color={AppHelper.material.green700} height={110} icon={InfoIcons[3]} />
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", marginVertical: 15, marginHorizontal: 10, flex: 1 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 22, fontWeight: "bold", color: AppHelper.material.grey900 }}>My Works</Text>
              <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: AppHelper.material.green600, padding: 8, borderRadius: 50 }}>
                <Icon name="add" type={Icons.MaterialIcons} size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 15, paddingVertical: 20, borderRadius: 12, backgroundColor: "white", marginTop: 20, alignItems: "center" }}>
              <ListButton icon={ListIcons[0]} value={"41"} text="Birthday Planner Required difiubi" iconBg={AppHelper.material.cyan500} navigation={navigation} />
              <View style={styles.separator}/>
              <ListButton icon={ListIcons[1]} value={"28"} text="I need Wedding Organizer" iconBg={AppHelper.material.red600} navigation={navigation} />
              <View style={styles.separator}/>
              <ListButton icon={ListIcons[2]} value={"6"} text="I need Birthday Planner" iconBg={AppHelper.material.deepPurple300} navigation={navigation} />
              <View style={styles.separator}/>
              <ListButton icon={ListIcons[3]} value={"14"} text="I need Party Organizer" iconBg={AppHelper.material.yellow700} navigation={navigation} />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Sidebar>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppHelper.material.grey100,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '95%',
    backgroundColor: AppHelper.material.grey300,
  }
})