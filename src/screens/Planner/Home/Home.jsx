import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { JobCard } from '../../../components'

const TopJobs = "Top Jobs"
const JobsNear = "Jobs Near You"
const ReccomendedJobs = "Top Picks For You"

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView >
      <ScrollView contentContainerStyle={styles.ScrollView}>
        <View style={styles.ViewHolder}>

          <View style= {styles.Component}>
            <Text style={styles.heading}>Top Picks For You</Text>
            <View>
              <JobCard />
            </View>
          </View>
          

          <View style= {styles.Component}>
            <Text style={styles.heading}>{JobsNear}</Text>
            <View>
              <JobCard />
            </View>
          </View>
          
          <View style= {styles.Component}>
            <Text style={styles.heading}>{ReccomendedJobs}</Text>
            <View>
              <JobCard />
            </View>
          </View>
          
          
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
  heading: {
    fontSize: 25,
    fontWeight: '400',
  },
  ViewHolder:{
   paddingStart:15,
  },
  Component:{
    justifyContent:"space-evenly", 
    height:270 
  }
})
