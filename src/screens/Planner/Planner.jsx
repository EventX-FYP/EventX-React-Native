import { TabController, View } from "react-native-ui-lib"
import { Home } from './Home/Home'

export const Planner = ({ navigation }) => {
  const pages = [
    { label: "Planner Home" },
    { label: "Search" },
    { label: "Packages" },
    { label: "Notifications" },
  ]
  return (
    <View flex>
      <TabController items={pages}>
        <TabController.TabBar enableShadows />
        <View flex>
          <TabController.TabPage index={0}>{<Home navigation={navigation}/>}</TabController.TabPage>
          <TabController.TabPage index={1}></TabController.TabPage>
          <TabController.TabPage index={2}></TabController.TabPage>
          <TabController.TabPage index={3}></TabController.TabPage>
        </View>
      </TabController>
    </View>
  )
}