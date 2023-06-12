import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { StyleSheet, Image } from 'react-native'
import { JobCard } from '../../../components'
import { images } from '../../../assets/index'
import { ScreenNavigator } from "../../../helper";

import moment from 'moment/moment'
import { GET_CONTRACTS } from '../../../graphql/queries'
import { useProgress } from '../../../store/hooks/progress.hook'
import { useApollo } from '../../../graphql/apollo'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

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

  const handlePress = (item) => {
    console.log("test")
    navigation.navigate(ScreenNavigator.JobDetail, { item });
  };

  const { startProgress, stopProgress } = useProgress();
  const apolloClient = useApollo();

  const [contracts, setContracts] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getContracts = async () => {
      try {
        startProgress();

        const { data } = await apolloClient.query({
          query: GET_CONTRACTS,
        });

        if (data.getContracts) {
          setContracts(data.getContracts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        stopProgress();
      }
    }

    isFocused && getContracts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.ViewHolder}>
          <View style={styles.Component}>
            {contracts.length > 0 ?
              <>
                <Text style={styles.heading}>{TopJobs}</Text>
                <View>
                  <FlatList
                    ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
                    data={contracts}
                    renderItem={({ item }) => <JobCard job={item} onPress={() => handlePress(item)} />}
                    horizontal={true}
                  />
                </View>
              </>
              : <>
                <Text style={styles.heading}>
                  No Jobs Available
                </Text>
              </>
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    // flex:1
  },
  heading: {
    fontSize: 25,
    fontWeight: '600',
  },
  ViewHolder: {
    paddingEnd: 20,
  },
  Component: {
    justifyContent: 'space-evenly',
    height: 270,
    marginBottom: 5
  },
  Search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
  },
  SearchImage: {
    width: 30,
    height: 30
  }
})
