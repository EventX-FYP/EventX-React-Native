import { TabController, View, Text } from 'react-native-ui-lib'
import { Home } from './Home/Home'
import { Notifications } from '../General'
import {Search} from './Search/Search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Packages } from './Packages/Packages';

const Tab = createBottomTabNavigator();

export const Planner = ({ navigation }) => {
  const pages = [
    { label: 'Planner Home' },
    { label: 'Search' },
    { label: 'Packages' },
    { label: 'Notifications' },
  ]
  return (
    // <View flex>
    //   <TabController items={pages}>
    //     <TabController.TabBar enableShadows />
    //     <View flex>
    //       <TabController.TabPage index={0}>
    //         <Home navigation={navigation} />
    //       </TabController.TabPage>
    //       <TabController.TabPage index={1}>
    //         <Search navigation={navigation} />
    //       </TabController.TabPage>
    //       <TabController.TabPage index={2}>
    //         <Text>Hello</Text>
    //       </TabController.TabPage>
    //       <TabController.TabPage index={3}>
    //         <Notifications navigation={navigation} />
    //       </TabController.TabPage>
    //     </View>
    //   </TabController>
    // </View>

    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 65,
        bottom: 5,
        width: "95%",
        alignSelf: "center",
        borderRadius: 16,
        marginTop:30
      }
    }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Packages" component={Packages} />
  
    </Tab.Navigator>
  )
}
