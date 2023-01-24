import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import  { JobCard } from '../../../components'

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text>Top Picks For You</Text>
              <View>
                <JobCard/>
          
              </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  container: {},

})
