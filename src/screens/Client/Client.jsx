import { Home } from "./Home/Home"
import { Search } from "./Search/Search"
import { TabController, View } from "react-native-ui-lib"
import { Job } from "./Job/Job"
import { Notifications } from "../General"
import { Message } from "../General/Message/Message"
export const Client = ({ navigation }) => {
  const pages = [
    { label: "Home" },
    { label: "Search" },
    { label: "Job" },
    { label: "Message" },
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

          <TabController.TabPage index={1}>
            <Search navigation={navigation}/>
          </TabController.TabPage>
          
          <TabController.TabPage index={2}>
            <Job navigation={navigation} />
          </TabController.TabPage>
          
          <TabController.TabPage index={3}>
            <Message navigation={navigation}/>
          </TabController.TabPage>

          <TabController.TabPage index={4}>
            <Notifications navigation={navigation} />
          </TabController.TabPage>
        </View>
      </TabController>
    </View>
  )
}