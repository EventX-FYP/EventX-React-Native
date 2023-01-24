import { Home } from "./Home/Home"
import { TabController, View } from "react-native-ui-lib"
export const Client = ({ navigation }) => {
  const pages = [
    { label: "Home" },
    { label: "Search" },
    { label: "Packages" },
    { label: "Notifications" },
  ]
  return (
    <View flex>
      <TabController items={pages}>
        <TabController.TabBar enableShadows />
        <View flex>
          <TabController.TabPage index={0}>
            <Home navigation={navigation}/>
          </TabController.TabPage>
          <TabController.TabPage index={1}></TabController.TabPage>
          <TabController.TabPage index={2}></TabController.TabPage>
          <TabController.TabPage index={3}></TabController.TabPage>
        </View>
      </TabController>
    </View>
  )
}