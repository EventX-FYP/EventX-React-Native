import { TabController, View, Text } from 'react-native-ui-lib'
import { Home } from './Home/Home'
import { Notifications } from '../General'
import {Search} from './Search/Search'

export const Planner = ({ navigation }) => {
  const pages = [
    { label: 'Planner Home' },
    { label: 'Search' },
    { label: 'Packages' },
    { label: 'Notifications' },
  ]
  return (
    <View flex>
      <TabController items={pages}>
        <TabController.TabBar enableShadows />
        <View flex>
          <TabController.TabPage index={0}>
            <Home navigation={navigation} />
          </TabController.TabPage>
          <TabController.TabPage index={1}>
            <Search navigation={navigation} />
          </TabController.TabPage>
          <TabController.TabPage index={2}>
            <Text>Hello</Text>
          </TabController.TabPage>
          <TabController.TabPage index={3}>
            <Notifications navigation={navigation} />
          </TabController.TabPage>
        </View>
      </TabController>
    </View>
  )
}
