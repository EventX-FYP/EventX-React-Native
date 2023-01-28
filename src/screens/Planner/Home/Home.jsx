import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native-ui-lib'
import { StyleSheet } from 'react-native'
import { JobCard } from '../../../components'
import moment from 'moment/moment'

const TopJobs = 'Top Jobs'
const JobsNear = 'Jobs Near You'
const ReccomendedJobs = 'Top Picks For You'

const currentDate = new Date().toISOString().slice(0, 10)

const JobList = [
  {
    id: 1,
    title: 'tittle',
    City: 'Lahore',
    Category:
      'Category 1 | Category 1 | Category 1 | Category 1 | Category 1 | Category 1 |',
    Content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    Name: 'Haroon Tahir Haroon Tahir Haroon Tahir Haroon Tahir',
    Date: moment(currentDate).format('DD-MMM-YYYY'),
  },
  {
    id: 2,
    title: 'tittle',
    City: 'Lahore',
    Category:
      'Category 1 | Category 1 | Category 1 | Category 1 | Category 1 | Category 1 |',
    Content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    Name: 'Haroon Tahir Haroon Tahir Haroon Tahir Haroon Tahir',
    Date: moment(currentDate).format('DD-MMM-YYYY'),
  },
  {
    id: 3,
    title: 'tittle',
    City: 'Lahore',
    Category:
      'Category 1 | Category 1 | Category 1 | Category 1 | Category 1 | Category 1 |',
    Content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
    Name: 'Haroon Tahir Haroon Tahir Haroon Tahir Haroon Tahir',
    Date: moment(currentDate).format('DD-MMM-YYYY'),
  },
]

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView >
        <View style={styles.ViewHolder}>
          <View style={styles.Component}>
            <Text style={styles.heading}>{TopJobs}</Text>
            <View>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
                data={JobList}
                renderItem={({item}) => <JobCard job={item} />}
                horizontal={true}
              />
            </View>
          </View>

          <View style={styles.Component}>
            <Text style={styles.heading}>{JobsNear}</Text>
            <View>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
                data={JobList}
                renderItem={({item}) => <JobCard job={item} />}
                horizontal={true}
              />
            </View>
          </View>

          <View style={styles.Component}>
            <Text style={styles.heading}>{ReccomendedJobs}</Text>
            <View>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
                data={JobList}
                renderItem={({item}) => <JobCard job={item} />}
                horizontal={true}
              />
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
    fontWeight: '600',
  },
  ViewHolder: {
    paddingHorizontal: 20,
  },
  Component: {
    justifyContent: 'space-evenly',
    height: 270,
  },
})
